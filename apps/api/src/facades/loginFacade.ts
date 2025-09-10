import { LoginModel } from '../models/loginModel';
import { PrismaClient, User } from '@prisma/client';
import { UserModel } from '../models/userModel';

import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import * as process from 'process';
import { EmailingFacade } from './emailingFacade';
import { SessionToken } from '../entities/sessionToken';
import { CustomResponse } from '../entities/customresponse';

export class LoginFacade {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async login(email: string, password: string, ip: string | undefined): Promise<SessionToken> {
        if (!email || !password) {
            throw <CustomResponse>{
                status: 404,
                message: 'User or password incorrect.',
            };
        }
        const loginModel = new LoginModel(this.prisma, this.body);
        let session;
        try {
            session = await loginModel.login(email, password, ip);
        } catch (e) {
            if (!e) {
                throw <CustomResponse>{
                    status: 403,
                    message: 'Login not found',
                };
            } else {
                throw e;
            }
        }
        return session;
    }

    public async refreshToken(): Promise<string> {
        const refreshToken = this.body.refreshToken;
        try {
            const session = await this.prisma.userSession.findFirst({ where: { active: 1, tokenid: refreshToken } });
            if (!session) {
                console.log('refreshToken session not found');
                throw <CustomResponse>{
                    status: 405,
                    message: 'Session not found',
                };
            }

            const now = new Date();
            const secondsExpiration = Number(process.env.REFRESH_TOKEN_EXPIRES_IN);
            if (
                !session.last_change ||
                session.last_change.getTime() / 1000 < now.getTime() / 1000 - secondsExpiration
            ) {
                console.log('refreshToken session expired');
                await this.prisma.userSession.update({
                    where: {
                        id: session.id,
                    },
                    data: {
                        active: 0,
                    },
                });
                throw <CustomResponse>{
                    status: 405,
                    message: 'Session Expired',
                };
            } else {
                await this.prisma.userSession.update({
                    where: {
                        id: session.id,
                    },
                    data: {
                        last_change: new Date(),
                    },
                });
            }

            const user = await this.prisma.user.findFirst({
                where: { id: session.id_user, deleted_at: null, active: 1 },
                include: {
                    UserPermissions: {
                        where: {
                            active: 1,
                            deleted_at: null,
                        },
                    },
                },
            });
            if (!user) {
                console.log('refreshToken user not found');
                throw <CustomResponse>{
                    status: 404,
                    message: 'User not found',
                };
            }

            const permissions = [];
            if (user.UserPermissions) {
                user.UserPermissions.forEach((p) => {
                    permissions.push(p.name);
                });
            }

            const userToken = {
                id_user: user.id,
                name: user.name,
                surname: user.surname,
                photo: user.photo,
                role: user.role,
            };

            const token = jwt.sign(userToken, process.env.JWT_SECRET, {
                expiresIn: Number(process.env.JWT_EXPIRES_IN),
            });

            return token;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async closeSession(): Promise<CustomResponse> {
        const loginModel = new LoginModel(this.prisma, this.body);
        let session: CustomResponse = <CustomResponse>{};
        try {
            session = await loginModel.closeSession(this.body);
        } catch (e) {
            console.log(e);
        }
        return session;
    }

    public async register(user: User): Promise<User> {
        const model = new UserModel(this.prisma);

        // get user by email
        const old = await model.getByEmail(user.email);
        if (old?.id) {
            throw <CustomResponse>{
                status: 403,
                message: 'Email already registered',
            };
        }

        user.password = bcrypt.hashSync(user.password, 8);
        console.log(user);
        return model.register(user);
    }

    public async magicLink(email: string, ip: string | undefined): Promise<CustomResponse> {
        if (!email) {
            throw <CustomResponse>{
                status: 404,
                message: 'Not found',
            };
        }
        const session: CustomResponse = <CustomResponse>{};

        const user = await this.prisma.user.findFirst({
            where: {
                email: {
                    equals: email,
                },
                deleted_at: null,
                active: 1,
            },
            select: {
                id: true,
                name: true,
                surname: true,
                password: true,
                photo: true,
                magicLinkToken: true,
                UserPermissions: {
                    where: {
                        active: 1,
                        deleted_at: null,
                    },
                },
            },
        });

        if (!user) {
            throw <CustomResponse>{
                status: 402,
                message: 'No hemos encontrado el usuario',
            };
        }

        // miramos si el usuario ya tiene un token de magic link
        const magicLinkToken = user.magicLinkToken;
        let token = '';

        if (magicLinkToken && magicLinkToken !== '') {
            // miramos si es válido
            let payload!: JwtPayload | string;
            try {
                payload = jwt.verify(user.magicLinkToken, process.env.JWT_SECRET);
                console.log('reenvío token');
                if (payload) {
                    token = magicLinkToken;
                }
            } catch (e) {
                // vamos a generar un token y enviamos un email desde la plataforma al email del usuario con el token
                const payload = {
                    id: user.id,
                    email: email,
                    date: new Date(),
                    expires: new Date(new Date().getTime() + 1000 * 60 * 15),
                };
                console.error(e);
                token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30m' });
            }
        } else {
            // vamos a generar un token y enviamos un email desde la plataforma al email del usuario con el token
            const payload = {
                id: user.id,
                email: email,
                date: new Date(),
                expires: new Date(new Date().getTime() + 1000 * 60 * 15),
            };
            token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30m' });
        }

        // le ponemos el token al usuario member
        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                magicLinkToken: token,
            },
        });

        const body = `
                    <html lang="es">
                        <body>

                        <div style="text-align: center">
                            <h2>Accede a la APP</h2>
                            <p>Hola ${user.name} ${user.surname},</p>
                            <p>Para acceder a la APP, haz clic en el siguiente botón:</p><br><br>
                            <a href="${process.env.FRONT_PUBLIC_URL}/magic-link/${token}" style="display: inline-block; padding: 15px 20px; font-size: 17px; background: #003153; color: #ffffff; border-radius: 5px; text-decoration: none; font-weight: bold">Acceder a la APP</a>
                            <br><br>
                            Enlace de acceso:<br><br><a href="${process.env.FRONT_PUBLIC_URL}/magic-link/${token}">${process.env.FRONT_PUBLIC_URL}/magic-link/${token}</a>
                            <br><br>
                            <p>Si no has solicitado acceder, ignora este mensaje y háznoslo saber a la administración.</p>
                            <br><br><br>
                            <small>Por favor, no conteste a este email, es un buzón de correo sólo destinado a salida.</small>
                        </div>
                        </body>
                    </html>`;

        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const timeString = `${hours}:${minutes}:${seconds}`;

        const emailingFacade = new EmailingFacade(this.prisma, this.body);
        await emailingFacade.sendEmail(email, 'Acceso a Noutly - ' + timeString, body);

        session.status = 200;
        session.message = 'Email con inicio de sesión enviado.';

        return session;
    }

    public async validateMagicLink(token: string, ip: string): Promise<any> {
        const session: any = {};

        if (!token) {
            session.status = 403;
            session.message = 'Enlace no válido o caducado, prueba de nuevo.';
            return session;
        }

        const user = await this.prisma.user.findFirst({
            where: {
                magicLinkToken: token,
                active: 1,
                deleted_at: null,
            },
            include: {
                UserPermissions: {
                    where: {
                        active: 1,
                        deleted_at: null,
                    },
                },
            },
        });

        if (!user) {
            console.log('user not found');
            session.status = 403;
            session.message = 'Enlace no válido o caducado, prueba de nuevo.';
            return session;
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            if (!payload) {
                console.log(payload);
                session.status = 403;
                session.message = 'Enlace no válido o caducado, prueba de nuevo.';
                await this.resetLoginCodes(user.id);
                return session;
            }
        } catch (e) {
            console.log(e);
            session.status = 403;
            session.message = 'Enlace no válido o caducado, prueba de nuevo.';
            await this.resetLoginCodes(user.id);
            return session;
        }

        const permissions = [];
        if (user.UserPermissions) {
            user.UserPermissions.forEach((p) => {
                permissions.push(p.name);
            });
        }

        const userToken = {
            id_user: user.id,
            name: user.name,
            photo: user.photo,
            surname: user.surname,
            role: user.role,
        };

        const userRefreshToken = {
            id_user: user.id,
        };

        const newToken = jwt.sign(userToken, process.env.JWT_SECRET, { expiresIn: Number(process.env.JWT_EXPIRES_IN) });
        const newRefreshToken = jwt.sign(userRefreshToken, process.env.JWT_SECRET);
        const permissionsToken = jwt.sign({ permissions }, process.env.JWT_SECRET);

        await this.prisma.userSession.create({
            data: {
                id_user: user.id,
                ip: ip,
                tokenid: newToken,
                init_session: new Date(),
                last_change: new Date(),
            },
        });

        // quitamos el magic link token del usuario
        await this.resetLoginCodes(user.id);

        session.status = 200;
        session.token = newToken;
        session.refreshToken = newRefreshToken;
        session.permissionsToken = permissionsToken;
        return session;
    }

    async resetLoginCodes(userId: string) {
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                magicLinkToken: null,
                code2FA: null,
            },
        });
    }

    public async validate2FACode(code: string, ip: string): Promise<any> {
        const session: any = {};

        if (!code) {
            session.status = 403;
            session.message = 'Código no válido o caducado, prueba de nuevo.';
            return session;
        }

        const user = await this.prisma.user.findFirst({
            where: {
                code2FA: code,
                active: 1,
                deleted_at: null,
            },
            include: {
                UserPermissions: {
                    where: {
                        active: 1,
                        deleted_at: null,
                    },
                },
            },
        });

        if (!user) {
            session.status = 403;
            session.message = 'Código no válido o caducado, prueba de nuevo.';
            return session;
        }

        const permissions = [];
        if (user.UserPermissions) {
            user.UserPermissions.forEach((p) => {
                permissions.push(p.name);
            });
        }

        const userToken = {
            id_user: user.id,
            name: user.name,
            photo: user.photo,
            surname: user.surname,
            role: user.role,
        };

        const userRefreshToken = {
            id_user: user.id,
        };

        const newToken = jwt.sign(userToken, process.env.JWT_SECRET, { expiresIn: Number(process.env.JWT_EXPIRES_IN) });
        const newRefreshToken = jwt.sign(userRefreshToken, process.env.JWT_SECRET);
        const permissionsToken = jwt.sign({ permissions }, process.env.JWT_SECRET);

        await this.prisma.userSession.create({
            data: {
                id_user: user.id,
                ip: ip,
                tokenid: newToken,
                init_session: new Date(),
                last_change: new Date(),
            },
        });

        // quitamos el magic link token del usuario
        await this.resetLoginCodes(user.id);

        session.status = 200;
        session.token = newToken;
        session.refreshToken = newRefreshToken;
        session.permissionsToken = permissionsToken;
        return session;
    }
}

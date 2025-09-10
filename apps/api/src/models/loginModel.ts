import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';
import process from 'process';
import { EmailingFacade } from '../facades/emailingFacade';
import { PrismaClient } from '@prisma/client';
import { SessionToken } from '../entities/sessionToken';
import { CustomResponse } from '../entities/customresponse';

export class LoginModel {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async get(id_session: string): Promise<SessionToken> {
        if (!id_session) {
            throw <CustomResponse>{
                status: 404,
                message: 'Not found',
            };
        }
        const userSession: SessionToken = <SessionToken>{};

        const session = await this.prisma.userSession.findUnique({ where: { id: id_session } });

        if (!session) {
            throw <CustomResponse>{
                status: 404,
                message: 'Not found',
            };
        }

        userSession.tokenId = session.tokenid;

        const user = await this.prisma.user.findUnique({ where: { id: session.id_user } });
        if (!user) {
            throw <CustomResponse>{
                status: 404,
                message: 'User not found',
            };
        } else {
            userSession.name = user.name;
            userSession.surname = user.surname;
            userSession.userId = user.id;
        }

        return userSession;
    }

    public async login(email: string, password: string, ip: string | undefined): Promise<any> {
        if (!email || !password) {
            throw <CustomResponse>{
                status: 404,
                message: 'User or password incorrect.',
            };
        }

        let mode = '';

        // const TWO_FACTOR_AUTHENTICATION = process.env.TWO_FACTOR_AUTHENTICATION === 'true';
        // if (TWO_FACTOR_AUTHENTICATION === true) {
        //     secure2FA = true;
        //     mode = process.env.TWO_FACTOR_AUTHENTICATION_MODE;
        // }

        const user = await this.prisma.user.findFirst({
            where: { email: email, active: 1 },
            select: {
                id: true,
                name: true,
                surname: true,
                photo: true,
                permissions: true,
                UserPermissions: {
                    where: {
                        active: 1,
                        deleted_at: null,
                    },
                },
                password: true,
                role: true,
                secure2FAMode: true,
                secure2FA: true,
            },
        });

        if (!user) {
            throw <CustomResponse>{
                status: 404,
                message: 'User or password incorrect.',
            };
        }
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            throw <CustomResponse>{
                status: 404,
                message: 'User or password incorrect.',
            };
        }

        const permissions = [];
        if (user.UserPermissions) {
            user.UserPermissions.forEach((p) => {
                permissions.push(p.name);
            });
        }

        if (user.secure2FA === 0) {
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

            const token = jwt.sign(userToken, process.env.JWT_SECRET, {
                expiresIn: Number(process.env.JWT_EXPIRES_IN),
            });
            const refreshToken = jwt.sign(userRefreshToken, process.env.JWT_SECRET);
            const permissionsToken = jwt.sign({ permissions }, process.env.JWT_SECRET);

            await this.prisma.userSession.create({
                data: {
                    id_user: user.id,
                    ip: ip,
                    tokenid: refreshToken,
                    init_session: new Date(),
                    last_change: new Date(),
                },
            });

            return {
                token: token,
                refreshToken: refreshToken,
                permissionsToken: permissionsToken,
            };
        } else {
            // 2FA habilitado
            mode = user.secure2FAMode;

            // hacemos un código de 6 dígitos
            const code2FA = String(Math.floor(100000 + Math.random() * 900000));
            // guardamos el código en la base de datos
            await this.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    code2FA,
                },
            });

            const body = `
                    <html lang="es">
                        <body>

                        <div style="text-align: center">
                            <h2>Accede a la APP</h2>
                            <p>Hola ${user.name} ${user.surname},</p>
                            <p>Este es tu código de acceso a la app</p><br><br>
                            <span style="font-size: 30px; font-weight: bold">${code2FA}</span>
                            <br><br>
                            <p>Si no has solicitado acceder, ignora este mensaje y háznoslo saber a la administración.</p>
                            <br><br><br>
                            <small>Por favor, no conteste a este email, es un buzón de correo sólo destinado a salida.</small>
                        </div>
                        </body>
                    </html>`;

            const emailingFacade = new EmailingFacade(this.prisma, this.body);
            await emailingFacade.sendEmail(email, 'Código de acceso a Noutly', body);

            return {
                mode: mode,
            };
        }
    }

    async closeUserSessions(id_user: string) {
        await this.prisma.userSession.updateMany({
            where: {
                id_user: id_user,
            },
            data: {
                active: 0,
            },
        });
    }

    public async closeSession(body: any): Promise<CustomResponse> {
        const refreshToken = body.refreshToken;
        //close all user sessions
        //await this.closeUserSessions(body.userSession.userId);

        await this.prisma.userSession.updateMany({
            where: {
                tokenid: refreshToken,
            },
            data: {
                active: 0,
            },
        });

        return {
            status: 200,
            message: 'Ok',
        };
    }
}

import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { includes } from 'lodash';
import { SessionToken } from '../entities/sessionToken';
import { CustomResponse } from '../entities/customresponse';

export class AuthModel {
    prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async verifyToken(token: string | undefined, ip: string | undefined): Promise<SessionToken> {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            let status = 403;
            //console.log('token verified error', e.message);
            if (e.message === 'jwt expired') {
                status = 401;
            }
            throw <CustomResponse>{
                status: status,
                message: e.message,
            };
        }

        const session: any = jwt.decode(token);

        const user = await this.prisma.user.findFirst({
            where: {
                id: session.id_user,
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
            console.log('session user not found');
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

        try {
            return <SessionToken>{
                userId: user.id,
                name: user.name,
                surname: user.surname,
                tokenId: token,
                permissions: permissions,
            };
        } catch (err) {
            console.error('err', err);
            throw <CustomResponse>{
                status: 405,
                message: 'Session verify error',
            };
        }
    }
}

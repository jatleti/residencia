import { ApiKeytoken, PrismaClient } from '@prisma/client';
import { CustomResponse } from '../entities/customresponse';

export class ApiKeyTokenModel {
    prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async verifyApiKeyToken(token: string | undefined, ip: string | undefined): Promise<boolean> {
        const session = await this.prisma.apiKeytoken.findFirst({ where: { deleted_at: null, token: token } });
        if (!session) {
            throw <CustomResponse>{
                status: 403,
                message: 'Token not found. Verify your token and try again.',
            };
        }

        try {
            await this.prisma.apiKeytoken.update({
                where: { token: token },
                data: { access_on: new Date(), ip: ip },
            });

            return true;
        } catch (err) {
            console.error('err', err);
            throw <CustomResponse>{
                status: 403,
                message: 'Token verify error',
            };
        }
    }

    public async addApiKeyToken(token: string, description: string): Promise<ApiKeytoken> {
        return this.prisma.apiKeytoken.create({
            data: {
                token: token,
                description: description,
            },
        });
    }

    public async getByToken(token: string): Promise<ApiKeytoken | null> {
        return this.prisma.apiKeytoken.findFirst({ where: { token: token, deleted_at: null } });
    }
}

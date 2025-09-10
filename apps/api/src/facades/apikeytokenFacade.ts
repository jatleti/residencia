import { PrismaClient } from '@prisma/client';
import { ApiKeyTokenModel } from '../models/apikeytokenModel';
import { ApiKeytoken } from '../entities/apiKeyToken';
import { CustomResponse } from '../entities/customresponse';
export class ApiKeyTokenFacade {
    prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async addApiKeyToken(token: string, description: string): Promise<ApiKeytoken> {
        const apiKeyTokenModel = new ApiKeyTokenModel(this.prisma);
        const apiKeyToken = await apiKeyTokenModel.getByToken(token);
        if (apiKeyToken) {
            throw <CustomResponse>{
                status: 500,
                message: 'Token already exists',
            };
        }
        return await new ApiKeyTokenModel(this.prisma).addApiKeyToken(token, description);
    }

    public async generateToken(length: number): Promise<string> {
        const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
        const randomArray = Array.from({ length: length }, () => chars[Math.floor(Math.random() * chars.length)]);
        return randomArray.join('');
    }
}

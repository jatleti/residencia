import { PrismaClient, UserPermission } from '@prisma/client';
import { CustomResponse } from '../entities/customresponse';

export class UserPermissionFacade {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async list(): Promise<UserPermission[]> {
        return this.prisma.userPermission.findMany({ where: { deleted_at: null } });
    }

    public async get(id: string): Promise<UserPermission | null> {
        return this.prisma.userPermission.findUnique({ where: { id: id } });
    }

    public async add(userPermission: UserPermission): Promise<UserPermission> {
        try {
            if (this.body && this.body.userSession.userId) {
                userPermission.createdBy = this.body.userSession.userId;
            }
            return this.prisma.userPermission.create({ data: userPermission });
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error creating user permission',
            };
        }
    }

    public async set(id: string, userPermission: UserPermission): Promise<UserPermission> {
        try {
            return this.prisma.userPermission.update({ where: { id: id }, data: userPermission });
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error updating user permission',
            };
        }
    }

    public async del(id: string): Promise<UserPermission> {
        const userPermission = await this.prisma.userPermission.findUnique({ where: { id: id } });
        if (!userPermission) {
            throw <CustomResponse>{
                status: 404,
                message: 'User permission not found',
            };
        }
        try {
            await this.prisma.userPermission.update({
                where: { id: id },
                data: {
                    deletedBy: this.body.userSession.userId,
                },
            });
            await this.prisma.userPermission.delete({ where: { id: id } });
            return userPermission;
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error deleting user permission',
            };
        }
    }
}

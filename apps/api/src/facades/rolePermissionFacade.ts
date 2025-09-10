import { PrismaClient, RolePermission } from '@prisma/client';
import { CustomResponse } from '../entities/customresponse';

export class RolePermissionFacade {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async list(): Promise<RolePermission[]> {
        return this.prisma.rolePermission.findMany({ where: { deleted_at: null } });
    }

    public async get(id: string): Promise<RolePermission | null> {
        return this.prisma.rolePermission.findUnique({ where: { id: id } });
    }

    public async add(rolePermission: RolePermission): Promise<RolePermission> {
        try {
            if (this.body && this.body.userSession.userId) {
                rolePermission.createdBy = this.body.userSession.userId;
            }
            return this.prisma.rolePermission.create({ data: rolePermission });
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error creating role permission',
            };
        }
    }

    public async set(id: string, rolePermission: RolePermission): Promise<RolePermission> {
        try {
            return this.prisma.rolePermission.update({ where: { id: id }, data: rolePermission });
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error updating role permission',
            };
        }
    }

    public async del(id: string): Promise<RolePermission> {
        const rolePermission = await this.prisma.rolePermission.findUnique({ where: { id: id } });
        if (!rolePermission) {
            throw <CustomResponse>{
                status: 404,
                message: 'Role permission not found',
            };
        }
        try {
            await this.prisma.rolePermission.update({
                where: { id: id },
                data: {
                    deletedBy: this.body.userSession.userId,
                },
            });
            await this.prisma.rolePermission.delete({ where: { id: id } });
            return rolePermission;
        } catch (e) {
            throw <CustomResponse>{
                status: 500,
                message: 'Error deleting role permission',
            };
        }
    }
}

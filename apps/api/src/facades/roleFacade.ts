import { PrismaClient, Role, Prisma, RolePermission, UserPermission } from '@prisma/client';
import { CustomResponse } from '../entities/customresponse';

export type RoleWithPayload = Prisma.RoleGetPayload<{
    include: { RolePermissions: true };
}>;

export class RoleFacade {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async list(): Promise<Role[]> {
        return this.prisma.role.findMany({
            where: {
                deleted_at: null,
            },
            include: {
                RolePermissions: {
                    where: { deleted_at: null },
                },
            },
        });
    }

    public async get(id: string): Promise<Role | null> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Role not found',
            };
        }
        return this.prisma.role.findUnique({
            where: { id: id },
            include: { RolePermissions: { where: { deleted_at: null } } },
        });
    }

    public async add(role: Role): Promise<Role> {
        try {
            const r = await this.prisma.role.create({ data: role });
            if (r) {
                return this.get(r.id);
            }
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error creating role',
            };
        }
    }

    public async set(id: string, role: RoleWithPayload): Promise<Role> {
        delete role.RolePermissions;

        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Role not found',
            };
        }

        const data = <Role>role;

        try {
            await this.prisma.role.update({ where: { id: id }, data });
            return this.get(id);
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error updating role',
            };
        }
    }

    public async del(id: string): Promise<Role> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Role not found',
            };
        }

        const role = await this.prisma.role.findUnique({ where: { id: id } });
        if (!role) {
            throw <CustomResponse>{
                status: 404,
                message: 'Role not found',
            };
        }
        try {
            await this.prisma.role.delete({ where: { id: id } });
            return role;
        } catch (e) {
            throw <CustomResponse>{
                status: 500,
                message: 'Error deleting role ' + e,
            };
        }
    }

    public async addPermission(roleId: string, permission: string): Promise<Role> {
        if (!roleId) {
            throw <CustomResponse>{
                status: 500,
                message: 'Role not found',
            };
        }

        try {
            const newPermission: RolePermission = <RolePermission>{};
            newPermission.name = permission;
            newPermission.roleId = roleId;
            newPermission.createdBy = this.body.userSession.userId;
            await this.prisma.rolePermission.create({ data: newPermission });

            return this.get(roleId);
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error adding permission to role',
            };
        }
    }

    public async delPermission(roleId: string, permission: string): Promise<Role> {
        if (!roleId) {
            throw <CustomResponse>{
                status: 500,
                message: 'Role not found',
            };
        }

        try {
            await this.prisma.rolePermission.updateMany({
                where: {
                    roleId: roleId,
                    name: permission,
                },
                data: {
                    deleted_at: new Date(),
                    deletedBy: this.body.userSession.userId,
                },
            });
            return this.get(roleId);
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error deleting permission from role',
            };
        }
    }

    public async updateAllPermissions(roleId: string): Promise<Role> {
        if (!roleId) {
            throw <CustomResponse>{
                status: 500,
                message: 'Role not found',
            };
        }

        const role = await this.prisma.role.findUnique({
            where: { id: roleId },
            include: {
                RolePermissions: {
                    where: { deleted_at: null },
                },
            },
        });
        if (!role) {
            throw <CustomResponse>{
                status: 404,
                message: 'Role not found',
            };
        }

        // buscamos todos los usuarios con ese rol
        const users = await this.prisma.user.findMany({
            where: { roleId: roleId, blockPermissions: 0, deleted_at: null },
        });

        // para cada usuario, le borramos los permisos que tiene y le ponemos los del rol
        const permissionsToCreate: UserPermission[] = [];

        for (const u of users) {
            await this.prisma.userPermission.updateMany({
                where: { userId: u.id },
                data: { deleted_at: new Date(), deletedBy: this.body.userSession.userId },
            });
            for (const rp of role.RolePermissions) {
                const userPermission: UserPermission = <UserPermission>{};
                userPermission.userId = u.id;
                userPermission.createdBy = this.body.userSession.userId;
                userPermission.name = rp.name;
                permissionsToCreate.push(userPermission);
            }
        }

        if (permissionsToCreate.length > 0) {
            await this.prisma.userPermission.createMany({
                data: permissionsToCreate,
            });
        }

        return role;
    }
}

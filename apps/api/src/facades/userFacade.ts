import { Prisma, PrismaClient, User, UserPermission } from '@prisma/client';
import { UserModel } from '../models/userModel';

import bcrypt from 'bcryptjs';
import { Permissions } from '../infrastructure/permissions';
import { getSignedUrlBucket, isSignedUrlBucket } from '../factories/functions.factory';
import { CustomResponse } from '../entities/customresponse';

export type UserWithPayload = Prisma.UserGetPayload<{
    include: { UserPermissions: true };
}>;

export class UserFacade {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async list(): Promise<User[]> {
        return this.prisma.user.findMany({ where: { deleted_at: null } });
    }

    public async get(id: string): Promise<User | null> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'User not found',
            };
        }

        const user = await this.prisma.user.findUnique({
            where: { id: id },
            include: { UserPermissions: { where: { deleted_at: null } } },
        });

        if (user && user.photo) {
            user.photo = await getSignedUrlBucket(user.photo);
        }

        return user;
    }

    public async init(user: User): Promise<User> {
        if (user.password) {
            user.password = bcrypt.hashSync(user.password, 8);
        }
        if (user.email) {
            user.email = user.email.toLowerCase();
            // check if email exists
            const userExists = await this.prisma.user.findFirst({ where: { email: user.email } });
            if (userExists) {
                throw <CustomResponse>{
                    status: 500,
                    message: 'Email already registered',
                };
            }
        }
        try {
            const u = await this.prisma.user.create({ data: user });

            if (u) {
                // ahora vamos a añadirle los permisos básicos de administrador
                const permissions = [
                    Permissions.DASHBOARD.VIEW,
                    Permissions.USER.LIST,
                    Permissions.USER.VIEW,
                    Permissions.USER.CREATE,
                    Permissions.USER.EDIT,
                    Permissions.USER.DELETE,
                    Permissions.SETTINGS.VIEW,
                    Permissions.SETTINGS.ROLES.LIST,
                    Permissions.SETTINGS.ROLES.VIEW,
                    Permissions.SETTINGS.ROLES.CREATE,
                    Permissions.SETTINGS.ROLES.EDIT,
                    Permissions.SETTINGS.ROLES.DELETE,
                ];

                for (const permission of permissions) {
                    const userPermission: UserPermission = <UserPermission>{};
                    userPermission.userId = u.id;
                    userPermission.name = permission;
                    await this.prisma.userPermission.create({ data: userPermission });
                }

                return this.get(u.id);
            }
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error creating user',
            };
        }
    }

    public async add(user: User): Promise<User> {
        if (user.password) {
            user.password = bcrypt.hashSync(user.password, 8);
        }
        if (user.email) {
            user.email = user.email.toLowerCase();
            // check if email exists
            const userExists = await this.prisma.user.findFirst({ where: { email: user.email } });
            if (userExists) {
                throw <CustomResponse>{
                    status: 500,
                    message: 'Email already registered',
                };
            }
        }
        try {
            const u = await this.prisma.user.create({ data: user });
            if (u) {
                return this.get(u.id);
            }
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error creating user',
            };
        }
    }

    public async set(id: string, user: UserWithPayload): Promise<User> {
        delete user.UserPermissions;

        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'User not found',
            };
        }

        // tenemos que ver si el usuario viene con una photo signed url
        if (user.photo && (await isSignedUrlBucket(user.photo))) {
            delete user.photo;
        }

        if (user.password && user.password !== '') {
            user.password = bcrypt.hashSync(user.password, 8);
        } else {
            delete user.password;
        }

        const data = <User>user;

        try {
            await this.prisma.user.update({ where: { id: id }, data });
            return this.get(id);
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error updating user',
            };
        }
    }

    public async del(id: string): Promise<User> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'User not found',
            };
        }

        const user = await this.prisma.user.findUnique({ where: { id: id } });
        if (!user) {
            throw <CustomResponse>{
                status: 404,
                message: 'User not found',
            };
        }
        try {
            await this.prisma.user.delete({ where: { id: id } });
            return user;
        } catch (e) {
            throw <CustomResponse>{
                status: 500,
                message: 'Error deleting user ' + e,
            };
        }
    }

    public async getByEmail(email: string): Promise<User | null> {
        if (!email) {
            return null;
        }
        const model = new UserModel(this.prisma);
        return model.getByEmail(email);
    }

    public async setRole(id: string, roleId: string): Promise<User> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'User not found',
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

        // borramos todos los permisos del usuario
        await this.prisma.userPermission.updateMany({
            where: { userId: id },
            data: { deleted_at: new Date(), deletedBy: this.body.userSession.userId },
        });

        const permissions: string[] = [];
        for (const permission of role.RolePermissions) {
            permissions.push(permission.name);
        }

        for (const permission of permissions) {
            const userPermission: UserPermission = <UserPermission>{};
            userPermission.userId = id;
            userPermission.createdBy = this.body.userSession.userId;
            userPermission.name = permission;
            await this.prisma.userPermission.create({ data: userPermission });
        }

        try {
            await this.prisma.user.update({ where: { id: id }, data: { roleId: roleId } });
            return this.get(id);
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error updating user',
            };
        }
    }

    public async addPermission(userId: string, permission: string): Promise<User> {
        if (!userId) {
            throw <CustomResponse>{
                status: 500,
                message: 'User not found',
            };
        }

        try {
            const newPermission: UserPermission = <UserPermission>{};
            newPermission.name = permission;
            newPermission.userId = userId;
            newPermission.createdBy = this.body.userSession.userId;
            await this.prisma.userPermission.create({ data: newPermission });

            return this.get(userId);
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error adding permission to role',
            };
        }
    }

    public async delPermission(userId: string, permission: string): Promise<User> {
        if (!userId) {
            throw <CustomResponse>{
                status: 500,
                message: 'User not found',
            };
        }

        try {
            await this.prisma.userPermission.updateMany({
                where: {
                    userId: userId,
                    name: permission,
                },
                data: {
                    deleted_at: new Date(),
                    deletedBy: this.body.userSession.userId,
                },
            });
            return this.get(userId);
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error deleting permission from role',
            };
        }
    }
}

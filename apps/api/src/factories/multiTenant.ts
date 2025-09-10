import { Prisma, PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { query } from 'express';
import { find } from 'lodash';

//extension for soft delete
export const softDelete = Prisma.defineExtension({
    name: 'softDelete',
    model: {
        $allModels: {
            async delete<M, A>(this: M, where: Prisma.Args<M, 'delete'>): Promise<Prisma.Result<M, A, 'update'>> {
                const context = Prisma.getExtensionContext(this);

                return (context as any).update({
                    ...where,
                    data: {
                        deleted_at: new Date(),
                    },
                });
            },
        },
    },
});

export const softDeleteMany = Prisma.defineExtension({
    name: 'softDeleteMany',
    model: {
        $allModels: {
            async deleteMany<M, A>(
                this: M,
                where: Prisma.Args<M, 'deleteMany'>,
            ): Promise<Prisma.Result<M, A, 'updateMany'>> {
                const context = Prisma.getExtensionContext(this);

                return (context as any).updateMany({
                    ...where,
                    data: {
                        deleted_at: new Date(),
                    },
                });
            },
        },
    },
});

export class MultiTenant<PrismaClient> {
    tenants: { [name: string]: PrismaClient } = {};

    get(name: string): PrismaClient {
        if (this.tenants[name]) {
            return this.tenants[name];
        }

        const prisma = new PrismaClient({
            datasources: {
                db: {
                    url: dotenv.config({ path: `${name}` }).parsed?.DATABASE_URL,
                },
            },
            omit: {
                user: {
                    // make sure that password and internalId are never queried.
                    password: true,
                },
            },
        })
            .$extends(softDelete)
            .$extends(softDeleteMany);

        // // exclude deleted
        // prisma.$use(async (params: any, next: any) => {
        //     // Check incoming query type

        //     if (params.action == 'delete') {
        //         // Delete queries
        //         // Change action to an update
        //         params.action = 'update';
        //         params.args['data'] = { deleted_at: new Date() };
        //     }
        //     if (params.action == 'deleteMany') {
        //         // Delete many queries
        //         params.action = 'updateMany';
        //         if (params.args.data != undefined) {
        //             params.args.data['deleted_at'] = new Date();
        //         } else {
        //             params.args['data'] = { deleted_at: new Date() };
        //         }
        //     }

        //     return next(params);
        // });

        // // exclude password from select
        // prisma.$use(async (params: any, next: any) => {
        //     const result = await next(params);
        //     if (params?.model === 'User' && params?.args?.select?.password !== true) {
        //         if (result && result.password) {
        //             delete result.password;
        //         }
        //         if (result && result.length > 0) {
        //             result.forEach((user: any) => {
        //                 if (user.password) {
        //                     delete user.password;
        //                 }
        //             });
        //         }
        //     }
        //     return result;
        // });

        this.tenants[name] = <PrismaClient>prisma;
        return this.tenants[name];
    }
}

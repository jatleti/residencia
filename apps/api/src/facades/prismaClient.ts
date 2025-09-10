import { PrismaClient } from '@prisma/client';

async function excludePasswordMiddleware(params: any, next: any) {
    const result = await next(params);
    if (params?.model === 'User' && params?.args?.select?.password !== true) {
        if (result && result.password) {
            delete result.password;
        }
        if (result && result.length > 0) {
            result.forEach((user: any) => {
                if (user.password) {
                    delete user.password;
                }
            });
        }
    }
    return result;
}

export const prisma = new PrismaClient();

// soft delete
prisma.$use(async (params: any, next: any) => {
    // Check incoming query type

    if (params.action == 'delete') {
        // Delete queries
        // Change action to an update
        params.action = 'update';
        params.args['data'] = { deleted_at: new Date() };
    }
    if (params.action == 'deleteMany') {
        // Delete many queries
        params.action = 'updateMany';
        if (params.args.data != undefined) {
            params.args.data['deleted_at'] = new Date();
        } else {
            params.args['data'] = { deleted_at: new Date() };
        }
    }

    return next(params);
});

prisma.$use(excludePasswordMiddleware);

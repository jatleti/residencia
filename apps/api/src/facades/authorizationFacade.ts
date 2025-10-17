import { Prisma, PrismaClient, Authorization, Student } from '@prisma/client';
import { CustomResponse } from '../entities/customresponse';

export type AuthorizationWithPayload = Prisma.AuthorizationGetPayload<{
    include: {
        User: true;
        Student: true;
    };
}>;

export class AuthorizationFacade {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async list(studentId: string): Promise<Authorization[]> {
        return this.prisma.authorization.findMany({
            where: { deleted_at: null, studentId },
            include: { User: true, Student: true },
        });
    }

    public async get(id: string): Promise<AuthorizationWithPayload | null> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Authorization not found',
            };
        }

        return this.prisma.authorization.findUnique({
            where: { id: id },
            include: { User: true, Student: true },
        });
    }

    public async add(authorization: Authorization): Promise<AuthorizationWithPayload> {
        try {
            authorization.userId = this.body.userSession.userId;
            const a = await this.prisma.authorization.create({ data: authorization });
            if (a) {
                return this.get(a.id);
            }
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error creating authorization',
            };
        }
    }

    public async set(id: string, authorization: AuthorizationWithPayload): Promise<AuthorizationWithPayload> {
        delete authorization.User;
        delete authorization.Student;

        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Authorization not found',
            };
        }

        const data = <Authorization>authorization;

        try {
            await this.prisma.authorization.update({ where: { id: id }, data });
            return this.get(id);
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error updating authorization',
            };
        }
    }

    public async del(id: string): Promise<Authorization> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Authorization not found',
            };
        }

        const authorization = await this.prisma.authorization.findUnique({ where: { id: id } });
        if (!authorization) {
            throw <CustomResponse>{
                status: 404,
                message: 'Authorization not found',
            };
        }
        try {
            await this.prisma.authorization.delete({ where: { id: id } });
            return authorization;
        } catch (e) {
            throw <CustomResponse>{
                status: 500,
                message: 'Error deleting authorization ' + e,
            };
        }
    }
}

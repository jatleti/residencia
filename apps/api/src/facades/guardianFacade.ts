import { Prisma, PrismaClient, Guardian } from '@prisma/client';

import bcrypt from 'bcryptjs';
import { CustomResponse } from '../entities/customresponse';

export type GuardianWithPayload = Prisma.GuardianGetPayload<{
    include: {
        Students: true;
    };
}>;

export class GuardianFacade {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async list(): Promise<Guardian[]> {
        return this.prisma.guardian.findMany({ where: { deleted_at: null } });
    }

    public async get(id: string): Promise<Guardian | null> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Guardian not found',
            };
        }

        return this.prisma.guardian.findUnique({
            where: { id: id },
            include: { Students: true },
        });
    }

    public async add(guardian: Guardian): Promise<Guardian> {
        if (guardian.password) {
            guardian.password = bcrypt.hashSync(guardian.password, 8);
        }
        if (guardian.email) {
            guardian.email = guardian.email.toLowerCase();
            // check if email exists
            const guardianExists = await this.prisma.guardian.findFirst({ where: { email: guardian.email } });
            if (guardianExists) {
                throw <CustomResponse>{
                    status: 500,
                    message: 'Email already registered',
                };
            }
        }
        try {
            const g = await this.prisma.guardian.create({ data: guardian });
            if (g) {
                return this.get(g.id);
            }
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error creating guardian',
            };
        }
    }

    public async set(id: string, guardian: GuardianWithPayload): Promise<Guardian> {
        delete guardian.Students;

        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Guardian not found',
            };
        }

        if (guardian.password && guardian.password !== '') {
            guardian.password = bcrypt.hashSync(guardian.password, 8);
        } else {
            delete guardian.password;
        }

        const data = <Guardian>guardian;

        try {
            await this.prisma.guardian.update({ where: { id: id }, data });
            return this.get(id);
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error updating guardian',
            };
        }
    }

    public async del(id: string): Promise<Guardian> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Guardian not found',
            };
        }

        const guardian = await this.prisma.guardian.findUnique({ where: { id: id } });
        if (!guardian) {
            throw <CustomResponse>{
                status: 404,
                message: 'Guardian not found',
            };
        }
        try {
            await this.prisma.guardian.delete({ where: { id: id } });
            return guardian;
        } catch (e) {
            throw <CustomResponse>{
                status: 500,
                message: 'Error deleting guardian ' + e,
            };
        }
    }
}

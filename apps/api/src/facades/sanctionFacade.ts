import { Prisma, PrismaClient, Sanction } from '@prisma/client';
import { CustomResponse } from '../entities/customresponse';

export type SanctionWithPayload = Prisma.SanctionGetPayload<{
    include: {
        User: true;
        Student: true;
    };
}>;

export class SanctionFacade {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async list(): Promise<Sanction[]> {
        return this.prisma.sanction.findMany({ where: { deleted_at: null } });
    }

    public async get(id: string): Promise<SanctionWithPayload | null> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Sanction not found',
            };
        }

        return this.prisma.sanction.findUnique({
            where: { id: id },
            include: { User: true, Student: true },
        });
    }

    public async add(sanction: Sanction): Promise<SanctionWithPayload> {
        try {
            const s = await this.prisma.sanction.create({ data: sanction });
            if (s) {
                return this.get(s.id);
            }
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error creating sanction',
            };
        }
    }

    public async set(id: string, sanction: SanctionWithPayload): Promise<SanctionWithPayload> {
        delete sanction.User;
        delete sanction.Student;

        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Sanction not found',
            };
        }

        const data = <Sanction>sanction;

        try {
            await this.prisma.sanction.update({ where: { id: id }, data });
            return this.get(id);
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error updating sanction',
            };
        }
    }

    public async del(id: string): Promise<Sanction> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Sanction not found',
            };
        }

        const sanction = await this.prisma.sanction.findUnique({ where: { id: id } });
        if (!sanction) {
            throw <CustomResponse>{
                status: 404,
                message: 'Sanction not found',
            };
        }
        try {
            await this.prisma.sanction.delete({ where: { id: id } });
            return sanction;
        } catch (e) {
            throw <CustomResponse>{
                status: 500,
                message: 'Error deleting sanction ' + e,
            };
        }
    }
}

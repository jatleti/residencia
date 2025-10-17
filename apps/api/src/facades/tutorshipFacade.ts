import { Prisma, PrismaClient, Tutorship } from '@prisma/client';
import { CustomResponse } from '../entities/customresponse';

export type TutorshipWithPayload = Prisma.TutorshipGetPayload<{
    include: {
        User: true;
        Student: true;
    };
}>;

export class TutorshipFacade {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async list(studentId: string): Promise<Tutorship[]> {
        return this.prisma.tutorship.findMany({ where: { deleted_at: null, studentId } });
    }

    public async get(id: string): Promise<TutorshipWithPayload | null> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Tutorship not found',
            };
        }

        return this.prisma.tutorship.findUnique({
            where: { id: id },
            include: { User: true, Student: true },
        });
    }

    public async add(tutorship: Tutorship): Promise<TutorshipWithPayload> {
        try {
            tutorship.userId = this.body.userSession.userId;
            const t = await this.prisma.tutorship.create({ data: tutorship });
            if (t) {
                return this.get(t.id);
            }
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error creating tutorship',
            };
        }
    }

    public async set(id: string, tutorship: TutorshipWithPayload): Promise<TutorshipWithPayload> {
        delete tutorship.User;
        delete tutorship.Student;

        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Tutorship not found',
            };
        }

        const data = <Tutorship>tutorship;

        try {
            await this.prisma.tutorship.update({ where: { id: id }, data });
            return this.get(id);
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error updating tutorship',
            };
        }
    }

    public async del(id: string): Promise<Tutorship> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Tutorship not found',
            };
        }

        const tutorship = await this.prisma.tutorship.findUnique({ where: { id: id } });
        if (!tutorship) {
            throw <CustomResponse>{
                status: 404,
                message: 'Tutorship not found',
            };
        }
        try {
            await this.prisma.tutorship.delete({ where: { id: id } });
            return tutorship;
        } catch (e) {
            throw <CustomResponse>{
                status: 500,
                message: 'Error deleting tutorship ' + e,
            };
        }
    }
}

import { Prisma, PrismaClient, Diary } from '@prisma/client';
import { CustomResponse } from '../entities/customresponse';

export type DiaryWithPayload = Prisma.DiaryGetPayload<{
    include: {
        User: true;
        Student: true;
    };
}>;

export class DiaryFacade {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async list(studentId: string): Promise<Diary[]> {
        return this.prisma.diary.findMany({
            where: { deleted_at: null, studentId },
            include: { User: true, Student: true },
            orderBy: { date: 'desc' },
        });
    }

    public async get(id: string): Promise<DiaryWithPayload | null> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Diary not found',
            };
        }

        return this.prisma.diary.findUnique({
            where: { id: id },
            include: { User: true, Student: true },
        });
    }

    public async add(diary: Diary): Promise<DiaryWithPayload> {
        try {
            diary.userId = this.body.userSession.userId;
            const d = await this.prisma.diary.create({ data: diary });
            if (d) {
                return this.get(d.id);
            }
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error creating diary',
            };
        }
    }

    public async set(id: string, diary: DiaryWithPayload): Promise<DiaryWithPayload> {
        delete diary.User;
        delete diary.Student;

        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Diary not found',
            };
        }

        const data = <Diary>diary;

        try {
            await this.prisma.diary.update({ where: { id: id }, data });
            return this.get(id);
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error updating diary',
            };
        }
    }

    public async del(id: string, studentId: string): Promise<Diary> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Diary not found',
            };
        }

        const diary = await this.prisma.diary.findUnique({ where: { id: id, studentId } });
        if (!diary) {
            throw <CustomResponse>{
                status: 404,
                message: 'Diary not found',
            };
        }
        try {
            await this.prisma.diary.delete({ where: { id: id, studentId } });
            return diary;
        } catch (e) {
            throw <CustomResponse>{
                status: 500,
                message: 'Error deleting diary ' + e,
            };
        }
    }
}

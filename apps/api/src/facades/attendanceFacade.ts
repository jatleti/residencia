import { Prisma, PrismaClient, Attendance, Student } from '@prisma/client';
import { CustomResponse } from '../entities/customresponse';
import { getSignedUrlBucket } from '../factories/functions.factory';

export type AttendanceWithPayload = Prisma.AttendanceGetPayload<{
    include: {
        Student: true;
    };
}>;

export class AttendanceFacade {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async list(): Promise<Attendance[]> {
        return this.prisma.attendance.findMany({ where: { deleted_at: null }, orderBy: { from: 'desc' } });
    }

    public async listAllStudents(): Promise<Student[]> {
        const students = await this.prisma.student.findMany({
            where: { deleted_at: null },
            include: {
                Attendances: {
                    where: { deleted_at: null, type: 0 }, // tipo centro
                    orderBy: { created_at: 'desc' },
                },
            },
            orderBy: [{ name: 'asc' }, { surname: 'asc' }],
        });

        for (const student of await students) {
            if (student.photo) {
                student.photo = await getSignedUrlBucket(student.photo);
            }
        }
        return students;
    }

    public async listAllStudentsDinner(): Promise<Student[]> {
        const students = await this.prisma.student.findMany({
            where: { deleted_at: null },
            include: {
                Attendances: {
                    where: { deleted_at: null, type: 1 }, // tipo comedor
                    orderBy: { created_at: 'desc' },
                },
            },
            orderBy: [{ name: 'asc' }, { surname: 'asc' }],
        });
        for (const student of await students) {
            if (student.photo) {
                student.photo = await getSignedUrlBucket(student.photo);
            }
        }
        return students;
    }

    public async get(id: string): Promise<AttendanceWithPayload | null> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Attendance not found',
            };
        }

        return this.prisma.attendance.findUnique({
            where: { id: id },
            include: { Student: true },
        });
    }

    public async add(attendance: Attendance): Promise<AttendanceWithPayload> {
        try {
            const a = await this.prisma.attendance.create({ data: attendance });
            if (a) {
                return this.get(a.id);
            }
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error creating attendance',
            };
        }
    }

    public async set(id: string, attendance: AttendanceWithPayload): Promise<AttendanceWithPayload> {
        delete attendance.Student;

        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Attendance not found',
            };
        }

        const data = <Attendance>attendance;

        try {
            await this.prisma.attendance.update({ where: { id: id }, data });
            return this.get(id);
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error updating attendance',
            };
        }
    }

    public async del(id: string): Promise<Attendance> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Attendance not found',
            };
        }

        const attendance = await this.prisma.attendance.findUnique({ where: { id: id } });
        if (!attendance) {
            throw <CustomResponse>{
                status: 404,
                message: 'Attendance not found',
            };
        }
        try {
            await this.prisma.attendance.delete({ where: { id: id } });
            return attendance;
        } catch (e) {
            throw <CustomResponse>{
                status: 500,
                message: 'Error deleting attendance ' + e,
            };
        }
    }
}

import { Prisma, PrismaClient, Student, File, StudentSeason, Invoice } from '@prisma/client';

import bcrypt from 'bcryptjs';
import { getSignedUrlBucket, isSignedUrlBucket } from '../factories/functions.factory';
import { CustomResponse } from '../entities/customresponse';

export type StudentWithPayload = Prisma.StudentGetPayload<{
    include: {
        Guardians: true;
        Tutorships: true;
        Authorizations: true;
        Sanctions: true;
        Invoices: true;
        Users: true;
        Attendances: true;
        Files: true;
        Diaries: true;
        StudentSeasons: true;
    };
}>;

export type StudentSeasonWithPayload = Prisma.StudentSeasonGetPayload<{
    include: { Season: true; Student: true };
}>;

export class StudentFacade {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async list(): Promise<Student[]> {
        const students = this.prisma.student.findMany({ where: { deleted_at: null } });
        for (const student of await students) {
            if (student.photo) {
                student.photo = await getSignedUrlBucket(student.photo);
            }
        }

        return students;
    }

    public async get(id: string): Promise<Student | null> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Student not found',
            };
        }

        const student = await this.prisma.student.findUnique({
            where: { id: id },
            include: {
                Invoices: {
                    where: { deleted_at: null },
                    include: {
                        User: true,
                        Student: {
                            select: { id: true, name: true, surname: true },
                        },
                        Season: true,
                    },
                    orderBy: { date: 'desc' },
                },
                Guardians: {
                    where: { deleted_at: null },
                    orderBy: { name: 'asc' },
                },
                Tutorships: {
                    where: { deleted_at: null },
                    include: { User: true },
                    orderBy: { date: 'desc' },
                },
                Authorizations: {
                    where: { deleted_at: null },
                    include: { User: true },
                    orderBy: { date: 'desc' },
                },
                Sanctions: {
                    where: { deleted_at: null },
                    include: { User: true },
                    orderBy: { date: 'desc' },
                },
                Users: {
                    where: { deleted_at: null },
                    orderBy: { name: 'asc' },
                },
                Attendances: {
                    where: { deleted_at: null },
                    orderBy: { created_at: 'desc' },
                },
                Files: {
                    where: { deleted_at: null },
                    include: {
                        User: {
                            select: { id: true, name: true, surname: true },
                        },
                    },
                    orderBy: { created_at: 'desc' },
                },
                StudentSeasons: {
                    where: { deleted_at: null },
                    orderBy: { created_at: 'desc' },
                    include: { Season: true },
                },
                Diaries: {
                    where: { deleted_at: null },
                    include: {
                        User: {
                            select: { id: true, name: true, surname: true },
                        },
                    },
                    orderBy: { date: 'desc' },
                },
            },
        });

        if (student && student.photo) {
            student.photo = await getSignedUrlBucket(student.photo);
        }

        return student;
    }

    public async add(student: Student): Promise<Student> {
        if (student.password) {
            student.password = bcrypt.hashSync(student.password, 8);
        }
        if (student.email) {
            student.email = student.email.toLowerCase();
            // check if email exists
            const studentExists = await this.prisma.student.findFirst({ where: { email: student.email } });
            if (studentExists) {
                throw <CustomResponse>{
                    status: 500,
                    message: 'Email already registered',
                };
            }
        }
        try {
            const s = await this.prisma.student.create({ data: student });
            if (s) {
                return this.get(s.id);
            }
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error creating student',
            };
        }
    }

    public async set(id: string, student: StudentWithPayload): Promise<Student> {
        delete student.Guardians;
        delete student.Tutorships;
        delete student.Authorizations;
        delete student.Sanctions;
        delete student.Invoices;
        delete student.Users;
        delete student.Attendances;
        delete student.Files;
        delete student.Diaries;
        delete student.StudentSeasons;

        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Student not found',
            };
        }

        // tenemos que ver si el estudiante viene con una photo signed url
        if (student.photo && (await isSignedUrlBucket(student.photo))) {
            delete student.photo;
        }

        if (student.password && student.password !== '') {
            student.password = bcrypt.hashSync(student.password, 8);
        } else {
            delete student.password;
        }

        const data = <Student>student;

        try {
            await this.prisma.student.update({ where: { id: id }, data });
            return this.get(id);
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error updating student',
            };
        }
    }

    public async del(id: string): Promise<Student> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Student not found',
            };
        }

        const student = await this.prisma.student.findUnique({ where: { id: id } });
        if (!student) {
            throw <CustomResponse>{
                status: 404,
                message: 'Student not found',
            };
        }
        try {
            await this.prisma.student.delete({ where: { id: id } });
            return student;
        } catch (e) {
            throw <CustomResponse>{
                status: 500,
                message: 'Error deleting student ' + e,
            };
        }
    }

    public async connectGuardian(studentId: string, guardianId: string): Promise<Student> {
        if (!studentId) {
            throw <CustomResponse>{
                status: 500,
                message: 'Student not found',
            };
        }
        if (!guardianId) {
            throw <CustomResponse>{
                status: 500,
                message: 'Guardian not found',
            };
        }

        const student = await this.prisma.student.findUnique({ where: { id: studentId } });
        if (!student) {
            throw <CustomResponse>{
                status: 404,
                message: 'Student not found',
            };
        }

        const guardian = await this.prisma.guardian.findUnique({ where: { id: guardianId } });
        if (!guardian) {
            throw <CustomResponse>{
                status: 404,
                message: 'Guardian not found',
            };
        }

        try {
            await this.prisma.student.update({
                where: { id: studentId },
                data: { Guardians: { connect: { id: guardianId } } },
            });
            return this.get(studentId);
        } catch (e) {
            throw <CustomResponse>{
                status: 500,
                message: 'Error connecting guardian to student ' + e,
            };
        }
    }

    public async disconnectGuardian(studentId: string, guardianId: string): Promise<Student> {
        if (!studentId) {
            throw <CustomResponse>{
                status: 500,
                message: 'Student not found',
            };
        }
        if (!guardianId) {
            throw <CustomResponse>{
                status: 500,
                message: 'Guardian not found',
            };
        }

        const student = await this.prisma.student.findUnique({ where: { id: studentId } });
        if (!student) {
            throw <CustomResponse>{
                status: 404,
                message: 'Student not found',
            };
        }

        const guardian = await this.prisma.guardian.findUnique({ where: { id: guardianId } });
        if (!guardian) {
            throw <CustomResponse>{
                status: 404,
                message: 'Guardian not found',
            };
        }

        try {
            await this.prisma.student.update({
                where: { id: studentId },
                data: { Guardians: { disconnect: { id: guardianId } } },
            });
            return this.get(studentId);
        } catch (e) {
            throw <CustomResponse>{
                status: 500,
                message: 'Error disconnecting guardian from student ' + e,
            };
        }
    }

    public async addFile(studentId: string, file: File): Promise<File[]> {
        file.studentId = studentId;
        file.userId = this.body.userSession.userId;

        try {
            await this.prisma.file.create({ data: file });
            return this.prisma.file.findMany({ where: { studentId, deleted_at: null } });
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error creating File',
            };
        }
    }

    public async getFile(studentId: string, id: string): Promise<File | null> {
        if (!studentId || !id) {
            throw <CustomResponse>{
                status: 500,
                message: 'student ID or File ID not provided',
            };
        }

        const file = await this.prisma.file.findUnique({ where: { id, studentId } });
        if (file) {
            file.url = await getSignedUrlBucket(file.url, 30);
        }
        return file;
    }

    public async delFile(studentId: string, id: string): Promise<File[]> {
        if (!studentId) {
            throw <CustomResponse>{
                status: 500,
                message: 'Student not found',
            };
        }
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'File not found',
            };
        }
        const file = await this.prisma.file.findUnique({
            where: { id: id, studentId },
            include: {
                User: {
                    select: { id: true, name: true, surname: true },
                },
            },
        });
        if (!file) {
            throw <CustomResponse>{
                status: 404,
                message: 'File not found',
            };
        }

        try {
            await this.prisma.file.delete({ where: { id: id, studentId } });
            return this.prisma.file.findMany({
                where: { studentId, deleted_at: null },
                include: {
                    User: {
                        select: { id: true, name: true, surname: true },
                    },
                },
            });
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error deleting File',
            };
        }
    }

    public async addSeason(studentId: string, seasonId: string): Promise<Student | null> {
        if (!studentId) {
            throw <CustomResponse>{
                status: 500,
                message: 'Student not found',
            };
        }
        if (!seasonId) {
            throw <CustomResponse>{
                status: 500,
                message: 'Season not found',
            };
        }

        const student = await this.prisma.student.findUnique({ where: { id: studentId } });
        if (!student) {
            throw <CustomResponse>{
                status: 404,
                message: 'Student not found',
            };
        }

        const season = await this.prisma.season.findUnique({ where: { id: seasonId } });
        if (!season) {
            throw <CustomResponse>{
                status: 404,
                message: 'Season not found',
            };
        }

        // vamos a crearle un recibo con este curso
        const newInvoice = <Invoice>{};
        newInvoice.studentId = studentId;
        newInvoice.seasonId = seasonId;
        newInvoice.date = new Date();
        newInvoice.description = season.name;
        newInvoice.code = '';

        // miramos si ya tiene un recibo creado para este curso
        const invoiceExists = await this.prisma.invoice.findFirst({
            where: { studentId, seasonId, deleted_at: null },
        });
        if (!invoiceExists) {
            try {
                const invoice = await this.prisma.invoice.create({ data: newInvoice });
                console.log('invoice', invoice);
            } catch (e) {
                console.error('e', e);
            }
        }

        // miramos si ya existe la relacion
        const studentSeason = await this.prisma.studentSeason.findFirst({
            where: { studentId, seasonId, deleted_at: null },
        });
        if (studentSeason) {
            throw <CustomResponse>{
                status: 500,
                message: 'El alumno ya tiene este curso asignado',
            };
        }

        try {
            await this.prisma.studentSeason.create({
                data: { studentId, seasonId },
            });
            return this.get(studentId);
        } catch (e) {
            throw <CustomResponse>{
                status: 500,
                message: 'Error connecting season to student ' + e,
            };
        }
    }

    public async delSeason(studentId: string, seasonId: string): Promise<Student | null> {
        if (!studentId) {
            throw <CustomResponse>{
                status: 500,
                message: 'Student not found',
            };
        }
        if (!seasonId) {
            throw <CustomResponse>{
                status: 500,
                message: 'Season not found',
            };
        }

        const student = await this.prisma.student.findUnique({ where: { id: studentId } });
        if (!student) {
            throw <CustomResponse>{
                status: 404,
                message: 'Student not found',
            };
        }

        const season = await this.prisma.season.findUnique({ where: { id: seasonId } });
        if (!season) {
            throw <CustomResponse>{
                status: 404,
                message: 'Season not found',
            };
        }

        try {
            await this.prisma.studentSeason.deleteMany({
                where: { studentId, seasonId },
            });
            return this.get(studentId);
        } catch (e) {
            throw <CustomResponse>{
                status: 500,
                message: 'Error disconnecting season from student ' + e,
            };
        }
    }

    public async setStudentSeason(studentSeason: StudentSeasonWithPayload): Promise<StudentSeason> {
        delete studentSeason.Student;
        delete studentSeason.Season;

        if (!studentSeason.id) {
            throw <CustomResponse>{
                status: 500,
                message: 'StudentSeason ID not provided',
            };
        }
        try {
            const data = <StudentSeason>studentSeason;
            return await this.prisma.studentSeason.update({
                where: { id: studentSeason.id },
                data,
            });
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error updating StudentSeason',
            };
        }
    }
}

import { Prisma, PrismaClient, Student } from '@prisma/client';

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
    };
}>;

export class StudentFacade {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async list(): Promise<Student[]> {
        return this.prisma.student.findMany({ where: { deleted_at: null } });
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
}

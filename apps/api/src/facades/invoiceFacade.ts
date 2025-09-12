import { Prisma, PrismaClient, Invoice } from '@prisma/client';
import { CustomResponse } from '../entities/customresponse';

export type InvoiceWithPayload = Prisma.InvoiceGetPayload<{
    include: {
        User: true;
        Student: true;
    };
}>;

export class InvoiceFacade {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async list(): Promise<Invoice[]> {
        return this.prisma.invoice.findMany({ where: { deleted_at: null } });
    }

    public async get(id: string): Promise<InvoiceWithPayload | null> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Invoice not found',
            };
        }

        return this.prisma.invoice.findUnique({
            where: { id: id },
            include: { User: true, Student: true },
        });
    }

    public async add(invoice: Invoice): Promise<InvoiceWithPayload> {
        try {
            const i = await this.prisma.invoice.create({ data: invoice });
            if (i) {
                return this.get(i.id);
            }
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error creating invoice',
            };
        }
    }

    public async set(id: string, invoice: InvoiceWithPayload): Promise<InvoiceWithPayload> {
        delete invoice.User;
        delete invoice.Student;

        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Invoice not found',
            };
        }

        const data = <Invoice>invoice;

        try {
            await this.prisma.invoice.update({ where: { id: id }, data });
            return this.get(id);
        } catch (e) {
            console.error('e', e);
            throw <CustomResponse>{
                status: 500,
                message: 'Error updating invoice',
            };
        }
    }

    public async del(id: string): Promise<Invoice> {
        if (!id) {
            throw <CustomResponse>{
                status: 500,
                message: 'Invoice not found',
            };
        }

        const invoice = await this.prisma.invoice.findUnique({ where: { id: id } });
        if (!invoice) {
            throw <CustomResponse>{
                status: 404,
                message: 'Invoice not found',
            };
        }
        try {
            await this.prisma.invoice.delete({ where: { id: id } });
            return invoice;
        } catch (e) {
            throw <CustomResponse>{
                status: 500,
                message: 'Error deleting invoice ' + e,
            };
        }
    }
}

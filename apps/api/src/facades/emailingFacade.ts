import nodemailer, { SentMessageInfo } from 'nodemailer';
import process from 'process';
import { PrismaClient } from '@prisma/client';
import { PdfFacade } from './pdfFacade';

export class EmailingFacade {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async testEmail(): Promise<SentMessageInfo | void> {
        const pdfFacade = new PdfFacade(this.prisma, this.body);

        const attachments: { filename: string; content: Uint8Array }[] = [];
        const pdfBuffer = await pdfFacade.generatePdf('<h1>¡Hola desde Noutly!</h1>');
        attachments.push({
            filename: `attachments.pdf`,
            content: pdfBuffer,
        });

        const body = '<p>¡Hola desde Noutly!</p>';

        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT),
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });

            const mailOptions = {
                from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
                to: process.env.TEST_EMAIL,
                subject: '¡Hola desde Noutly!',
                text: body.replace(/<[^>]+>/g, ''),
                html: body,
                attachments,
            };

            return await transporter.sendMail(mailOptions);
        } catch (e) {
            console.log(e);
        }
    }

    public async sendEmail(
        email: string,
        subject: string,
        body: string,
        attachments: { filename: string; content: Uint8Array }[] = [],
    ): Promise<SentMessageInfo | void> {
        /* envío por smtp */
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT),
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });

            const mailOptions = {
                from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
                to: email,
                subject: subject,
                text: body.replace(/<[^>]+>/g, ''),
                html: body,
                attachments: attachments,
            };

            console.log('mailOptions', mailOptions);

            return await transporter.sendMail(mailOptions);
        } catch (e) {
            console.log(e);
        }
    }
}

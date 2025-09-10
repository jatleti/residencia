import { getPuppeteerInstance } from '../factories/puppeteerInstance';
import { PrismaClient } from '@prisma/client';
import { PaperFormat } from 'puppeteer';

export class PdfFacade {
    prisma: PrismaClient;
    body: any;

    constructor(prisma: PrismaClient, body: any) {
        this.prisma = prisma;
        this.body = body;
    }

    public async generatePdf(html: string, format: PaperFormat = 'A4'): Promise<Uint8Array<ArrayBufferLike>> {
        // queremos devolver el pdf en buffer
        try {
            const browser = await getPuppeteerInstance();
            const page = await browser.newPage();

            await page.setContent(html);
            const pdfBuffer = await page.pdf({ format: format, printBackground: true });
            await page.close();

            return pdfBuffer;
        } catch (e) {
            console.log(e);
        }
    }
}

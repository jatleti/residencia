import { Request, Response } from 'express';
import { InvoiceFacade, InvoiceWithPayload } from '../facades/invoiceFacade';
import { Invoice } from '@prisma/client';

export class InvoiceController {
    public list = async (req: Request, res: Response) => {
        const facade = new InvoiceFacade(res.locals.prisma, req.body);
        facade
            .list()
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                res.status(e.status || 500).json({ error: e });
            });
    };

    public get = async (req: Request, res: Response) => {
        const facade = new InvoiceFacade(res.locals.prisma, req.body);
        const id = req.params.id;
        facade
            .get(id)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                if (!e.status) {
                    e.status = 500;
                }
                res.status(e.status || 500).json({ error: e });
            });
    };

    public add = async (req: Request, res: Response) => {
        const facade = new InvoiceFacade(res.locals.prisma, req.body);
        const invoice: Invoice = req.body.data;
        facade
            .add(invoice)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public set = async (req: Request, res: Response) => {
        const facade = new InvoiceFacade(res.locals.prisma, req.body);
        const invoice: InvoiceWithPayload = req.body.data;
        const id: string = req.params.id;
        facade
            .set(id, invoice)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public del = async (req: Request, res: Response) => {
        const facade = new InvoiceFacade(res.locals.prisma, req.body);
        const id: string = req.params.id;
        facade
            .del(id)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };
}

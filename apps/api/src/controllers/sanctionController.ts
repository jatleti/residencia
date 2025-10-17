import { Request, Response } from 'express';
import { SanctionFacade, SanctionWithPayload } from '../facades/sanctionFacade';
import { Sanction } from '@prisma/client';

export class SanctionController {
    public list = async (req: Request, res: Response) => {
        const facade = new SanctionFacade(res.locals.prisma, req.body);
        const studentId = req.params.studentId;
        facade
            .list(studentId)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                res.status(e.status || 500).json({ error: e });
            });
    };

    public get = async (req: Request, res: Response) => {
        const facade = new SanctionFacade(res.locals.prisma, req.body);
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
        const facade = new SanctionFacade(res.locals.prisma, req.body);
        const sanction: Sanction = req.body.data;
        facade
            .add(sanction)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public set = async (req: Request, res: Response) => {
        const facade = new SanctionFacade(res.locals.prisma, req.body);
        const sanction: SanctionWithPayload = req.body.data;
        const id: string = req.params.id;
        facade
            .set(id, sanction)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public del = async (req: Request, res: Response) => {
        const facade = new SanctionFacade(res.locals.prisma, req.body);
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

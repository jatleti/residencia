import { Request, Response } from 'express';
import { GuardianFacade, GuardianWithPayload } from '../facades/guardianFacade';
import { Guardian } from '@prisma/client';

export class GuardianController {
    public list = async (req: Request, res: Response) => {
        const facade = new GuardianFacade(res.locals.prisma, req.body);
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
        const facade = new GuardianFacade(res.locals.prisma, req.body);
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
        const facade = new GuardianFacade(res.locals.prisma, req.body);
        const guardian: Guardian = req.body.data;
        facade
            .add(guardian)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public set = async (req: Request, res: Response) => {
        const facade = new GuardianFacade(res.locals.prisma, req.body);
        const guardian: GuardianWithPayload = req.body.data;
        const id: string = req.params.id;
        facade
            .set(id, guardian)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public del = async (req: Request, res: Response) => {
        const facade = new GuardianFacade(res.locals.prisma, req.body);
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

    public addFile = async (req: Request, res: Response) => {
        const facade = new GuardianFacade(res.locals.prisma, req.body);
        const studentId = req.params.studentId;
        const data: any = req.body.data;
        facade
            .addFile(studentId, data)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                res.status(e.status | e.status).json({ error: e });
            });
    };

    public getFile = async (req: Request, res: Response) => {
        const facade = new GuardianFacade(res.locals.prisma, req.body);
        const studentId = req.params.studentId;
        const fileId = req.params.fileId;
        facade
            .getFile(studentId, fileId)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                res.status(e.status | e.status).json({ error: e });
            });
    };

    public delFile = async (req: Request, res: Response) => {
        const facade = new GuardianFacade(res.locals.prisma, req.body);
        const studentId = req.params.studentId;
        const fileId = req.params.fileId;
        facade
            .delFile(studentId, fileId)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                res.status(e.status | e.status).json({ error: e });
            });
    };
}

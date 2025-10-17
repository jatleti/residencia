import { Request, Response } from 'express';
import { DiaryFacade, DiaryWithPayload } from '../facades/diaryFacade';
import { Diary } from '@prisma/client';

export class DiaryController {
    public list = async (req: Request, res: Response) => {
        const facade = new DiaryFacade(res.locals.prisma, req.body);
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
        const facade = new DiaryFacade(res.locals.prisma, req.body);
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
        const facade = new DiaryFacade(res.locals.prisma, req.body);
        const diary: Diary = req.body.data;
        facade
            .add(diary)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public set = async (req: Request, res: Response) => {
        const facade = new DiaryFacade(res.locals.prisma, req.body);
        const diary: DiaryWithPayload = req.body.data;
        const id: string = req.params.id;
        facade
            .set(id, diary)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public del = async (req: Request, res: Response) => {
        const facade = new DiaryFacade(res.locals.prisma, req.body);
        const id: string = req.params.id;
        const studentId: string = req.params.studentId;
        facade
            .del(id, studentId)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };
}

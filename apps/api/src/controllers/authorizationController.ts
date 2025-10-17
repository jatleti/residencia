import { Request, Response } from 'express';
import { AuthorizationFacade, AuthorizationWithPayload } from '../facades/authorizationFacade';
import { Authorization } from '@prisma/client';

export class AuthorizationController {
    public list = async (req: Request, res: Response) => {
        const facade = new AuthorizationFacade(res.locals.prisma, req.body);
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
        const facade = new AuthorizationFacade(res.locals.prisma, req.body);
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
        const facade = new AuthorizationFacade(res.locals.prisma, req.body);
        const authorization: Authorization = req.body.data;
        facade
            .add(authorization)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public set = async (req: Request, res: Response) => {
        const facade = new AuthorizationFacade(res.locals.prisma, req.body);
        const authorization: AuthorizationWithPayload = req.body.data;
        const id: string = req.params.id;
        facade
            .set(id, authorization)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public del = async (req: Request, res: Response) => {
        const facade = new AuthorizationFacade(res.locals.prisma, req.body);
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

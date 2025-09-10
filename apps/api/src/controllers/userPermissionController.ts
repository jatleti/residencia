import { Request, Response } from 'express';
import { UserPermissionFacade } from '../facades/userPermissionFacade';
import { UserPermission } from '@prisma/client';

export class UserPermissionController {
    public list = async (req: Request, res: Response) => {
        const facade = new UserPermissionFacade(res.locals.prisma, req.body);
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
        const facade = new UserPermissionFacade(res.locals.prisma, req.body);
        const id = req.params.id;
        facade
            .get(id)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                res.status(e.status || 500).json({ error: e });
            });
    };

    public add = async (req: Request, res: Response) => {
        const facade = new UserPermissionFacade(res.locals.prisma, req.body);
        const userPermission: UserPermission = req.body.data;
        facade
            .add(userPermission)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public set = async (req: Request, res: Response) => {
        const facade = new UserPermissionFacade(res.locals.prisma, req.body);
        const userPermission: UserPermission = req.body.data;
        const id: string = req.params.id;
        facade
            .set(id, userPermission)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public del = async (req: Request, res: Response) => {
        const facade = new UserPermissionFacade(res.locals.prisma, req.body);
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

import { Request, Response } from 'express';
import { RoleFacade, RoleWithPayload } from '../facades/roleFacade';
import { Role } from '@prisma/client';

export class RoleController {
    public list = async (req: Request, res: Response) => {
        const facade = new RoleFacade(res.locals.prisma, req.body);
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
        const facade = new RoleFacade(res.locals.prisma, req.body);
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
        const facade = new RoleFacade(res.locals.prisma, req.body);
        const role: Role = req.body.data;
        facade
            .add(role)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public set = async (req: Request, res: Response) => {
        const facade = new RoleFacade(res.locals.prisma, req.body);
        const role: RoleWithPayload = req.body.data;
        const id: string = req.params.id;
        facade
            .set(id, role)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public del = async (req: Request, res: Response) => {
        const facade = new RoleFacade(res.locals.prisma, req.body);
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

    public addPermission = async (req: Request, res: Response) => {
        const facade = new RoleFacade(res.locals.prisma, req.body);
        const id: string = req.params.id;
        const permission: string = req.body.data.permission;
        facade
            .addPermission(id, permission)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public delPermission = async (req: Request, res: Response) => {
        const facade = new RoleFacade(res.locals.prisma, req.body);
        const id: string = req.params.id;
        const permission: string = req.body.data.permission;
        facade
            .delPermission(id, permission)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public updateAllPermissions = async (req: Request, res: Response) => {
        const facade = new RoleFacade(res.locals.prisma, req.body);
        const id: string = req.params.id;
        facade
            .updateAllPermissions(id)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };
}

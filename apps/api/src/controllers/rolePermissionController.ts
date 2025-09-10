import { Request, Response } from 'express';
import { RolePermissionFacade } from '../facades/rolePermissionFacade';
import { RolePermission } from '@prisma/client';

export class RolePermissionController {
    public list = async (req: Request, res: Response) => {
        const facade = new RolePermissionFacade(res.locals.prisma, req.body);
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
        const facade = new RolePermissionFacade(res.locals.prisma, req.body);
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
        const facade = new RolePermissionFacade(res.locals.prisma, req.body);
        const rolePermission: RolePermission = req.body.data;
        facade
            .add(rolePermission)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public set = async (req: Request, res: Response) => {
        const facade = new RolePermissionFacade(res.locals.prisma, req.body);
        const rolePermission: RolePermission = req.body.data;
        const id: string = req.params.id;
        facade
            .set(id, rolePermission)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status || 500).json({ error: e });
            });
    };

    public del = async (req: Request, res: Response) => {
        const facade = new RolePermissionFacade(res.locals.prisma, req.body);
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

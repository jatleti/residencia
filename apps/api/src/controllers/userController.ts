import { Request, Response } from 'express';
import { UserFacade, UserWithPayload } from '../facades/userFacade';
import { User } from '@prisma/client';

export class UserController {
    public list = async (req: Request, res: Response) => {
        const facade = new UserFacade(res.locals.prisma, req.body);
        facade
            .list()
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                res.status(e.status | e.status).json({ error: e });
            });
    };

    public get = async (req: Request, res: Response) => {
        const facade = new UserFacade(res.locals.prisma, req.body);
        let id = req.params.id;
        if (id === 'me') {
            id = req.body.userSession.userId;
        }
        facade
            .get(id)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                if (!e.status) {
                    e.status = 500;
                }
                res.status(e.status | e.status).json({ error: e });
            });
    };

    public add = async (req: Request, res: Response) => {
        const facade = new UserFacade(res.locals.prisma, req.body);
        const user: User = req.body.data;
        facade
            .add(user)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status | e.status).json({ error: e });
            });
    };

    public init = async (req: Request, res: Response) => {
        const facade = new UserFacade(res.locals.prisma, req.body);
        const user: User = <User>{};
        user.email = 'jatleti@gmail.com';
        user.password = '123456';
        user.name = 'Jose';
        user.surname = 'Ibáñez';
        console.log('user', user);
        facade
            .init(user)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status | e.status).json({ error: e });
            });
    };

    public set = async (req: Request, res: Response) => {
        const facade = new UserFacade(res.locals.prisma, req.body);
        const user: UserWithPayload = req.body.data;
        const id: string = req.params.id;
        facade
            .set(id, user)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status | e.status).json({ error: e });
            });
    };

    public del = async (req: Request, res: Response) => {
        const facade = new UserFacade(res.locals.prisma, req.body);
        const id: string = req.params.id;
        facade
            .del(id)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status | e.status).json({ error: e });
            });
    };

    public getByEmail = async (req: Request, res: Response) => {
        const facade = new UserFacade(res.locals.prisma, req.body);
        const email: string = req.body.email;
        facade
            .getByEmail(email)
            .then((session) => {
                res.status(200).json(session);
            })
            .catch((e) => {
                res.status(e.status | e.status).json({ error: e });
            });
    };

    public setRole = async (req: Request, res: Response) => {
        const facade = new UserFacade(res.locals.prisma, req.body);
        const id: string = req.params.id;
        const roleId: string = req.body.data.roleId;
        facade
            .setRole(id, roleId)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((e) => {
                console.error('e', e);
                res.status(e.status | e.status).json({ error: e });
            });
    };

    public addPermission = async (req: Request, res: Response) => {
        const facade = new UserFacade(res.locals.prisma, req.body);
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
        const facade = new UserFacade(res.locals.prisma, req.body);
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
}

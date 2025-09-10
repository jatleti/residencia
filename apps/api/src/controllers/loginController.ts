import { Request, Response } from 'express';
import { LoginFacade } from '../facades/loginFacade';
import { User } from '@prisma/client';

export class LoginController {
    public login = async (req: Request, res: Response) => {
        const loginFacade = new LoginFacade(res.locals.prisma, req.body);
        const email: string = req.body.email;
        const password: string = req.body.password;
        const ip = req.socket.remoteAddress;
        loginFacade
            .login(email, password, ip)
            .then((session) => {
                res.status(200).json(session);
            })
            .catch((e) => {
                res.status(e.status | e.status).json({ error: e });
            });
    };

    public refreshToken = async (req: Request, res: Response) => {
        const loginFacade = new LoginFacade(res.locals.prisma, req.body);
        loginFacade
            .refreshToken()
            .then((session) => {
                res.status(200).json(session);
            })
            .catch((e) => {
                res.status(e.status | e.status).json({ error: e });
            });
    };

    public closeSession = async (req: Request, res: Response) => {
        const loginFacade = new LoginFacade(res.locals.prisma, req.body);
        loginFacade
            .closeSession()
            .then((session) => {
                res.status(200).json(session);
            })
            .catch((e) => {
                res.status(e.status | 500).json({ error: e });
            });
    };

    public register = async (req: Request, res: Response) => {
        const loginFacade = new LoginFacade(res.locals.prisma, req.body);
        const user: User = req.body;
        loginFacade
            .register(user)
            .then((session) => {
                res.status(200).json(session);
            })
            .catch((e) => {
                console.log(e);
                res.status(e.status | e.status).json({ error: e });
            });
    };

    public magicLink = async (req: Request, res: Response) => {
        const loginFacade = new LoginFacade(res.locals.prisma, req.body);
        const email: string = req.body.email;
        const ip = req.socket.remoteAddress;
        loginFacade
            .magicLink(email, ip)
            .then((session) => {
                res.status(200).json(session);
            })
            .catch((e) => {
                res.status(e.status | e.status).json({ error: e });
            });
    };

    public validateMagicLink = async (req: Request, res: Response) => {
        const loginFacade = new LoginFacade(res.locals.prisma, req.body);
        const token: string = req.body.token;
        const ip = req.socket.remoteAddress;
        loginFacade
            .validateMagicLink(token, ip)
            .then((session) => {
                res.status(200).json(session);
            })
            .catch((e) => {
                res.status(e.status | e.status).json({ error: e });
            });
    };

    public validate2FACode = async (req: Request, res: Response) => {
        const loginFacade = new LoginFacade(res.locals.prisma, req.body);
        const code: string = req.body.code;
        const ip = req.socket.remoteAddress;
        loginFacade
            .validate2FACode(code, ip)
            .then((session) => {
                res.status(200).json(session);
            })
            .catch((e) => {
                res.status(e.status | e.status).json({ error: e });
            });
    };

    public validateToken = async (req: Request, res: Response) => {
        res.status(200).json({});
    };
}

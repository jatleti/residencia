import { NextFunction, Request, Response } from 'express';
import { AuthModel } from '../models/authModel';
import { SessionToken } from '../entities/sessionToken';

export class SessionMiddleware {
    public verifyToken = async (req: Request, res: Response, next: NextFunction) => {
        let token = req.headers['authorization'];

        if (token) {
            if (token.startsWith('Bearer')) {
                token = token.substring(7, token.length);
            }
        }
        if (req.query.token) {
            token = String(req.query.token);
        }

        const ip = req.socket.remoteAddress;

        const authModel = new AuthModel(res.locals.prisma);
        let userSession: SessionToken = <SessionToken>{};
        if (token !== '') {
            await authModel
                .verifyToken(token, ip)
                .then((u) => {
                    userSession = u;
                    req.body.userSession = userSession;
                    next();
                })
                .catch((err) => {
                    res.status(err.status).send({
                        error: err,
                    });
                });
        } else {
            res.status(403).send({
                error: 'Token not found',
            });
        }
    };
}

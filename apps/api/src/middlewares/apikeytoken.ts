import { NextFunction, Request, Response } from 'express';
import { ApiKeyTokenModel } from '../models/apikeytokenModel';
import { CustomResponse } from '../entities/customresponse';
export class ApiKeyTokenMiddleware {
    public verifyApiKeyToken = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.apikey;
        if (!token || String(token) === '') {
            res.status(403).send({
                error: <CustomResponse>{
                    status: 403,
                    message: 'Token not sent',
                },
            });
            return;
        } else {
            const ip = req.socket.remoteAddress;
            const apiKeyTokenModel = new ApiKeyTokenModel(res.locals.prisma);
            await apiKeyTokenModel
                .verifyApiKeyToken(String(token), ip)
                .then(() => {
                    next();
                })
                .catch((err) => {
                    res.status(403).send({
                        error: err,
                    });
                });
        }
    };
}

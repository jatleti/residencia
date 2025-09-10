import { Request, Response } from 'express';
import { ApiKeyTokenFacade } from '../facades/apikeytokenFacade';

export class ApikeytokenController {
    public addApiKeyToken = async (req: Request, res: Response) => {
        const facade = new ApiKeyTokenFacade(res.locals.prisma);
        const token = String(req.query.token);
        const description = String(req.query.description);
        facade
            .addApiKeyToken(token, description)
            .then((session) => {
                res.status(200).json(session);
            })
            .catch((e) => {
                res.status(e.status | 500).json({ error: e });
            });
    };

    public generateToken = async (req: Request, res: Response) => {
        const facade = new ApiKeyTokenFacade(res.locals.prisma);
        facade
            .generateToken(32)
            .then((session) => {
                res.status(200).json(session);
            })
            .catch((e) => {
                res.status(e.status | 500).json({ error: e });
            });
    };
}

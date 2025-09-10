import { Request, Response } from 'express';
import { EmailingFacade } from '../facades/emailingFacade';

export class EmailingController {
    public test = async (req: Request, res: Response) => {
        const facade = new EmailingFacade(res.locals.prisma, req.body);
        try {
            const result = await facade.testEmail();
            res.status(200).json(result);
        } catch (e) {
            res.status(e.status || 500).json({ error: e });
        }
    };
}

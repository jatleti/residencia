import { Request, Response } from 'express';
import { StorageFacade } from '../facades/storageFacade';

interface FileRequest extends Request {
    files: any;
}

export class StorageController {
    public addFile = async (req: Request, res: Response) => {
        const storageFacade = new StorageFacade();
        const body: any = req.body;
        const path = req.body.path;
        let file = null;
        if ((req as FileRequest).files.file) {
            file = (req as FileRequest).files.file;
        }

        // if (file) {
        //     const mimetype = file.mimetype;
        //     const allowMimeType = ['image/jpeg', 'image/png', 'image/gif', 'image/svg', 'image/svg+xml'];
        //     if (allowMimeType.indexOf(mimetype) === -1) {
        //         //return res.status(400).send({ message: 'NOT_VALID_EXTENSION' });
        //     }
        //     console.log(file);
        // }

        storageFacade
            .addFile(body, file, path)
            .then((file) => {
                res.status(200).json(file);
            })
            .catch((e) => {
                res.status(e.status | 500).json({ error: e });
            });
    };

    public addPhoto = async (req: Request, res: Response) => {
        console.log('addPhoto');
        const storageFacade = new StorageFacade();
        const body: any = req.body;
        const path = req.body.path;
        let file = null;
        if ((req as FileRequest).files.file) {
            file = (req as FileRequest).files.file;
        }

        if (file) {
            const mimetype = file.mimetype;
            const allowMimeType = ['image/jpeg', 'image/png'];
            if (allowMimeType.indexOf(mimetype) === -1) {
                res.status(400).send({ error: { message: 'NOT_VALID_EXTENSION' } });
                return;
            }
            console.log(file);
        }

        storageFacade
            .addPhoto(body, file, path)
            .then((file) => {
                res.status(200).json(file);
            })
            .catch((e) => {
                res.status(e.status | 500).json({ error: e });
            });
    };
}

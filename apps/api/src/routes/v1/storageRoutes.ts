import express from 'express';
import { StorageController } from '../../controllers/storageController';

const storageController = new StorageController();
const storageRouter = express.Router();
//base URL: /storage
storageRouter.post('/upload/file', storageController.addFile).post('/uploadphoto/file', storageController.addPhoto);

export { storageRouter };

import express from 'express';
import { SeasonController } from '../../controllers/seasonController';
import { checkPermissions } from '../../factories/functions.factory';
import { Permissions } from '../../infrastructure/permissions';

const seasonController = new SeasonController();
const seasonRouter = express.Router();

// base URL: /season
seasonRouter
    .get('', seasonController.list)
    .get('/:id', seasonController.get)
    .post('', seasonController.add)
    .patch('/:id', seasonController.set)
    .delete('/:id', seasonController.del);

export { seasonRouter };

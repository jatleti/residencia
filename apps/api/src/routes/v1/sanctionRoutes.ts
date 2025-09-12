import express from 'express';
import { SanctionController } from '../../controllers/sanctionController';
import { checkPermissions } from '../../factories/functions.factory';
import { Permissions } from '../../infrastructure/permissions';

const sanctionController = new SanctionController();
const sanctionRouter = express.Router();

// base URL: /sanction
sanctionRouter
    .get('', checkPermissions([Permissions.STUDENT.SANCTION.LIST]), sanctionController.list)
    .get('/:id', checkPermissions([Permissions.STUDENT.SANCTION.VIEW]), sanctionController.get)
    .post('', checkPermissions([Permissions.STUDENT.SANCTION.CREATE]), sanctionController.add)
    .patch('/:id', checkPermissions([Permissions.STUDENT.SANCTION.EDIT]), sanctionController.set)
    .delete('/:id', checkPermissions([Permissions.STUDENT.SANCTION.DELETE]), sanctionController.del);

export { sanctionRouter };

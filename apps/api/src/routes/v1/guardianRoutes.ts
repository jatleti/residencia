import express from 'express';
import { GuardianController } from '../../controllers/guardianController';
import { checkPermissions } from '../../factories/functions.factory';
import { Permissions } from '../../infrastructure/permissions';

const guardianController = new GuardianController();
const guardianRouter = express.Router();

// base URL: /guardian
guardianRouter
    .get('', checkPermissions([Permissions.GUARDIAN.LIST]), guardianController.list)
    .get('/:id', checkPermissions([Permissions.GUARDIAN.VIEW]), guardianController.get)
    .post('', checkPermissions([Permissions.GUARDIAN.CREATE]), guardianController.add)
    .patch('/:id', checkPermissions([Permissions.GUARDIAN.EDIT]), guardianController.set)
    .delete('/:id', checkPermissions([Permissions.GUARDIAN.DELETE]), guardianController.del);

export { guardianRouter };

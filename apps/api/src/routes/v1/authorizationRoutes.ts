import express from 'express';
import { AuthorizationController } from '../../controllers/authorizationController';
import { checkPermissions } from '../../factories/functions.factory';
import { Permissions } from '../../infrastructure/permissions';

const authorizationController = new AuthorizationController();
const authorizationRouter = express.Router();

// base URL: /authorization
authorizationRouter
    .get('', checkPermissions([Permissions.STUDENT.AUTHORIZATION.LIST]), authorizationController.list)
    .get('/:id', checkPermissions([Permissions.STUDENT.AUTHORIZATION.VIEW]), authorizationController.get)
    .post('', checkPermissions([Permissions.STUDENT.AUTHORIZATION.CREATE]), authorizationController.add)
    .patch('/:id', checkPermissions([Permissions.STUDENT.AUTHORIZATION.EDIT]), authorizationController.set)
    .delete('/:id', checkPermissions([Permissions.STUDENT.AUTHORIZATION.DELETE]), authorizationController.del);

export { authorizationRouter };

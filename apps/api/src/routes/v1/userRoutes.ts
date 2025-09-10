import express from 'express';
import { UserController } from '../../controllers/userController';
import { checkPermissions } from '../../factories/functions.factory';
import { Permissions } from '../../infrastructure/permissions';

const userController = new UserController();
const userRouter = express.Router();

//base URL: /user
userRouter
    .get('', checkPermissions([Permissions.USER.LIST]), userController.list)
    .get('/:id', checkPermissions([Permissions.USER.VIEW]), userController.get)
    .post('', checkPermissions([Permissions.USER.CREATE]), userController.add)
    .patch('/:id', checkPermissions([Permissions.USER.EDIT]), userController.set)
    .delete('/:id', checkPermissions([Permissions.USER.DELETE]), userController.del)
    .patch('/:id/role', checkPermissions([Permissions.USER.EDIT]), userController.setRole)
    .post('/getByEmail', checkPermissions([Permissions.USER.VIEW]), userController.getByEmail)
    .post('/:id/permissions', checkPermissions([Permissions.USER.EDIT]), userController.addPermission)
    .delete('/:id/permissions', checkPermissions([Permissions.USER.EDIT]), userController.delPermission);

export { userRouter };

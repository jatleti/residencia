import express from 'express';
import { RoleController } from '../../controllers/roleController';
import { checkPermissions } from '../../factories/functions.factory';
import { Permissions } from '../../infrastructure/permissions';

const roleController = new RoleController();
const roleRouter = express.Router();

//base URL: /role
roleRouter
    .get('', checkPermissions([Permissions.SETTINGS.ROLES.LIST]), roleController.list)
    .get('/:id', checkPermissions([Permissions.SETTINGS.ROLES.VIEW]), roleController.get)
    .post('', checkPermissions([Permissions.SETTINGS.ROLES.CREATE]), roleController.add)
    .patch('/:id', checkPermissions([Permissions.SETTINGS.ROLES.EDIT]), roleController.set)
    .patch(
        '/:id/updateAllPermissions',
        checkPermissions([Permissions.SETTINGS.ROLES.EDIT]),
        roleController.updateAllPermissions,
    )
    .delete('/:id', checkPermissions([Permissions.SETTINGS.ROLES.DELETE]), roleController.del)
    .post('/:id/permissions', checkPermissions([Permissions.SETTINGS.ROLES.EDIT]), roleController.addPermission)
    .delete('/:id/permissions', checkPermissions([Permissions.SETTINGS.ROLES.EDIT]), roleController.delPermission);

export { roleRouter };

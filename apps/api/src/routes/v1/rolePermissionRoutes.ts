import express from 'express';
import { RolePermissionController } from '../../controllers/rolePermissionController';

const rolePermissionController = new RolePermissionController();
const rolePermissionRouter = express.Router();

//base URL: /rolePermission
rolePermissionRouter
    .get('', rolePermissionController.list)
    .get('/:id', rolePermissionController.get)
    .post('', rolePermissionController.add)
    .patch('/:id', rolePermissionController.set)
    .delete('/:id', rolePermissionController.del);

export { rolePermissionRouter };

import express from 'express';
import { UserPermissionController } from '../../controllers/userPermissionController';

const userPermissionController = new UserPermissionController();
const userPermissionRouter = express.Router();

//base URL: /userPermission
userPermissionRouter
    .get('', userPermissionController.list)
    .get('/:id', userPermissionController.get)
    .post('', userPermissionController.add)
    .patch('/:id', userPermissionController.set)
    .delete('/:id', userPermissionController.del);

export { userPermissionRouter };

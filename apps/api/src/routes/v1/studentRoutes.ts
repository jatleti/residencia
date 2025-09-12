import express from 'express';
import { StudentController } from '../../controllers/studentController';
import { checkPermissions } from '../../factories/functions.factory';
import { Permissions } from '../../infrastructure/permissions';

const studentController = new StudentController();
const studentRouter = express.Router();

// base URL: /student
studentRouter
    .get('', checkPermissions([Permissions.STUDENT.LIST]), studentController.list)
    .get('/:id', checkPermissions([Permissions.STUDENT.VIEW]), studentController.get)
    .post('', checkPermissions([Permissions.STUDENT.CREATE]), studentController.add)
    .patch('/:id', checkPermissions([Permissions.STUDENT.EDIT]), studentController.set)
    .delete('/:id', checkPermissions([Permissions.STUDENT.DELETE]), studentController.del);

export { studentRouter };

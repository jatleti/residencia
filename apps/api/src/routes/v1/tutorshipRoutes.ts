import express from 'express';
import { TutorshipController } from '../../controllers/tutorshipController';
import { checkPermissions } from '../../factories/functions.factory';
import { Permissions } from '../../infrastructure/permissions';

const tutorshipController = new TutorshipController();
const tutorshipRouter = express.Router();

// base URL: /tutorship
tutorshipRouter
    .get('', checkPermissions([Permissions.STUDENT.TUTORSHIP.LIST]), tutorshipController.list)
    .get('/:id', checkPermissions([Permissions.STUDENT.TUTORSHIP.VIEW]), tutorshipController.get)
    .post('', checkPermissions([Permissions.STUDENT.TUTORSHIP.CREATE]), tutorshipController.add)
    .patch('/:id', checkPermissions([Permissions.STUDENT.TUTORSHIP.EDIT]), tutorshipController.set)
    .delete('/:id', checkPermissions([Permissions.STUDENT.TUTORSHIP.DELETE]), tutorshipController.del);

export { tutorshipRouter };

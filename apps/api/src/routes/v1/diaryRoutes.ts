import express from 'express';
import { DiaryController } from '../../controllers/diaryController';
import { checkPermissions } from '../../factories/functions.factory';
import { Permissions } from '../../infrastructure/permissions';

const diaryController = new DiaryController();
const diaryRouter = express.Router();

// base URL: /diary
diaryRouter
    .get('', checkPermissions([Permissions.STUDENT.DIARY.LIST]), diaryController.list)
    .get('/:id', checkPermissions([Permissions.STUDENT.DIARY.VIEW]), diaryController.get)
    .post('', checkPermissions([Permissions.STUDENT.DIARY.CREATE]), diaryController.add)
    .patch('/:id', checkPermissions([Permissions.STUDENT.DIARY.EDIT]), diaryController.set)
    .delete('/:id', checkPermissions([Permissions.STUDENT.DIARY.DELETE]), diaryController.del);

export { diaryRouter };

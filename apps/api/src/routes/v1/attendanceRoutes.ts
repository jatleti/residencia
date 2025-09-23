import express from 'express';
import { AttendanceController } from '../../controllers/attendanceController';
import { checkPermissions } from '../../factories/functions.factory';
import { Permissions } from '../../infrastructure/permissions';

const attendanceController = new AttendanceController();
const attendanceRouter = express.Router();

// base URL: /attendance
attendanceRouter
    .get('/listAllStudents', checkPermissions([Permissions.STUDENT.LIST]), attendanceController.listAllStudents)
    .get(
        '/listAllStudentsDinner',
        checkPermissions([Permissions.STUDENT.LIST]),
        attendanceController.listAllStudentsDinner,
    )
    .get('', checkPermissions([Permissions.STUDENT.ATTENDANCE.LIST]), attendanceController.list)
    .get('/:id', checkPermissions([Permissions.STUDENT.ATTENDANCE.VIEW]), attendanceController.get)
    .post('/student/:code', attendanceController.addForStudent)
    .post('', checkPermissions([Permissions.STUDENT.ATTENDANCE.CREATE]), attendanceController.add)
    .patch('/:id', checkPermissions([Permissions.STUDENT.ATTENDANCE.EDIT]), attendanceController.set)
    .delete('/:id', checkPermissions([Permissions.STUDENT.ATTENDANCE.DELETE]), attendanceController.del);

export { attendanceRouter };

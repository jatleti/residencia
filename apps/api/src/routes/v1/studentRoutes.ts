import express from 'express';
import { StudentController } from '../../controllers/studentController';
import { checkPermissions } from '../../factories/functions.factory';
import { Permissions } from '../../infrastructure/permissions';
import { TutorshipController } from '../../controllers/tutorshipController';
import { SanctionController } from '../../controllers/sanctionController';
import { AuthorizationController } from '../../controllers/authorizationController';
import { AttendanceController } from '../../controllers/attendanceController';
import { DiaryController } from '../../controllers/diaryController';

const studentController = new StudentController();
const tutorshipController = new TutorshipController();
const sanctionController = new SanctionController();
const diaryController = new DiaryController();
const authorizationController = new AuthorizationController();
const attendanceController = new AttendanceController();
const studentRouter = express.Router();

// base URL: /student
studentRouter
    .get('', checkPermissions([Permissions.STUDENT.LIST]), studentController.list)
    .get('/:id', checkPermissions([Permissions.STUDENT.VIEW]), studentController.get)
    .post('/:id/connectGuardian', checkPermissions([Permissions.STUDENT.EDIT]), studentController.connectGuardian)
    .post('/:id/disconnectGuardian', checkPermissions([Permissions.STUDENT.EDIT]), studentController.disconnectGuardian)
    .post('/:id/addSeason', checkPermissions([Permissions.STUDENT.EDIT]), studentController.addSeason)
    .post('/:id/delSeason', checkPermissions([Permissions.STUDENT.EDIT]), studentController.delSeason)
    .patch('/:id/setStudentSeason', checkPermissions([Permissions.STUDENT.EDIT]), studentController.setStudentSeason)
    .post('', checkPermissions([Permissions.STUDENT.CREATE]), studentController.add)
    .patch('/:id', checkPermissions([Permissions.STUDENT.EDIT]), studentController.set)
    .delete('/:id', checkPermissions([Permissions.STUDENT.DELETE]), studentController.del);

// base URL: /student/:studentId/tutorship
studentRouter
    .get('/:studentId/tutorship', checkPermissions([Permissions.STUDENT.TUTORSHIP.LIST]), tutorshipController.list)
    .get('/:studentId/tutorship/:id', checkPermissions([Permissions.STUDENT.TUTORSHIP.VIEW]), tutorshipController.get)
    .post('/:studentId/tutorship', checkPermissions([Permissions.STUDENT.TUTORSHIP.CREATE]), tutorshipController.add)
    .patch('/:studentId/tutorship/:id', checkPermissions([Permissions.STUDENT.TUTORSHIP.EDIT]), tutorshipController.set)
    .delete(
        '/:studentId/tutorship/:id',
        checkPermissions([Permissions.STUDENT.TUTORSHIP.DELETE]),
        tutorshipController.del,
    );

// base URL: /student/:studentId/sanction
studentRouter
    .get('/:studentId/sanction', checkPermissions([Permissions.STUDENT.SANCTION.LIST]), sanctionController.list)
    .get('/:studentId/sanction/:id', checkPermissions([Permissions.STUDENT.SANCTION.VIEW]), sanctionController.get)
    .post('/:studentId/sanction', checkPermissions([Permissions.STUDENT.SANCTION.CREATE]), sanctionController.add)
    .patch('/:studentId/sanction/:id', checkPermissions([Permissions.STUDENT.SANCTION.EDIT]), sanctionController.set)
    .delete(
        '/:studentId/sanction/:id',
        checkPermissions([Permissions.STUDENT.SANCTION.DELETE]),
        sanctionController.del,
    );

// base URL: /student/:studentId/diary
studentRouter
    .get('/:studentId/diary', checkPermissions([Permissions.STUDENT.DIARY.LIST]), diaryController.list)
    .get('/:studentId/diary/:id', checkPermissions([Permissions.STUDENT.DIARY.VIEW]), diaryController.get)
    .post('/:studentId/diary', checkPermissions([Permissions.STUDENT.DIARY.CREATE]), diaryController.add)
    .patch('/:studentId/diary/:id', checkPermissions([Permissions.STUDENT.DIARY.EDIT]), diaryController.set)
    .delete('/:studentId/diary/:id', checkPermissions([Permissions.STUDENT.DIARY.DELETE]), diaryController.del);

// base URL: /student/:studentId/authorization
studentRouter
    .get(
        '/:studentId/authorization',
        checkPermissions([Permissions.STUDENT.AUTHORIZATION.LIST]),
        authorizationController.list,
    )
    .get(
        '/:studentId/authorization/:id',
        checkPermissions([Permissions.STUDENT.AUTHORIZATION.VIEW]),
        authorizationController.get,
    )
    .post(
        '/:studentId/authorization',
        checkPermissions([Permissions.STUDENT.AUTHORIZATION.CREATE]),
        authorizationController.add,
    )
    .patch(
        '/:studentId/authorization/:id',
        checkPermissions([Permissions.STUDENT.AUTHORIZATION.EDIT]),
        authorizationController.set,
    )
    .delete(
        '/:studentId/authorization/:id',
        checkPermissions([Permissions.STUDENT.AUTHORIZATION.DELETE]),
        authorizationController.del,
    );

// base URL: /student/:studentId/attendance
studentRouter
    .get('/:studentId/attendance', checkPermissions([Permissions.STUDENT.ATTENDANCE.LIST]), attendanceController.list)
    .get(
        '/:studentId/attendance/:id',
        checkPermissions([Permissions.STUDENT.ATTENDANCE.VIEW]),
        attendanceController.get,
    )
    .post('/:studentId/attendance', checkPermissions([Permissions.STUDENT.ATTENDANCE.CREATE]), attendanceController.add)
    .patch(
        '/:studentId/attendance/:id',
        checkPermissions([Permissions.STUDENT.ATTENDANCE.EDIT]),
        attendanceController.set,
    )
    .delete(
        '/:studentId/attendance/:id',
        checkPermissions([Permissions.STUDENT.ATTENDANCE.DELETE]),
        attendanceController.del,
    );

// base URL: /student/:studentId/fileDocuments
studentRouter
    .post('/:studentId/fileDocuments', checkPermissions([Permissions.STUDENT.EDIT]), studentController.addFile)
    .get('/:studentId/fileDocuments/:fileId', checkPermissions([Permissions.STUDENT.EDIT]), studentController.getFile)
    .delete(
        '/:studentId/fileDocuments/:fileId',
        checkPermissions([Permissions.STUDENT.EDIT]),
        studentController.delFile,
    );

export { studentRouter };

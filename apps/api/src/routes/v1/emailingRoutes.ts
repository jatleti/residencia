import express from 'express';
import { EmailingController } from '../../controllers/emailingController';

const emailingController = new EmailingController();
const emailingRouter = express.Router();

//base URL: /emailing
emailingRouter.get('/test', emailingController.test);

export { emailingRouter };

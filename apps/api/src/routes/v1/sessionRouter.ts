import express from 'express';
import { LoginController } from '../../controllers/loginController';

const loginController = new LoginController();
const sessionRouter = express.Router();

//base URL: /sessions
sessionRouter.post('/close', loginController.closeSession).get('/validateToken', loginController.validateToken);

export { sessionRouter };

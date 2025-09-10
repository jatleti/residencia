import express from 'express';
import { LoginController } from '../../controllers/loginController';

const loginController = new LoginController();
const loginRouter = express.Router();

//base URL: /login
loginRouter
    .post('', loginController.login)
    .post('/', loginController.login)
    .post('/magicLink', loginController.magicLink)
    .post('/validateMagicLink', loginController.validateMagicLink)
    .post('/validate2FACode', loginController.validate2FACode)
    .post('/refreshToken', loginController.refreshToken)
    .post('/register', loginController.register);

export { loginRouter };

import express from 'express';
import { UserController } from '../../controllers/userController';

const userController = new UserController();
const userRouterInit = express.Router();

//base URL: /usersinit
userRouterInit.get('/init', userController.init);

export { userRouterInit };

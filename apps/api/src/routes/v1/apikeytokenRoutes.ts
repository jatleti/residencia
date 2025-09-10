import express from 'express';
import { ApikeytokenController } from '../../controllers/apikeytokenController';

const apikeytokenController = new ApikeytokenController();
const apikeytokenRouter = express.Router();

//base URL: /apikeytoken
apikeytokenRouter
    .get('/add?:token', apikeytokenController.addApiKeyToken)
    .get('/generate', apikeytokenController.generateToken);

export { apikeytokenRouter };

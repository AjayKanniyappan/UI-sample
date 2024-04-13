import { Router, Request, Response } from 'express';
import loginController from '@/controllers/login.controller';
import logger from '@/middlewares/logger';

const loginRouter = Router();

loginRouter.all('/', (req: Request, res: Response) => {
  if (req.method === 'POST') {
    try {
      loginController(req, res);
    } catch (error) {
      logger.error(error);
      return res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).send({ success: false, message: 'Method Not Allowed' });
  }
});

export default loginRouter;

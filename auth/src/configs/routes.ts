import authRoutes from '@/main/routes/authRoutes';
import { Router, Express } from 'express';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router)
  authRoutes(router);
};


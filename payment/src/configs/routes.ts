import paymentRoutes from '@/main/routes/paymentRoutes';
import { Router, Express } from 'express';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router)
  paymentRoutes(router);
};


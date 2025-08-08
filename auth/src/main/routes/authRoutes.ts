import { AuthController } from '@/infra/controllers/authController';
import { Router } from 'express';

export default (router: Router): void => {
  router.post('/auth/login', async (req, res) => {
    const controller = new AuthController();
    return controller.login(req, res);
  });
}
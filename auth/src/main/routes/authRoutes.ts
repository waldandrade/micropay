import { Router } from 'express';
import { authMiddleware } from '@/main/middlewares/authMiddleware';

export default (router: Router): void => {
  router.post('/auth/login', authMiddleware, async (req, res) => {
    return res.json({ data: 'Sucesso' });
  });
}
import { Router } from 'express';
import { authMiddleware } from './middleware';

const router = Router();

router.post('/api/auth/login', authMiddleware, async (req, res) => {
  return res.json({ data: 'Sucesso' });
});

export default router;

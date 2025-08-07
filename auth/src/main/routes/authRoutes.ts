import { Router } from 'express';

export default (router: Router): void => {
  router.post('/auth/login', async (req, res) => {
    return res.json({ data: 'Sucesso' });
  });
}
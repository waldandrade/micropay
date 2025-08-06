import { createServer } from 'node:http';
import express from 'express';
import cors from 'cors';
import { authMiddleware } from './middleware';

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000"
  })
)
app.use(express.json());
app.post('/auth/login', authMiddleware, async (req, res) => {
  return res.json({ data: 'Sucesso' });
});

const port = Number(process.env.PORT);
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

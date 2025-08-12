import express from 'express';
import cors from 'cors';
import setupRoutes from '@/configs/routes';
import setupMetrics from '@/configs/metrics';
import { errorHandler } from '@/main/middlewares/errorHandler';
import { verifyToken } from '@/main/middlewares/authMiddleware';
import setupDocs from '@/configs/swagger';

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000"
  })
)
app.use(express.json());
app.use(verifyToken);
setupDocs(app);
setupMetrics(app);
setupRoutes(app);
app.use(errorHandler);

const port = Number(process.env.PORT ?? '3000');
const server = app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
export default server;
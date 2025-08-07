import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile  from '../swagger-output.json';
import setupRoutes from '@/configs/routes';
import { errorHandler } from '@/infra/errorHandler';

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000"
  })
)
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(errorHandler);
setupRoutes(app);

const port = Number(process.env.PORT);
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

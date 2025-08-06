import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile  from './swagger-output.json';
import authRoutes from './routes';

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000"
  })
)
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(authRoutes);

const port = Number(process.env.PORT);
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

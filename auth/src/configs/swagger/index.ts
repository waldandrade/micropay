import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile  from './swagger-output.json';

export default (app: Express): void => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
};

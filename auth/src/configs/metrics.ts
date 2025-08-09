import { Express } from 'express';
import client from 'prom-client';

export default (app: Express): void => {
  const register = new client.Registry();
  register.setDefaultLabels({
    app: 'micropay-auth'
  });
  client.collectDefaultMetrics({register});
  
  app.use('/metrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    const metrics = await register.metrics();
    res.end(metrics);
  });
}
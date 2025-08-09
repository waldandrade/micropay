import swaggerConfig from '@/main/docs'
import swaggerAutogen from 'swagger-autogen';
const swaggetOpenApi = swaggerAutogen({ openapi: '3.0.0' });

const outputFile = './swagger-output.json';
const endpointsFiles = ['../../main/routes/authRoutes.ts'];

swaggetOpenApi(outputFile, endpointsFiles, swaggerConfig);
import swaggerAutogen from 'swagger-autogen';
const swaggetOpenApi = swaggerAutogen({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "My API",
        description: "Some description..."
    },
    servers: [
        {
            url: 'http://localhost:3000/api'
        }
    ],
  host: '',  
    basePath: '/api',
    components: {
        schemas: {
            someBody: {
                $name: "Jhon Doe",
                $age: 29,
                about: ""
            },
            someResponse: {
                name: "Jhon Doe",
                age: 29,
                diplomas: [
                    {
                        school: "XYZ University",
                        year: 2020,
                        completed: true,
                        internship: {
                            hours: 290,
                            location: "XYZ Company"
                        }
                    }
                ]
            },
            someEnum: {
                '@enum': [
                    "red",
                    "yellow",
                    "green"
                ]
            }
        },
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes.ts'];

swaggetOpenApi(outputFile, endpointsFiles, doc);
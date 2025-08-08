import { RedisClient } from "@/configs/redis";
import server from "@/server";
import request from 'supertest';

jest.mock('ioredis', () => require('ioredis-mock'));
describe('Login tests', () => {
  it('Should login and return valid token of user', async () => {
    await request(server)
      .post('/api/auth/login')
      .send({
        provider: 'azure',
        credentials: {
          username: 'john.doe',
          password: 'Test@123'
        }
      })
      .expect(200);
  })

  afterAll(async () => {
    await RedisClient.closeConnection();
    server.close();
  })
});
import redis, { RedisClient } from "@/configs/redis";
import server from "@/server";
import request from 'supertest';

jest.mock('ioredis', () => require('ioredis-mock'));
describe('Login tests', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  })
  it('Should login and return valid token of user', async () => {
    const user = {
        id: 12345,
        username: 'john.doe',
        email: 'valid@user.net',
        name: "User Valid",
        isAdmin: false
      };
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        provider: 'azure',
        credentials: {
          username: user.username,
          password: 'Test@123'
        }
      })
      .expect(200);
    const tokenRedis = await redis.get(`auth:${user.id}:${res.body.token}`);
    expect(tokenRedis).toEqual('true');
    await redis.expire(`auth:${user.id}:${res.body.token}`, 1);
    jest.advanceTimersByTime(9999);
    const tokenRedisEx = await redis.get(`auth:${user.id}:${res.body.token}`);
    expect(tokenRedisEx).toBeNull();
  })
  

  afterAll(async () => {
    await RedisClient.closeConnection();
    server.close();
    jest.useRealTimers();
    jest.clearAllMocks();
  })
});
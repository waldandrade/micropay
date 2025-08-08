import { AuthProvider, AuthResult } from "@/main/ports/AuthProvider";
import jwt from 'jsonwebtoken';
import ms from 'ms';
import { config } from "@/configs";
import redis from "@/configs/redis";

export class AuthenticateUser {
  constructor(private readonly provider: AuthProvider) {}

  async execute(credentials: any): Promise<AuthResult> {
    const user = await this.provider.authenticate(credentials);
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN as ms.StringValue },
    );

    await redis.setex(
      `auth:${user.id}:${token}`,
      24 * 60 * 60,
      'true',
    );

    return {
      ...user,
      token
    }
  }
}

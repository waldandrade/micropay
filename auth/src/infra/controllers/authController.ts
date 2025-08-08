import { Request, Response } from 'express';
import { AuthenticateUser } from '@/domain/usecases/authenticateUser';
import { AuthProviderFactory } from '../providers/auth/AuthProviderFactory';
import logger from '@/configs/logger';
import { InvalidCredentialsError, InvalidProviderError } from '@/main/errors';

export class AuthController {
  async login(req: Request, res: Response): Promise<any> {
    const data = req.body;
    try {
      const authProvider = AuthProviderFactory.create(data.provider);
      const usecase = new AuthenticateUser(authProvider);
      const { token, provider } = await usecase.execute(data.credentials);
      return res.json({ token, provider });
    } catch (err: any) {
      if (err instanceof InvalidProviderError) {
        logger.error(`Invalid provider: ${data.provider}`, err);
        return res.status(400).json({ message: 'Invalid provider' });
      } else if (err instanceof InvalidCredentialsError) {
        logger.error(`Invalid credentials.`, err);
        return res.status(401).json({ message: err.message });
      } else {
        logger.error("Unknown Error:", err);
        return res.status(500).json({ message: 'Unknown Error' });
      }
    }

  }
}
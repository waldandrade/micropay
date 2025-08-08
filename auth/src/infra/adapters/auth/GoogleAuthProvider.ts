import { AuthProvider, AuthResult } from '@/main/ports/AuthProvider';

class MockedOAuth2Client {
  async verifyIdToken(idToken: string): Promise<any> {
    if (idToken !== 'google_valid_token_123') {
      return null;
    }
    return {
      id: '12345',
      email: 'valid@user.net',
      username: 'john.doe',
      name: 'Valid user',
      isAdmin: false
    }
  }
}

export class GoogleAuthProvider implements AuthProvider {
  private client = new MockedOAuth2Client();

  async authenticate(credentials: { token: string }): Promise<AuthResult> {

    const payload = await this.client.verifyIdToken(credentials.token);
    if (!payload) {
      throw new Error("Invalid Google token");
    }

    return {
      id: payload.id!,
      email: payload.email,
      username: payload.username,
      name: payload.name || '',
      isAdmin: payload.isAdmin,
      provider: 'google'
    };
  }
}

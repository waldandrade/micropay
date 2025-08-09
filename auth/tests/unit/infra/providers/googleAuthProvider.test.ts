import { GoogleAuthProvider } from "@/infra/providers/auth/GoogleAuthProvider";
import { AuthResult } from "@/main/ports/AuthProvider";

describe('Google Token Auth', () => {
  it('Should login and return valid token of user', async () => {
    const provider = new GoogleAuthProvider();
    const authResult: AuthResult = await provider.authenticate({
      token: 'google_valid_token_123',
    });
    expect(authResult.isAdmin).toBe(false);
    expect(authResult.email).toEqual('valid@user.net');
  });

  it('Should throws error', async () => {
    const provider = new GoogleAuthProvider();
    await expect(provider.authenticate({
        token: 'google_valid_token_1234',
      })).rejects.toThrow({
        name: 'Error',
        message: 'Invalid Google token',
      });
  });
});
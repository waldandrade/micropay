import { AzureAuthProvider } from "@/infra/adapters/auth/AzureAuthProvider";
import { AuthResult } from "@/main/ports/AuthProvider";

describe('Azure Username & Password Auth', () => {
  it('Should login and return valid token of admin user', async () => {
    const provider = new AzureAuthProvider();
    const authResult: AuthResult = await provider.authenticate({
      username: 'admin',
      password: 'Admin@123',
    });
    expect(authResult.isAdmin).toBe(true);
    expect(authResult.email).toEqual('admin@user.net');
  });

  it('Should login and return valid token of normal user', async () => {
    const provider = new AzureAuthProvider();
    const authResult: AuthResult = await provider.authenticate({
      username: 'john.doe',
      password: 'Test@123',
    });
    expect(authResult.isAdmin).toBe(false);
    expect(authResult.email).toEqual('valid@user.net');
  });
  
  it('Should throws error', async () => {
    const provider = new AzureAuthProvider();
    await expect(provider.authenticate({
        username: 'john.doe',
        password: 'Test@1234',
      })).rejects.toThrow({
      name: 'Error',
      message: 'Invalid username or passowrd',
    });
  });
});
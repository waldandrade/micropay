import { AzureAuthProvider } from "@/infra/adapters/auth/AzureAuthProvider";
import { AuthResult } from "@/main/ports/AuthProvider";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

describe('Azure Username & Password Auth', (t) => {
  it('Should login and return valid token of admin user', async () => {
    const provider = new AzureAuthProvider();
    const authResult: AuthResult = await provider.authenticate({
      username: 'admin',
      password: 'Admin@123',
    });
    assert.strictEqual(authResult.isAdmin, true);
    assert.strictEqual(authResult.email, 'admin@user.net');
  });

  it('Should login and return valid token of normal user', async () => {
    const provider = new AzureAuthProvider();
    const authResult: AuthResult = await provider.authenticate({
      username: 'john.doe',
      password: 'Test@123',
    });
    assert.strictEqual(authResult.isAdmin, false);
    assert.strictEqual(authResult.email, 'valid@user.net');
  });
  
  it('Should throws error', async () => {
    const provider = new AzureAuthProvider();

    await assert.rejects(
      async () => {
        await provider.authenticate({
          username: 'john.doe',
          password: 'Test@1234',
        });
      },
      {
        name: 'Error',
        message: 'Invalid username or passowrd',
      },
    );
  });
});
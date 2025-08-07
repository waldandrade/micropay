import { GoogleAuthProvider } from "@/infra/adapters/auth/GoogleAuthProvider";
import { AuthResult } from "@/main/ports/AuthProvider";
import assert from "node:assert/strict";
import { describe, it } from "node:test";

describe('Google Token Auth', (t) => {
  it('Should login and return valid token of user', async () => {
    const provider = new GoogleAuthProvider();
    const authResult: AuthResult = await provider.authenticate({
      token: 'google_valid_token_123',
    });
    assert.strictEqual(authResult.isAdmin, false);
    assert.strictEqual(authResult.email, 'valid@user.net');
  });

  it('Should throws error', async () => {
    const provider = new GoogleAuthProvider();

    await assert.rejects(
      async () => {
        await provider.authenticate({
          token: 'google_valid_token_1234',
        });
      },
      {
        name: 'Error',
        message: 'Invalid Google token',
      },
    );
  });
});
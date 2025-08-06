interface TGoogleAuth {
  "provider": "google",
  "credentials": { "token": string }
}

interface TAzureAuth {
  "provider": "azure",
  "credentials": { "username": string, "password": string }
}

type TAuthData = TGoogleAuth | TAzureAuth;

export function authMiddleware (req, res, next) {
  const authBody: TAuthData = req.body;
  console.log('Request URL:', req.originalUrl);
  next();
}
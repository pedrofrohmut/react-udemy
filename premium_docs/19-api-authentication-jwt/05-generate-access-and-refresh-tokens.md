## Generate JWT Helper

Now that we can register a user, we need to crate a helper function that will generate a JWT. We will use this to generate both access tokens and refresh tokens. The way that I want this to work is that when a user registers, they are automatically logged in. This means that we need to generate a JWT when the user registers.

Since we will be doing this in both the register and login routes, we will create a helper function that generates a JWT.

## JWT Secret

When a JWT is generated, it is signed with a secret. This secret is used to verify the JWT when it is sent back to the server. We need to create a secret for our application.

Open your `.env` file and add the following line:

```env
JWT_SECRET=your_jwt_secret
```

You can generate a random Base64 secret that's 32 bytes using the following command:

```bash
openssl rand -base64 32
```

Create a new file at `utils/generateToken.js` and add the following code:

```javascript
import { SignJWT } from 'jose';
import dotenv from 'dotenv';
dotenv.config();

//  Convert the JWT secret to a Uint8Array
//  using TextEncoder. This is required by the jose library for signing the JWT.
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * Generates a JWT.
 * @param {Object} payload - Data to embed in the token.
 * @param {string} expiresIn - Expiration time (e.g., '15m', '7d', '30d')
 */
export const generateToken = async (payload, expiresIn = '15m') => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);
};
```

`Uint8Array` is a typed array in JavaScript that represents an array of 8-bit unsigned integers (values from 0 to 255). It's a way to work directly with binary data (like raw bytes) in a more memory-efficient and performant way than regular arrays. Jose needs the secret in this format.

We are first getting the secret from the environment variable and encoding it to match the format that the `jose` library expects. Then we are creating a new JWT with the payload and an expiration time that we pass to the function. 15 minutes is what the access tokens will be so we set that as the default. We are also setting the header to use the `HS256` algorithm, setting the issued at time.

## Helper File For Secret

We will be using the JWT secret in multiple places and converting it to a `Uint8Array` every time is not ideal. We can create a helper function that will do this for us. This will make our code cleaner and easier to read.

Create a new file at `utils/getJwtSecret.js` and add the following code:

```javascript
import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
```

Now import this file in the `generateToken.js` file and use it instead of converting the secret to a `Uint8Array` every time.

```javascript
import { JWT_SECRET } from './getJwtSecret.js';
```

Delete the `JWT_SECRET` variable and the dotenv import.

The whole file should look like this:

```javascript
import { SignJWT } from 'jose';
import { JWT_SECRET } from './getJwtSecret.js';

/**
 * Generates a JWT.
 * @param {Object} payload - Data to embed in the token.
 * @param {string} expiresIn - Expiration time (e.g., '15m', '7d', '30d')
 */
export const generateToken = async (payload, expiresIn = '15m') => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);
};
```

## Sending an Access Token on Register

We want to send the access token back to the client when the user registers. This way, the client can use it to authenticate itself to the server.

Open the `routes/authRoutes.js` file and import the `generateToken` function at the top of the file:

```javascript
import { generateToken } from '../utils/generateToken.js';
```

After this line:

```javascript
const user = await User.create({ name, email, password });
```

Add these lines:

```javascript
// Create tokens
const payload = { userId: user._id.toString() };
const accessToken = await generateToken(payload, '1m');
const refreshToken = await generateToken(payload, '30d');
```

This will create both an access token and a refresh token. The access token will expire in 1 minute and the refresh token will expire in 30 days. we converted the user id to a string because the `user._id` is an object id and we want to store it as a string in the token.

## Save the Refresh Token

We need to save the refresh token in an HTTP-only cookie. This way, the client can use it to get a new access token when the old one expires.

Add the following after the token creation:

```javascript
// Set refresh token in HTTP-only cookie
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'none',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
});
```

This will set the refresh token in an HTTP-only cookie. The `secure` option ensures that the cookie is only sent over HTTPS. The `sameSite` option is set to `none` because our frontend and backend will be on different domains. This makes the app a little less secure but is necessary for our use case. The `httpOnly` option ensures that the cookie is not accessible to JavaScript, which helps prevent XSS attacks.

We can setup a proxy in Vercel to make the frontend and backend on the same domain. This way, we can set the `sameSite` option to `lax`. That may be something we do later.

The `maxAge` option sets the expiration time for the cookie, which will be 30 days.

## Send the Access Token in the Response

Finally, we need to send the access token in the response. Add the following line after setting the cookie:

```javascript
res.status(201).json({
  accessToken,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});
```

Delete your user in Compass or Atlas and create a new one. You should see the access token in the response.

In Postman, click on the `Cookies` tab and you should see the refresh token in the cookies. It is HTTP-only, so you won't be able to see it in the console or access it in JavaScript.

In the next lesson, we will create a logout route that will delete the refresh token from the cookie.

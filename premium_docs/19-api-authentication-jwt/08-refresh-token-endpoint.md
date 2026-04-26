# Refresh Token Route

Now that we can register, login and logout, we need to create a refresh token route. This route will allow us to generate a new access token using the refresh token that is stored in the cookie. This is useful because access tokens are short-lived and we don't want to ask the user to log in again when the access token expires.

## Cookie Parser Middleware

We need to install the `cookie-parser` middleware to parse the cookies in the request by using the `req.cookies` object. This middleware will help us get the refresh token from the cookie.

```bash
npm install cookie-parser
```

Then, we need to add the middleware to our app. Open the `server.js` file and add the following line after the `express.json()` middleware:

```javascript
import cookieParser from 'cookie-parser';

// Other middlewares
app.use(cookieParser());
```

Open the `routes/authRoutes.js` file and add import the `jwtVerify` method from the `jose` package and the JWT_SECRET at the top of the file. Also, get the secret from the environment variables:

```javascript
import { jwtVerify } from 'jose';
import { JWT_SECRET } from '../utils/getJwtSecret.js';
```

Then, add the following route to the `routes/authRoutes.js` file:

```javascript
// @route   POST /api/auth/refresh
// @desc    Issue a new access token using refresh token
// @access  Public (but requires valid refresh token in cookie)
router.post('/refresh', async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    console.log('Refreshing token...');

    if (!token) {
      res.status(401);
      throw new Error('Refresh token missing');
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);

    const user = await User.findById(payload.userId);

    if (!user) {
      res.status(401);
      throw new Error('User no longer exists');
    }

    const newAccessToken = await generateToken(
      { userId: user._id.toString() },
      '1m'
    );

    res.json({
      accessToken: newAccessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    err.message = 'Invalid or expired refresh token';
    res.status(401);
    next(err);
  }
});
```

We get the refresh token from the cookie and verify it using the `jwtVerify` method and the token secret. If the token is valid, we create a new access token using the user ID from the refresh token and then we send it back to the client. The response will also include the user. If the token is invalid or expired, we send a 401 error.

## Test the Refresh Token Route

Now that we have the refresh token route, we can test it. First, log in to your app and get the refresh token from the cookie. You can do this by checking the cookies in your browser or using Postman.

Then, make a POST request to the `/api/auth/refresh` route. You should get a new access token in the response. You can use this access token to access protected routes. So in your frontend, you can call this route to get a new access token when the old one expires.

In the next lesson, we will learn how to protect the routes we need to protect using the access token.

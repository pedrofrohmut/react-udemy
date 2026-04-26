# Middleware For Protecting Routes

In order to test to see if our token and authentication system is working, we need to protect some of our routes. If we think about the idea routes, which should be protected? You should have to be logged in to create, update and delete an idea. The only routes that should be public are the ones that get all ideas and get a single idea. So we need to protect the following routes:

- POST /api/ideas
- PUT /api/ideas/:id
- DELETE /api/ideas/:id

## Middleware

In order to protect our routes, we need to create a middleware function that will check if the user is authenticated. Remember, middleware functions are functions that have access to the request object (req), the response object (res). We want to check if the request has a token in the headers. If it does, we want to verify the token and then call the next middleware function. If it doesn't, we want to send a 401 Unauthorized response.

Create a new file at `/middleware/authMiddleware.js` and add the following code:

```javascript
import { jwtVerify } from 'jose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { JWT_SECRET } from '../utils/getJwtSecret.js';

dotenv.config();

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }

    const token = authHeader.split(' ')[1];
    const { payload } = await jwtVerify(token, JWT_SECRET);

    const user = await User.findById(payload.userId).select('_id name email');

    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401);
    next(new Error('Not authorized, token failed'));
  }
};
```

We are using the `jwtVerify` function from the `jose` library to verify the token. We get our secret from the environment variable.

In the function, we get the authorization header from the request. If it doesn't exist or doesn't start with `Bearer `, we send a 401 Unauthorized response. When you send a token, you should send it in the format `Bearer <token>`. It is a standard way to send tokens in the authorization header.
If the token exists, we split it and get the token part. We then verify the token using the `jwtVerify` function. We then get the user from the database using the userId from the token payload. If the user doesn't exist, we send a 401 Unauthorized response. If the user exists, we add the user to the request object and call the next middleware function.

When we have a protected route, we can access the user from the request object. For example, if we want to get the user id, we can do `req.user._id`. This is useful for when we want to create an idea and associate it with the user.

## Using The Middleware to Protect Routes

Now we want to use this middleware to protect our routes. We can do this by importing the middleware and using it in our routes. Open the `/routes/ideaRoutes.js` file and import the middleware at the top of the file:

```javascript
import { protect } from '../middleware/authMiddleware.js';
```

Then, we want to use the middleware on the routes that we want to protect. We can do this by adding it as a second argument to the route handler. For example:

```javascript
router.post('/', protect, async (req, res, next) => {}
```

You can also change the access comment to "Private" instead of "Public" to indicate that this route is protected. Do this for all the routes that we want to protect:

```javascript
router.delete('/:id',protect, async (req, res, next) => {}
router.put('/:id', protect, async (req, res, next) => {}
```

## Test Protected Routes

Now that we have protected our routes, we want to test them. We can do this by using Postman or whatever API testing tool you are using. We want to test the following scenarios:

- Test the protected routes (such as POST /api/ideas) without a token. You should get a 401 Unauthorized response.
- Test the protected routes with an invalid token. You should get a 401 Unauthorized response.
- Test the protected routes with a valid token (Access token from login route). You should get a 200 OK response and the expected data.

The way you add the token in Postman is by going to the Authorization tab and selecting Bearer Token. Then, you can paste the token in the Token field.

If it is the correct token, you should not get the 401 anymore, however, you will probably get a validation error complaining about not having a user. This is because in the model, we are expecting a user for the idea, but we have not updated this route to include the user. We will do this soon, but as long as you are not getting that 401 error, you are good for now.

In the next lesson, we will update the idea routes to include the user and also add a way to get the user from the token.

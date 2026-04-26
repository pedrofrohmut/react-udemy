# User Register Endpoint
Now we will create a route for user registration. This route will handle the registration of new users by accepting their username and password, validating the input, hashing the password, and storing the user in the database.

Create a new file at `routes/authRoutes.js`. You could call this `routes/userRoutes.js`, however, to me, that is a bit misleading as this route will be used for authentication and not just for users. So I will call it `authRoutes.js`.

## Add Route Middleware

In order for these routes to work, we need to add the route middleware to our `server.js` file. Open `server.js` and add the following code:

```javascript
import AuthRouter from './routes/authRoutes.js';
```

Then, add the following line to the `app.use` section:

```javascript
app.use('/api/auth', AuthRouter);
```

Import express and the User model and generate a router instance. We also need to export the router at the end of the file:

```javascript
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// All routes...

export default router;
```

Now we will create a route for user registration. This route will handle the registration of new users by accepting their username and password, validating the input and storing the user in the database. Remember, we handle the password hashing in the User model, so we don't need to do that here.

```javascript
// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('All fields are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
});
```

We are doing some basic validation here. We check if the name, email, and password are provided. If not, we return a 400 status code with an error message. We also check if the user already exists in the database by searching for the email. If the user already exists, we return a 400 status code with an error message.

If the user does not exist, we create a new user using the `User.create` method. This method will automatically hash the password for us because we defined a pre-save hook in the User model. Finally, we return a 201 status code with the user information (excluding the password) and the createdAt timestamp.

## Test it Out

Open Postman and create a new request to `http://localhost:5000/api/auth/register` with the following body:

```json
{
  "name": "John Doe",
  "email": "user1@gmail.com",
  "password": "123456"
}
```

You should get a response like this:

```json
{
  "user": {
    "id": "64f8c4b2e4b0a3d1f8e4b0a3",
    "name": "John Doe",
    "email": "user1@gmail.com"
  }
}
```

You can also check the database with either Compass or Atlas to see if the user was created successfully. You should see a new user in the `users` collection with the hashed password.

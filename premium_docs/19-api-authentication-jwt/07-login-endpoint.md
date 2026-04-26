# Login Route

We can register a new user and get a token. Now we need to create a login route that will allow us to authenticate a user and return a token.

## Custom Model Method To Compare Passwords

When a user registers, we hash their password and store it in the database. When a user logs in, we need to compare the password they provide with the hashed password stored in the database.
We have to match the user's text password from the form to the hashed password stored in the database. We could do this right in the route, howeverm I want to show you how we can create a custom method in the User model to do this.

We will create a method called `matchPassword` that will take the password provided by the user and compare it with the hashed password stored in the database.

Open the `models/User.js` file and add the following method under the schema:

```javascript
// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
```

We use the `bcrypt.compare` method to compare the entered password with the hashed password. If they match, it will return true; otherwise, it will return false.

## Create The Login Route

Add the following route to the `routes/authRoutes.js` file:

```javascript
// @route   POST /api/auth/login
// @desc    Login a user
// @access  Public
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for email and password
    if (!email || !password) {
      res.status(400);
      throw new Error('Email and password are required');
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    // Create tokens
    const payload = { userId: user._id.toString() };
    const accessToken = await generateToken(payload, '1m');
    const refreshToken = await generateToken(payload, '30d');

    // Set refresh token as HttpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      accessToken,
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

This is similar to the register except instead of creating a new user, we are finding the user in the database. We check if the email and password are provided, then we find the user by email. If the user is found, we check if the password matches using the `matchPassword` method we created in the User model. If it matches, we create the access and refresh tokens and set the refresh token as an HTTP-only cookie. Finally, we send the access token and user information in the response.

Test it out by sending a POST request to `http://localhost:5000/api/auth/login` with the following body:

```json
{
  "email": "user1@gmail.com",
  "password": "123456"
}
```

You should get a response with the user and the access token.

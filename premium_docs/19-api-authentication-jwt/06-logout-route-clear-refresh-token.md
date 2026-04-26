# Logout Route & Clear Refresh Token

Now that we are able to create a refresh token, we need to create a logout route that will clear the refresh token from the cookie. This will log the user out and prevent them from using the refresh token to get a new access token.

Add the following route to the `routes/authRoutes.js` file:

```javascript
// @route   POST /api/auth/logout
// @desc    Logout user & clear token cookie
// @access  Public
router.post('/logout', (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
  });

  res.status(200).json({ message: 'Logged out successfully' });
});
```

This is essentially the same as the following:

```js
res.cookie('refreshToken', '', {
  expires: new Date(0),
  ...options
});
```

It replaces it with a new cookie that expires now.

Now open Postman and send a POST request to `/api/auth/logout`. You should see the message `Logged out successfully` in the response. If you check the cookies, you should see that the refresh token has been cleared.

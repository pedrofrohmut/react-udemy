# User Logout

We can login and even though it does not persist yet, I want to be able to logout. This is easy because we have a logout endpoint in the backend that will clear the refresh token from the HTTPOnly cookie. We can call this endpoint from the frontend and it will clear the refresh token from the cookie. This will effectively log the user out.

Open the `src/api/auth.js` file and add the following code to the `logout` function:

```javascript
// Logout user and clear refresh token
export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error: any) {
    const message =
      error.response?.data?.message || 'Logout failed';
    throw new Error(message);
  }
};
```

This function will call the `/api/auth/logout` endpoint and clear the refresh token from the HTTPOnly cookie.

Now open the `src/components/Header.js` file and import the `logoutUser` function and `useNavigate`:

```javascript
import { Link, useNavigate } from '@tanstack/react-router';
import { Lightbulb } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { logoutUser } from '@/api/auth';
```

Initialize the `useNavigate` hook and bring in the `setUser` and `setAccessToken` from the `useAuth` context:

```javascript
const navigate = useNavigate();
const { user, setUser, setAccessToken } = useAuth();
```

Then add a `handleLogout` function that will call the `logoutUser` function and redirect the user to the login page:

```javascript
const handleLogout = async () => {
  try {
    await logoutUser();
    setAccessToken(null);
    setUser(null);
    navigate({ to: '/' });
  } catch (err) {
    console.error('Logout failed:', err);
  }
};
```

We are setting the access token and user to `null` in the context to clear them from the state. We are also redirecting the user to the login page after logging out.

Now add it to the button:

```javascript
<button
  onClick={handleLogout}
  className='text-red-600 hover:text-red-800 font-medium transition px-3 py-2 leading-none'
>
  Logout
</button>
```

Now login, do not refresh the page and then click the logout button. You will be logged out and if you look at the cookies, the refresh token will be cleared. You can also check the network tab to see that the logout request was made and the refresh token was cleared. We are almost there!

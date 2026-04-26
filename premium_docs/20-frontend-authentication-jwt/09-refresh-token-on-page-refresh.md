# Refresh Token on Page Refresh

Right now if we log in and refresh the page, we will lose the access token and user. This is because we are not persisting them anywhere. We can use the refresh token to get a new access token when the user refreshes the page. This way we can persist the authentication state.

Let's open the `src/api/auth.js` file and add a new function to get the access token using the refresh token:

```javascript
// Get new access token using refresh token
export const refreshAccessToken = async (): Promise<{
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}> => {
  try {
    const res = await api.post('/auth/refresh');
    return res.data;
  } catch (error: any) {
    throw new Error(
      error?.res?.data?.message || 'Failed to refresh access token'
    );
  }
};
```

This function will call the `/api/auth/refresh` endpoint and return the new access token. We need to call this function when the user refreshes the page and set the access token in the context.

## Update AuthContext

Open the `src/context/AuthContext.js` file and import the `refreshAccessToken` function as well as the `useEffect` hook:

```javascript
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { refreshAccessToken } from '@/api/auth';
```

Then update the `useEffect` hook to call the `refreshAccessToken` function and set the access token and user in the context. The `useEffect` hook should go inside the `AuthProvider` component under the state values:

```javascript
// Get new token on mount
useEffect(() => {
  const loadAuth = async () => {
    try {
      const { accessToken: newToken, user } = await refreshAccessToken();
      setAccessToken(newToken);
      setUser(user);
    } catch (error) {
      console.error('Failed to refresh access token:', error);
    }
  };

  loadAuth();
}, []);
```

Now try logging in and refreshing the page. You should see that the access token is persisted and the logout button should still show in the header. You can also check the network tab to see that the refresh token request was made and the new access token was returned. You can check the React Devtools to see that the access token and user are set in the context.

One thing I want to mention is that this addresses the persisting on refresh issue, however, remember, we set the access token to expire in 1 minute. So if you log in and wait for 1 minute, the access token will expire so you would not be able to use it to access protected routes in the API. This is because we are not refreshing the access token when it expires. We will address this in the next lesson.

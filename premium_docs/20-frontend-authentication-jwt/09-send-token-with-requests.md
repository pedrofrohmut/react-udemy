# Send token with requests

Ok so right now you can log in and have an access token for 1 minute. Try logging in and click "Create Idea". You will see an error message in the console. This is because we are not sending the access token with the request. Let's fix that.

## Axios Interceptors

This is a great case for using Axios interceptors. Interceptors are functions that Axios calls for every request or response. This allows us to modify the request or response before it is sent or received. We can use this to add the access token to the request headers and handle the refresh token when the access token expires.

We have a couple of options here. We could use the interceptor directly in the `AuthContext.tsx` file, but I prefer to keep the Axios instance and the interceptors in the `axios.ts` file. This means that we need a way to access the access token in the `axios.ts` file. Normally, we use the `useAuth` hook to get the access token, but we can't use hooks in the `axios.ts` file. Instead, we will create a function that returns the access token.

We can do this by creating a function that returns the access token. We will create a new file at `src/lib/authToken.ts` and add the following code:

```javascript
let accessToken: string | null = null;

export const setStoredAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getStoredAccessToken = () => accessToken;
```

This is just a function that allows use to set and get the access token. Again, the reason for this is because we can not use the `useAuth` hook in the Axios interceptor. We need to be able to get the access token from anywhere in our app.

Now, open the `src/context/AuthContext.tsx` file and import the `setStoredAccessToken` function. We will set the access token when we get it from the server:

```javascript
import { setStoredAccessToken } from '@/lib/authToken';
```

Now, in the `AuthContext` `useEffect`, we will set the access token when we get it from the server:

```tsx
useEffect(() => {
    const loadAuth = async () => {
      try {
        const { accessToken: newToken, user } = await refreshAccessToken();
        setAccessToken(newToken);
        setUser(user);
        setStoredAccessToken(newToken);
      } catch (error) {
        console.error('Failed to refresh access token:', error);
      }
    };

    loadAuth();
  }, []);
```

## Keep In Sync with the Server

We need to make sure that the access token is in sync with the server. We can do this by adding another `useEffect` that will run when the access token changes. This will be used to set the access token in the Axios instance. We can do this by adding the following code to the `AuthContext`:

```tsx
useEffect(() => {
  setStoredAccessToken(accessToken);
}, [accessToken]);
```

This will set the access token in memory whenever it changes. We can use this to set the access token in the Axios instance.

## Create the Interceptor

Now open the `src/lib/axios.ts` file and add this import:

```javascript
import { getStoredAccessToken } from '@/lib/authToken';
```

And add the interceptor to the Axios instance:

```javascript
// Attach token to requests
api.interceptors.request.use((config) => {
  const token = getStoredAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

Interceptors are created using the `interceptors` property of the Axios instance. The `request` interceptor is called before the request is sent. The `response` interceptor is called after the response is received.

We are simply getting the access token from the `getStoredAccessToken` function and adding it to the request headers. This will add the access token to every request that we make with the Axios instance.

The only issue now is the access token expiration. If the access token expires, we will get a 401 error. You'll notice if you change the route to the Idea form, it will work even after a minute. this is because we made it so we get a new token when we re-render the app. This is from the `useEffect` hook that we created in the `AuthContext.tsx` file. However, if you sit on the Idea form page for more than a minute and then try to create an idea, you will get a 401 error. This is because the access token has expired. We will handle this in the next step.

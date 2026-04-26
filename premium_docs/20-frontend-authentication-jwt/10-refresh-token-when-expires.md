# Refresh Token When Expires

Now that we can create a new idea with an access token that is valid for 1 minute, we need to handle the case when the access token expires. If that `useEffect` in the `AuthContext` does not run, the token will not be refreshed.

We can create another Axios interceptor that will make the request to whatever endpoint we need and if it gets a 401 error, we can refresh the token.

## Update the Axios Instance

Now we can update the Axios instance to use the access token. Open the `src/lib/axios.ts` file and import the `refreshAccessToken`:

```tsx
import { refreshAccessToken } from '@/api/auth';
```

Let's create this slowly so you understand what is happening.

Add the following interceptor to the Axios instance:

```tsx
// Retry once if 401
api.interceptors.response.use((res) => res, async (error) => {
    console.log(error.response?.status);
  }
);
```

Now go to the create idea page and wait one minute or whatever your access token expiration time is. Then try to create an idea. You should see a 401 error in the console. This is because the access token has expired.

Now add this code to the interceptor:

```tsx
// Retry once if 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      const originalRequest = error.config;
      console.log(
        'originalRequest.headers BEFORE retry:',
        originalRequest.headers
      );
    }
  }
);
```

This will log the original request headers before we retry the request. This is useful for debugging and seeing what the headers look like before we modify them. This will have your expired access token in the headers.

We need to get a new access token. We can do this by calling the `refreshAccessToken` function We also need to add a `_retry` property to the original request config. This will be used to prevent an infinite loop if the refresh token also expires. We can set this to `true` after we get a new access token.

Add the following code to the interceptor:

```tsx
// Retry once if 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        const { accessToken: newToken } = await refreshAccessToken();
        setStoredAccessToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error('Refresh token failed', err);
      }
    }

    return Promise.reject(error);
  }
);
```

We are getting the original request config from the error. We check if the status is 401 and if the `_retry` property is not set. We also check if the URL does not include `/auth/refresh`. This is to prevent an infinite loop if the refresh token also expires. A loop will happen if the refresh token expires and we try to refresh it again. We set the `_retry` property to `true` to prevent this.

Then we call the `refreshAccessToken` function. This will return a new access token. We set the access token in memory and in the request headers. We don't need to do anything with the user.

We then call the original request again with the new access token. So no localStorage is needed here. We are just using the `setStoredAccessToken` function to set the access token in memory. This is much more secure because nothing is being stored in localStorage.

Now you should be able to create an idea after the access token has expired. The interceptor will automatically refresh the access token and retry the request.

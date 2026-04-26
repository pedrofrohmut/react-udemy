# Login User

The login will be similar to the registration process. Let's create our api function in the `api/auth.ts` file. Create a new function called `loginUser`:

```typescript
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Login failed';
    throw new Error(message);
  }
};
```

Now open the `src/routes/(auth)/login.tsx` file and add the following imports:

```typescript
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/api/auth';
import { useAuth } from '@/context/AuthContext';
```

## Handle Errors

Add a piece of state to hold the error message and the form values:

```typescript
const [error, setError] = useState('');
```

Add the following in the return below the heading:

```typescript
{
  error && (
    <div className='bg-red-100 text-red-700 px-4 py-2 rounded mb-4'>
      {error}
    </div>
  );
}
```

Above the state values, initialize the navigate and get the `setAccessToken` function from the context:

```typescript
const navigate = useNavigate();
const { setAccessToken, setUser } = useAuth();
```

Create the mutation below the state values:

```typescript
const { mutateAsync, isPending } = useMutation({
  mutationFn: loginUser,
  onSuccess: (data) => {
    setAccessToken(data.accessToken);
    setUser(data.user);
    navigate({ to: '/ideas' });
  },
  onError: (err: Error) => {
    setError(err.message);
  },
});
```

Add the form submission handler:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  await mutateAsync({ email, password });
};
```

Let's use the `isPending` state to disable the button while the request is being processed:

```typescript
<button
  type='submit'
  className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full disabled:opacity-50'
  disabled={isPending}
>
  {isPending ? 'Logging in...' : 'Login'}
</button>
```

Try logging in with invalid credentials. You will see an error message in the console.

Now log in with the correct credentials. You will be redirected to the `/ideas` page.

Your access token will be stored in the context. You can use it to make authenticated requests to the API but only for 1 minute because thats what we set it to. Before we get to the refresh token, let's add conditional links in the nav and then add the logout functionality.

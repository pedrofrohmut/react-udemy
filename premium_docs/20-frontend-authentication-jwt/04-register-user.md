# Register User

Now that we have our pages and context, let's start to make the authentication flow work. We will start with the registration. Just like we had an api functions file for the ideas, we will create one for the authentication. We will create a new file called `auth.ts` in the `src/api` folder.

Add the following code to the `src/api/auth.ts` file:

```typescript
import api from '@/lib/axios';

export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await api.post('/auth/register', { name, email, password });
    return res.data; // { accessToken, user }
  } catch (error: any) {
    // Handle structured error message if it exists
    const message = error.response?.data?.message || 'Failed to register';
    throw new Error(message);
  }
};
```

We are making a request to the `/api/auth/register` endpoint with the `name`, `email`, and `password` in the body. If we were using `fetch`, we would need to set the `Content-Type` header to `application/json` and the `credentials` to `include`. However, Axios does this for us automatically because of the instance that we set up earlier. We are also handling the error in a structured way. If the error has a response, we will use the message from the response. Otherwise, we will use a generic message.

## Hook Up Register Page

Now let's hook up the register page to use this function along with Tanstack Query. We will use the `useMutation` hook from Tanstack Query to handle the registration.

Add the following imports to the `src/routes/(auth)/register.tsx` file:

```typescript
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { registerUser } from '@/api/auth';
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

Now, create a mutation for the registration above the `handleSubmit` function:

```typescript
const { mutateAsync, isPending } = useMutation({
  mutationFn: registerUser,
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

We are using the `mutateAsync` function to call the `registerUser` function. If the registration is successful, we will set the access token in the context and navigate to the ideas page.

## Form Submission

Add the following to the submit handler:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await mutateAsync({ name, email, password });
  } catch (err: any) {
    console.log(err.message);
  }
};
```

We are preventing the default form submission and calling the `mutateAsync` function with the `name`, `email`, and `password`. If there is an error, we will alert the user with the error message.

Let's use the `isPending` value to disable the button while the registration is in progress:

```typescript
<button
  type='submit'
  className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded'
  disabled={isPending}
>
  {isPending ? 'Registering...' : 'Register'}
</button>
```

## Test It Out

Let's open up compass and delete any ideas from the user we created and also the user itself.

Try submitting the form with no fields filled out. You should see an error message. Now fill out the form with a name, email, and password.

You should also see the access token and user in the React devtools extension if you click on the `AuthProvider`. You can also check the cookies in the application tab of the devtools to see the HttpOnly cookie for the refresh token.

Couple things to mention that are really important.

1. If you refresh the page, you will lose the access token and user in the context. This is because we are not persisting it anywhere or refreshing it. We will get to that later.
2. The access token is only good for 1 minute. So even if we do not refresh the page, it will not work after 1 minute.

Don't worry about this right now, we will get to that later. For now, let's just focus on the registration and login flow.

Let's essentially log the user out by deleting the refresh token cookie. You can do this by going to the application tab in the devtools and deleting the `refreshToken` cookie. This will log the user out and you will need to log in again.

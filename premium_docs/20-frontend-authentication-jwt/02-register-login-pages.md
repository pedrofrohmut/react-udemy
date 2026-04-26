# Register & Login Pages

The first thing we will do to add authentication to our application is to create a register and login page. I want to just get the pages up and running first, and then we will add the authentication logic later.

## Buttons

Let's add the login and register buttons/links in the header component. Open the `src/components/Header.tsx` file and add the following:

```tsx
import { Link } from '@tanstack/react-router';
import { Lightbulb } from 'lucide-react';

const Header = () => {
  return (
    <header className='bg-white shadow'>
      <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
        {/* Logo with home link */}
        <Link to='/' className='flex items-center space-x-2 text-gray-800'>
          <Lightbulb className='w-6 h-6 text-yellow-500' />
          <h1 className='text-2xl font-bold'>IdeaDrop</h1>
        </Link>

        {/* Navigation */}
        <nav className='flex items-center space-x-4'>
          <Link
            to='/ideas'
            className='text-gray-600 hover:text-gray-900 font-medium transition px-3 py-2 leading-none'
          >
            Ideas
          </Link>
          <Link
            to='/ideas/new'
            className='bg-blue-600 hover:bg-blue-700 text-white font-medium transition px-4 py-2 rounded-md leading-none'
          >
            + New Idea
          </Link>
        </nav>

        {/* Auth buttons */}
        <div className='flex items-center space-x-2'>
          <Link
            to='/login'
            className='text-gray-600 hover:text-gray-900 font-medium transition px-3 py-2 leading-none'
          >
            Login
          </Link>
          <Link
            to='/register'
            className='bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition px-4 py-2 rounded-md leading-none'
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
```

Let's create a new file at `src/routes/(auth)/register.tsx`. The reason that I used parentheses around the `auth` folder is to make it a group. This way, we can still have /login and /register routes but still have them in their own folder. This is a convention that I like to use to keep my routes organized.

Add the following code to the `src/routes/(auth)/register.tsx` file:

```tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/register')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/register"!</div>;
}
```

Now create a new file at `src/routes/(auth)/login.tsx` and add the following code:

```tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/login')({
  component: LoginPage,
});

function LoginPage() {
  return <div>Hello "/(auth)/login"!</div>;
}
```

Now your buttons in the header should link to the `/login` and `/register` pages. If you click on them, you should see the text.

## Register Form

Add the following code to the `src/routes/(auth)/register.tsx` file:

```tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/(auth)/register')({
  component: RegisterPage,
});

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registering user:', { name, email, password });
  };

  return (
    <div className='max-w-md mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Register</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-2'
          autoComplete='off'
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-2'
          autoComplete='off'
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-2'
          autoComplete='off'
        />
        <button
          type='submit'
          className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full disabled:opacity-50'
        >
          Register
        </button>
      </form>

      <p className='text-sm text-center mt-4'>
        Already have an account?{' '}
        <Link to='/login' className='text-blue-600 hover:underline font-medium'>
          Login
        </Link>
      </p>
    </div>
  );
}
```

This is jsut the form. It does not do anything just yet. We will add the logic to register the user later. For now, let's just make sure that the form works and that we can see the values in the console.

The layout looks a little weird. We will add a custom layout soon. For now, let's do the login page.

## Login Form

Add the following code to the `src/routes/(auth)/login.tsx` file:

```tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/(auth)/login')({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in user:', { email, password });
  };

  return (
    <div className='max-w-md mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Login</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-2'
          autoComplete='off'
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full border border-gray-300 rounded-md p-2'
          autoComplete='off'
        />
        <button
          type='submit'
          className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md w-full disabled:opacity-50'
        >
          Login
        </button>
      </form>

      <p className='text-sm text-center mt-4'>
        Don't have an account?{' '}
        <Link
          to='/register'
          className='text-blue-600 hover:underline font-medium'
        >
          Register
        </Link>
      </p>
    </div>
  );
}
```

## Auth Layout

Let's create a layout for the auth pages. I want it to have the same type of look as the homepage with the welcome on the left and the form on the right.

Create a new file at `src/routes/(auth)/route.tsx` and add the following code:

```tsx
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Lightbulb } from 'lucide-react';

export const Route = createFileRoute('/(auth)')({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className='flex flex-col md:flex-row items-start justify-between gap-10 p-6'>
      <div className='flex flex-col items-start gap-4'>
        <Lightbulb className='w-16 h-16 text-yellow-400' />
        <h1 className='text-4xl font-bold text-gray-800'>
          Welcome to IdeaDrop
        </h1>
        <p className='text-gray-600 max-w-xs'>
          Share, explore, and build on the best startup ideas and side hustles.
        </p>
      </div>

      <section className='flex-1'>
        <Outlet />
      </section>
    </div>
  );
}
```

You should see the welcome text on the left and the form on the right.

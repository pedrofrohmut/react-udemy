# Conditional Navigation

We only want to show certain links if we are logged in or not. For example, we want to show the "Login" and "Register" links if the user is not logged in and the "Logout" and "Create Idea" links if the user is logged in. We can do this by checking the auth in context. I also want to show a welcome message with the user's name if they are logged in.

Open the `src/components/Header.tsx` file and add the following imports:

```typescript
import { Link } from '@tanstack/react-router';
import { Lightbulb } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
```

Add the following above the `return` statement:

```typescript
const { user } = useAuth();
```

We are getting the `user` from the context. We will use the `user` to check if the user is logged in or not and render the appropriate links.

Add the following to the return:

```typescript
<header className='bg-white shadow'>
  <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
    {/* Logo */}
    <Link to='/' className='flex items-center space-x-2 text-gray-800'>
      <Lightbulb className='w-6 h-6 text-yellow-500' />
      <h1 className='text-2xl font-bold'>IdeaDrop</h1>
    </Link>

    {/* Nav */}
    <nav className='flex items-center space-x-4'>
      <Link
        to='/ideas'
        className='text-gray-600 hover:text-gray-900 font-medium transition px-3 py-2 leading-none'
      >
        Ideas
      </Link>
      {user && (
        <Link
          to='/ideas/new'
          className='bg-blue-600 hover:bg-blue-700 text-white font-medium transition px-4 py-2 rounded-md leading-none'
        >
          + New Idea
        </Link>
      )}
    </nav>

    {/* Auth controls */}
    <div className='flex items-center space-x-2'>
      {!user ? (
        <>
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
        </>
      ) : (
        <>
          <span className='text-gray-700 font-medium px-2'>
            Welcome, {user.name}
          </span>
          <button
            onClick={handleLogout}
            className='text-red-600 hover:text-red-800 font-medium transition px-3 py-2 leading-none'
          >
            Logout
          </button>
        </>
      )}
    </div>
  </div>
</header>
```

Now you should see the logout button and a welcome. However, the user and acccess token will be removed if you refresh the page. So the logout button will not be visible. Before we fix that, let's add the logout functionality.

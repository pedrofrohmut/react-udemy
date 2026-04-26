# Links & Navigation

In this lesson, I want to create a navigation bar and add links to the different routes we have created. I will also show you how to use the `NavLink` and `Link` component from React Router.

Let's create a new folder called `components` in the `app` directory. Inside the `components` directory, create a new file called `Navbar.tsx` and add the following code:

```tsx
import { NavLink } from 'react-router';
import { FaLaptopCode } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className='bg-gray-800 border-b border-gray-700 shadow-sm sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto px-6 py-4 flex justify-between items-center'>
        {/* Logo */}
        <NavLink
          to='/'
          className='flex items-center gap-2 text-lg font-bold text-blue-300'
        >
          <FaLaptopCode className='text-blue-400 text-xl' />
          <span>The Friendly Developer</span>
        </NavLink>

        {/* Desktop Nav */}
        <div className='hidden md:flex items-center gap-6'>
          <div className='space-x-4 text-sm text-gray-300'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/projects'>Projects</NavLink>
            <NavLink to='/blog'>Blog</NavLink>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/contact'>Contact</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```

We are using the `NavLink` component from React Router to create links. The `NavLink` component is similar to the `Link` component, but it adds styling to the active link, which we will do in the next lesson. We are also using the `react-icons` library to add icons to the navigation bar.

Notice we used the hidden class to hide the navigation bar on mobile devices. We will create a mobile navigation bar soon.

## Adding The Navbar

I want the `Navbar` component to be displayed on every page. To do this, we will add the `Navbar` component to the `Layout` component. Open the `app/root.tsx` file and import the `Navbar` component:

```tsx
import Navbar from './components/navbar';
```

We will embed the `Navbar` component inside the `Layout` component right above the `children` prop:

```tsx
<body>
  <Navbar /> {/* Add this line */}
  <main className='max-w-6xl mx-auto px-6 bg-gray-900'>{children}</main>
  <ScrollRestoration />
  <Scripts />
</body>
```

Now you should see the navigation bar at the top of the page. If you click on any of the links, you should see that page.

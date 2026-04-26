# Responsive Navigation & Hamburger Menu

We need to create a responsive navigation menu that will be hidden on smaller screens and shown when the hamburger menu is clicked. We will use the `useState` hook to keep track of the menu state and the `useEffect` hook to add and remove the `hidden` from the navigation menu.

Let's start by bringing in `useState` and the "times" and "bars" icons from `react-icons/fa`:

```jsx
import { useState } from 'react';
import { NavLink } from 'react-router';
import { FaLaptopCode, FaTimes, FaBars } from 'react-icons/fa';
```

We will add a piece of state to keep track of the menu state:

```jsx
const [menuOpen, setMenuOpen] = useState(false);
```

## Hide Desktop Nav On Mobile

Make sure the `hidden` class is added to the navigation menu:

```jsx
 <div className='hidden md:flex items-center gap-6'>
    <div className='space-x-4 text-sm text-gray-300'>
      <NavLink>...
```

## Mobile Icons/Buttons

Under the desktop div, add the hamburger menu button:

```jsx
<div className='md:hidden flex items-center gap-4'>
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className='text-blue-400 text-xl'
    title='Menu'
  >
    {menuOpen ? <FaTimes /> : <FaBars />}
  </button>
</div>
```

When we click the menu button, the `menuOpen` state will be toggled.

Now, under the closing final div, add the mobile navigation menu to show if `menuOpen` is true:

```jsx
{
  /* Mobile Menu Dropdown */
}
{
  menuOpen && (
    <div className='md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-2 space-x-4 text-center'>
      <NavLink
        to='/'
        className={({ isActive }) => (isActive ? active : base)}
        onClick={() => setMenuOpen(false)}
      >
        Home
      </NavLink>
      <NavLink
        to='/projects'
        className={({ isActive }) => (isActive ? active : base)}
        onClick={() => setMenuOpen(false)}
      >
        Projects
      </NavLink>
      <NavLink
        to='/blog'
        className={({ isActive }) => (isActive ? active : base)}
        onClick={() => setMenuOpen(false)}
      >
        Blog
      </NavLink>
      <NavLink
        to='/about'
        className={({ isActive }) => (isActive ? active : base)}
        onClick={() => setMenuOpen(false)}
      >
        About
      </NavLink>
      <NavLink
        to='/contact'
        className={({ isActive }) => (isActive ? active : base)}
        onClick={() => setMenuOpen(false)}
      >
        Contact
      </NavLink>
    </div>
  );
}
```

We also added an `onClick` event to each `NavLink` to close the menu when a link is clicked.

Now you should see the mobile navigation menu when you click the hamburger menu button. The menu will close when you click a link.

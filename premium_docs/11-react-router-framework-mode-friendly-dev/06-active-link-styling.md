# Active Links

When we are on a specific page, we want the link to that page to be highlighted. This is a common feature in most websites. In this lesson, we will learn how to highlight the active link in our portfolio app.

I am going to create a set of base classes and active classes and put them into a variable. This way, we can easily apply them to our links.

Add this right above the return:

```jsx
const base = 'transition hover:text-blue-400';
const active = 'text-blue-400 font-semibold';
```

Now add the following to the `NavLink` components in the output:

```jsx
<div className='space-x-4 text-sm text-gray-300'>
  <NavLink to='/' className={({ isActive }) => (isActive ? active : base)}>
    Home
  </NavLink>
  <NavLink
    to='/projects'
    className={({ isActive }) => (isActive ? active : base)}
  >
    Projects
  </NavLink>
  <NavLink to='/blog' className={({ isActive }) => (isActive ? active : base)}>
    Blog
  </NavLink>
  <NavLink to='/about' className={({ isActive }) => (isActive ? active : base)}>
    About
  </NavLink>
  <NavLink
    to='/contact'
    className={({ isActive }) => (isActive ? active : base)}
  >
    Contact
  </NavLink>
</div>
```

With `NavLink`, we can pass a function to the `className` prop. This function receives an object with a property called `isActive`. If the link is active, `isActive` will be `true`, and we can apply the `active` class. Otherwise, we apply the `base` class.

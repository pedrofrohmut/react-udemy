# App & Tailwind Setup

In this section, I want to work more with the React fundamentals that we looked at in the last section. I also want to look at forms and input. We're going to do this by building a notes app. We'll also be using Tailwind CSS to style our app. In this lesson, we will get setup with Tailwind CSS and create our app.

## Create React App

Let's start by creating a new React app. We can do this by running the following command:

```bash
npx create-vite@latest notes-app
```

Open your project in your code editor.

## Tailwind CSS v4

Version 4 of Tailwind CSS was released, so to get up and running is a bit different than we used to do but it is really simple.

We need to install Tailwind and the Tailwind Vite plugin. We can do this by running the following command:

```bash
npm install tailwindcss @tailwindcss/vite
```

Now open the `vite.config.js` file and add the following code:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Now we need to import Tailwind into one of our CSS files. Let's delete the `App.css` and add the import into the `index.css` file replacing the content with the following:

```css
@import 'tailwindcss';
```

I also want to make the body a dark purple. We can do this by adding the following to the `index.css` file:

```css
body {
  @apply bg-purple-900;
}
```

Now enter the following into the `App.jsx` file:

```jsx
const App = () => {
  return (
    <div className='max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4 text-center'>📝 Notes App</h2>
    </div>
  );
};

export default App;
```

You should see a container with a title in the middle of the page. This means that Tailwind is working correctly.

You can change the page title in the `index.html` file to "Notes App".

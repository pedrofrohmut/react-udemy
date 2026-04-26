# Vite Build Tool Setup

In the last couple lessons, we used React in a single file using the script links. That's fine for learning purposes, but it's not a scalable way to build a React app. In this lesson, we'll learn how to create a React app using Vite.

## What is Vite?

Vite is a build tool that aims to provide a faster and more efficient development experience for modern web projects. It is a build tool that focuses on speed and simplicity. Vite is a French word that means "fast" or "quick". You don't need to use React with Vite. You can also use vanilla JavaScript, Vue, or another front-end framework.

## How Vite Works

When you're building a React app, you're writing a bunch of code that the browser doesn't fully understand yet — like JSX, modern JavaScript features, and modules split across files.

That code needs to be processed and bundled into a format the browser can actually run. This is where a build tool comes in.

Vite is a tool that helps with this. But unlike older tools that bundle everything upfront — which can be slow — Vite takes a smarter approach.

During development, it only loads what you’re currently working on, so your app starts fast and updates instantly when you make changes. So it has a dev server that you run and your code updates instantly.

Then, when you're ready to go live, Vite uses a tool called Rollup under the hood and builds the entire app into a few optimized files that load quickly in the browser.

In short: Vite makes development fast and easy, and builds your app efficiently when it's time to launch.


## Create a React App with Vite

To create a React app with Vite, you need to have Node.js installed on your machine. If you don't have Node.js installed, you can download it from the official website: [https://nodejs.org/](https://nodejs.org/).


To create a new React app with Vite, you can use the following command:

```bash
npx create-vite@latest rating-ui
```

This command will create a new directory called `rating-ui` with a new React app inside it.

You will be prompted for a few questions. Here is how I answered them:

- Choose a framework: `react`
- Choose a variant: You can use TypeScript if you want. We will explore TypeScript later in the course. For now, I am going to choose `JavaScript`.

Now run the following command to install the dependencies:

```bash
cd rating-ui
npm install
```

Now I'm going to open the project in Visual Studio Code:

```bash
code .
```

Now you can start the development server by running the following command:

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`. You can open this URL in your browser to see the React app.

## Dependencies

Let's open the `package.json` file to see the dependencies that were installed:

```json
{
  "name": "rating-ui",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "devDependencies": {
    "vite": "^2.6.0"
  }
}
```

We have React and React DOM as the only regular dependencies. Everything else is a dev dependency. Vite is the build tool that we are using to build and run the React app. It is not something that we use in production. It is only used during development.

So we have Vite, ES Lint for linting and the React plugin for dev dependencies.

For scripts, we have the "dev" script which runs the Vite development server, the "build" script which builds the app for production, a "lint" script which runs the linter, and a "preview" script which serves the production build.

## How Vite Works

When we create a React app with Vite, it uses a modern build process. Before Vite, we used tools like Webpack and Parcel to build our React apps. Vite is a new build tool that uses modern web standards like ES modules to build our apps. This makes the build process faster and more efficient.

### What Happens When You Run `npm run dev`

1. Vite starts a local development server on http://localhost:5173.
2. Instead of bundling everything, it serves JavaScript files on demand as the browser requests them.
3. Fast hot module replacement (HMR) allows updates to instantly appear in the browser without a full reload.

### What Happens When You Run `npm run build`

1. Vite bundles all your React components into optimized JavaScript and CSS files.
2. It minifies JavaScript and removes unused code (tree shaking).
3. Generates a dist/ folder containing all the necessary static files for deployment. These are the files that you would upload to a web server to deploy your app. You do not upload the source code to the server.

You can run the `npm run preview` command to preview the production build locally.

## File Structure

Here is the file structure of the React app that we created with Vite:

```
rating-ui
├── node_modules           # dependencies
├── public                 # static files like images/icons
│   ├── vite.svg
├── src                    # source code - The code we write
│   ├── App.css
│   ├── App.jsx            # main component
│   ├── index.css
│   ├── index.jsx          # entry point
├── .gitignore
├── index.html             # main HTML file (Single page in SPA)
├── package.json
├── README.md
├── eslint.config.js       # ESLint configuration
├── vite.config.js         # Vite configuration
```

You will see in the `src/main.jsx` file that we are importing the `App` component from `App.jsx` and rendering it to the root element in the `index.html` file just like I showed you in the previous lessons. It's just now everything is organized in a more scalable way.

It also uses the `<StrictMode>` component from React. This is a development feature that helps you find common problems in your React app. It will only show warnings in the console, so it's safe to use in production.

## Clean Up

We don't need any of the dummy content that was created, so I usually do a quick clean up.

1. Delete the `App.css` file. We don't need it.
2. Delete the CSS ins the `index.css` file.
3. Delete the `vite.svg` file in the `Assets` folder.
4. Delete the code in the `App.jsx` file and replace it with the following:

```jsx
const App = () => {
  return <>My App</>;
};

export default App;
```


## Change The Title

The last thing I want to do here is change the page title. If you open the `index.html` file, you will see the title tag. You can change the title to whatever you want.

I will change it to:

```html
<title>Rate Your Experience</title>
```

Now we're ready to start building our rating UI.

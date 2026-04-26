# Understanding the Build Process

Many people run a React dev server with Vite or another tool and start learning about components, hooks, state and all that good stuff. But what happens when you want to deploy your app? How do you build it? What does that even mean?

## Building a React App

“Building” your app refers to creating a production-ready version of your app that the browser can run efficiently. This process involves transforming your development code (which may include JSX, modern JavaScript, TypeScript, SCSS, etc.) into optimized files.

The result is a set of static files—HTML, CSS, JS, and assets—that can be served quickly and reliably to users.

To build a React app, you typically run a command like `npm run build` or `yarn build` in your terminal. This command will trigger the build process and generate a folder, typically called `dist` or `build` in your project directory. This is your production build, which you can then deploy to a web server or hosting service. However, with many platforms such as Vercel and Netlify, you don't have to do this step locally. All you need to do is point your hosting to the Github repo and it will run the build script on the server. If you were to use something like old school shared hosting, then you would first run `npm run build` locally and then upload the static assets to your hosting folder.

## What is a Build Process?

When you build a React app, you're essentially taking all of your source code and assets and transforming them into a format that can be run in a web browser. The browser can't run JSX, ES6, or TypeScript, so you need to convert your code into plain old JavaScript, HTML, and CSS.

This process involves a number of steps, including:

- Transpiling
Converts JSX, ES6+, or TypeScript into browser-compatible JavaScript (usually using Babel or SWC).

- Bundling
Combines all your modules and dependencies into one or more optimized output files (via Webpack, Vite, etc.).

- Minifying
Removes whitespace, comments, and shortens variable names to reduce file size for faster loading.

- Asset Optimization
Optimizes images, fonts, and other static assets for performance (e.g., compressing images, inlining SVGs).

- Autoprefixing CSS
Automatically adds vendor prefixes (-webkit-, -moz-, etc.) to ensure cross-browser support.

- Injecting Runtime Code
Adds features like Hot Module Replacement (HMR) during development, or code splitting logic for production.

The build process is typically handled by a build tool like Webpack although more recently Vite is the go to for single page apps, which uses a tool called Rollup under the hood. These tools take care of all the heavy lifting for you, so you don't have to worry about the details.



In the next lesson, we will look at the build process in more detail.

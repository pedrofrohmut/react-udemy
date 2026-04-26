# The Build Command

We've been working on our React app by using the Vite dev server, but that is not the code that we want to deploy to production. We need to build our app so that it is optimized for performance and file size. Also, if you're using TypeScript, you need to transpile your code to plain JavaScript.

If you look in the `package.json` file, you'll see that there is a `build` script that runs the `vite build` command. This command will trigger the build process and generate a production-ready version of your app.

Let's go ahead and run the build command:

```bash
npm run build
```

It will go through a process and generate a `dist` folder in your project directory. This folder contains the production build of your app, which you can then deploy to a web server or hosting service. The name may be different depending on what you used to build your app. For instance, if you used React Router framwork mode, the folder is called `build`. You can also change the name of the foler in the `vite.config.js` file.

Let's look at exactly what happened:

- All JSX, TypeScript and modern JavaScript code was compiled to plain JavaScript
- CSS is bundled and minified
- Unused code is tree-shaken. Tree shaking is a process where the build tool removes any code that is not being used in your app. This helps reduce the file size of your app.
- Files are hashed for browser caching
- Assets like images and fonts are optimized and copied over

The result is a super-fast production build of your app that is ready to be deployed to the web.

If we take a look at our `dist` folder, we can see that it contains an `index.html` file and a `assets` folder. The `index.html` file is the entry point for your app, and the `assets` folder contains all of the optimized assets for your app.

Let's look in the `index.html` file, particularly at the `script` tag. You'll see that it is pointing to a JavaScript file that has a hash in the name. It will be something like this:

```html
<script type="module" crossorigin src="/assets/index-CaoliyJk.js"></script>
```

`index` is the base name and in this case, `CaoliyJk` is the hash.

### Benefits of this:

- Cache busting – If your code changes, the hash changes, and browsers will download the new version instead of using an outdated cached file.
- Content integrity – Helps ensure the correct file is loaded.
- Efficient caching – Static files are cached forever unless their content changes.

Notice that it is also being loaded as a module. This is because Vite uses ES modules by default. This is a modern way of loading JavaScript that is more efficient and faster than the old way of loading scripts with something like Webpack.

The build output (index-xxxxx.js) is a module because your app uses modules internally (components, routes, etc). Vite compiles everything into one or more ES modules, and the browser loads it using this tag with the `type="module"` attribute.

If you look at the `assets/index-xxxxxx.js` file, you'll see that it is minified and optimized for performance. This is the file that contains all of your app's JavaScript code. Good luck reading it! It is not meant to be human-readable. It's meant to be fast and efficient.

Everything else we see are assets like images, fonts, and CSS files and in our case,the compiled Markdown files into JavaScript.

## Preview The Build

To preview the build, you can run a local server that serves the `dist` folder. However, Vite gives you a command to do this:

```bash
npm run preview
```

This will run on `http://localhost:4173` and you can see your production build in action.

If you have the React Devtools installed, you will notice that when you run the dev server, the icon is orange and when you run the preview server, the icon is blue. That’s how you know you're previewing your real, production-optimized site — just like it will run when deployed.

## Config Options

You have some config options when it comes to building your app. You can specify the output directory, the base URL, and other options in the `vite.config.js` file.

Here are some options you can set:

- `base` – The base URL for your app. This is useful if your app is not hosted at the root of your domain.
- `outDir` – The directory where the build output will be placed. By default, this is `dist`.
- `assetsDir` – The directory where your assets will be placed. By default, this is `assets`.
- `assetsInlineLimit` – The maximum size of assets that will be inlined as base64 data URLs. By default, this is 4096 bytes.
- `cssCodeSplit` – Whether to split CSS into separate files. By default, this is `true`.
- `minify` – Whether to minify the build output. By default, this is `true`.
- `sourcemap` – Whether to generate source maps for the build output. By default, this is `false`. Sourcemaps are useful for debugging your app in production. They allow you to see the original source code in your browser's developer tools, even though the code is minified and optimized.

In the next lesson, we will be deploying our project to Vercel.

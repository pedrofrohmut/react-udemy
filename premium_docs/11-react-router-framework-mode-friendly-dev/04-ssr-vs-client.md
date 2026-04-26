## SSR vs Client Rendering

With React Router v7, you can choose between server-side rendering (SSR) and client-side rendering (CSR) for your application. This choice can significantly impact the performance and user experience of your app.

If you open the react-router.config.ts file, you will see the following code:

```tsx
import type { Config } from '@react-router/dev/config';

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
} satisfies Config;
```

As you can see, the `ssr` option is set to `true` by default. This means that the app will be server-side rendered by default. If you want to enable client-side rendering, you can set this option to `false`.

## Server-Side Rendering (SSR)

When you use SSR, the server generates the HTML for the page and sends it to the client. This means that the page will load faster because the browser doesn't have to wait for JavaScript to load before rendering the page. This is especially useful for SEO because search engines can crawl the HTML content of the page.

## Client-Side Rendering (CSR)

When you use CSR, the server sends a blank HTML page to the client and the JavaScript code is responsible for rendering the page. This means that the page will take longer to load because the browser has to wait for JavaScript to load before rendering the page. This is not ideal for SEO because search engines may not be able to crawl the JavaScript content of the page.

#### Logging To The Console

To learn more about the process of SSR and CSR, you can log to the console when the app is rendered on the server and when it is rendered on the client.

Open the `app/routes/home/index.tsx` file and add the following code to the top of the `HomePage` function:

```js
console.log('Hello From Home...');
```

## Devtools Error

You may get something like this:

```
Error: No route matches URL "/.well-known/appspecific/com.chrome.devtools.json"
```

If you don't, great but if you do, not to worry. Chrome is checking if your app has special debugging support, typically for custom DevTools integrations or web app manifests. Since your app doesn't define a route for that path, and it causes this log. We didn't do anything wrong and you could just ignire this. However, I don't like having logs like this. There is a package we can install to stop this from happening. Run the following in the terminal:

```bash
npm install -D vite-plugin-devtools-json
```

Then just add it to your `vite.config.ts` file:

```js
import {defineConfig} from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
  plugins: [
    devtoolsJson(),
    // ...
  ]
});
```

Now it should be gone.

Back to how SSR works and why this displays in the client. When your app runs on the server, it sends down plain HTML so the page shows up quickly. But that HTML can’t do anything interactive yet (like handle clicks or update state). Once the page loads in the browser, React runs the JavaScript and hydrates the HTML — basically attaching event listeners and making the page interactive.  Hydration is when the browser takes over a page that was already rendered on the server and "activates" it by running the JavaScript.


To give you a better idea, add this to your home route component console.log:

```tsx
const now = new Date().toISOString();
if (typeof window === 'undefined') {
  console.log('🖥️ Server Render at:', now);
} else {
  console.log('🧠 Client Hydration at:', now);
}
```

We are getting the current date and time in ISO format and logging it to the console. We are also checking if the `window` object is defined. If it is not defined, it means that we are on the server because there is no `window` object on the server. If it is defined, it means that we are on the client.

Run the homepage and open the console. You will see that the logs are printed in the server console (terminal) and the client console (browser). The server log will show "Server Render" and the client log will show "Client Hydration". This means that the server rendered the page and then the client hydrated it with JavaScript. So even though the server rendered the page, the client still has to run the JavaScript code to make it interactive.

Now change the `ssr` option in the `react-router.config.ts` file to `false` and run the app again. You will see that the server log is gone and only the client log is printed. This means that the server is not rendering the page and the client is responsible for rendering it.

## Client Methods

So you can not use something like `window.localStorage` on the server because it does not exist. Even though it runs on the client after, it will fail first on the server and you will get an error.

Replace the console log stuff in the `HomePage` function with the following code:

```tsx
const HomePage = () => {
  console.log(window.scrollX);
  return (
    <section>
      <h1>Welcome</h1>
    </section>
  );
};
```

Now run with ssr set to `false` and you will see the console log in the client console. Now change it to `true` and you will see an error in the server console. This is because `window` does not exist on the server.

## `useEffect` Runs on the client

Even if you are using SSR, your `useEffect` hooks will only run on the client. This is because `useEffect` is a client-side hook and it does not run on the server. So if you want to use something like `window.localStorage`, you can do it inside a `useEffect` hook.

```tsx
const HomePage = () => {
  useEffect(() => {
    console.log(window.scrollX);
  }, []);

  return (
    <section>
      <h1>Welcome</h1>
    </section>
  );
};
```

This may be confusing if you are coming from Next.js because in Next, you can not use `useEffect` on the server. But in React Router v7, you can use `useEffect`, but it will not run until the client hydrates the page. So if you want to use something like `window.localStorage`, you can do it inside a `useEffect` hook and it will work on the client.

With the `useState` hook, you can use that in SSR as well but the server will only use the initial state. The client will then hydrate the state and use the updated state.

Delete the `useEffect` and any console logs.

Hopefully, this gives you a good idea of how SSR and CSR work in React Router v7. You can choose the one that fits your needs best. We can also prerender pages to generate static HTML files. We will look at this later.

# Environment Variables

Environment variables are special values stored outside your code that let you configure your app without hardcoding sensitive or environment-specific info. In a Vite + React project, using environment variables is straightforward and built into the tool.

## Defining Environment Variables with .env Files

Vite projects support dotenv files for defining environment variables. You typically place these files at the project root (where your vite.config.js or index.html lives). Vite will automatically load these files on startup without any extra packages​. The naming of the files can target all environments or specific modes (development, production, etc.). Common file names include:

- `.env` – Loaded in all cases (base default variables)​
- `.env.local` – Loaded in all cases, but intended to be local-only (not checked into git)​
- `.env.development`, `.env.production` (i.e. .env.[mode]) – Loaded only for that specific mode (when running in that mode)​
- `.env.development.local`, `.env.production.local` (i.e. .env.[mode].local) – Mode-specific and local-only (not in git)​

When you run the dev server or build, Vite determines the “mode” (development by default for vite dev, and production by default for vite build). It will load `.env` and `.env.local` first, then the mode-specific files. Mode-specific env files override the generic ones if they define the same variable​. For example, if both `.env` and `.env.production` define VITE_API_URL, the value from `.env.production` will be used in production builds​.

## The `VITE_` Prefix Requirement

One important rule in Vite is that only variables prefixed with `VITE_` are exposed to your client-side code​. This is a safety feature to prevent accidentally leaking sensitive keys. Vite will load all the variables from your `.env` files, but any variable that does not start with VITE\_ will be omitted from the app’s front-end code​

For example, suppose your .env contains:

```env
VITE_SOME_KEY=123
DB_PASSWORD=foobar
```

In this case, `VITE_SOME_KEY` will be available in your React app, but `DB_PASSWORD` will not be exposed. If you try to access it, it will be `undefined` in the browser​. This behavior is by design – you might keep truly sensitive secrets (like database passwords) in `.env` files for backend or build processes, but you wouldn’t want them accidentally shipped to the client.

Why the prefix? By enforcing a prefix, Vite makes you explicitly mark which env vars should be visible to front-end code​. This convention is similar to how Create React App uses the REACT*APP* prefix​. In Vite’s case, the prefix is VITE\_. (You can change this prefix via the envPrefix configuration, but in most cases the default is recommended​.

## Accessing Environment Variables in React Components

In a Vite + React app, you access env variables through the special `import.meta.env object`. This object includes all your `VITE_*` variables (as well as some built-in variables like mode flags). For example, using the variables from above:

```javascript
export default function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const featureFlag = import.meta.env.VITE_FEATURE_FLAG;

  console.log('API URL:', apiUrl);
  console.log('Feature enabled?', featureFlag);
}
```

If you have worked with environment variables in Node on the backend, you are probably used to using `process.env` to access them. Vite does not use `process.env` in the browser, as it is not available there. Instead, you use `import.meta.env` to access your environment variables in the front-end code​.

## Security Considerations

As I mentioned, when using VITE* prefix, Vite will expose those variables to the client-side code. This means that anyone can see them in the browser’s developer tools. Therefore, you should never put sensitive information (like API keys or passwords) in your `.env` files if they are prefixed with `VITE*`. Always keep sensitive information on the server side and use environment variables only for non-sensitive configuration values​.

There are certain keys that you can make public. For example, Stripe has a public key and a secret key. The public key can be exposed to the client-side code, but the secret key should never be exposed. Google Maps and other Google APIs are safe as long as you implement the restrictions from the dashboard. The Firebase client SDK keys can be public as well.

Anything that says "secret" or "private" should never be exposed to the client-side code. For this, you have a few options:

- Create a backend server that acts as a proxy for your API requests. This way, you can keep your API keys secret on the server side and only expose the necessary endpoints to the client.
- Serverless functions are another option. You can create serverless functions that act as a proxy for your API requests. You make a request to the serverless function, and it makes the request to the API with the secret key. You could use something like AWS Lambda, Netlify Functions, or Vercel Functions to create these serverless functions.
- Cloudflare workers are another option. You can create a Cloudflare worker that acts as a proxy for your API requests. You make a request to the Cloudflare worker, and it makes the request to the API with the secret key.
- Secrets Managers are another option. You can use a secrets manager to store your API keys and other sensitive information.

## Move Our API URL to an Environment Variable

Let's move our Coingecko API URL to an environment variable.

We will create a new file called `.env` in the root of our project and add the following line:

```env
VITE_COINS_API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
```

I am not putting the query params except for the `vs_currency` because that one will not change and is required.

In the `App.jsx` file, we will import the environment variable using `import.meta.env`:

```javascript
const API_URL = import.meta.env.VITE_COINS_API_URL;
```

When we make the request is where we will add the rest of the params:

```javascript
const res = await fetch(
  `${API_URL}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
);
```

Now, we can use the environment variable in our code. This way, we can easily change the API URL without having to change the code. We can also use different API URLs for different environments (development, production, etc.) by creating different `.env` files.

## `.gitignore` File

In many cases you will have sensitive info in these files and you wouldn't commit them. In our case, we do not. It is just the URL. So we do not have to use `.env.local` or add the `.env` file to the `.gitignore` file. But you still can if you want.

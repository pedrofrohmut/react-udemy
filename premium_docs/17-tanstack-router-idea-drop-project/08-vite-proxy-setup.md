# Vite Proxy Setup

Right now, we are typing the full URL to the API, which includes the localhost and port. This will become an issue once we deploy the app. We will need to change the URL to the production URL. To avoid this, we can use a proxy.

## Config File Issues

Now at the moment, with a default TanStack Router app setup, there are some errors in the config file. I want to address these. Even though the project works now, they could cause issues in the future.

## Router Plugin Issue

The first error is:

```
'TanStackRouterVite' is deprecated.
```

This has been deprecated

You need to change this:

```ts
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
```

to this:

```ts
import { tanstackRouter } from '@tanstack/router-plugin/vite';
```

and change this:

```ts
TanStackRouterVite({ autoCodeSplitting: true })
```

To this:

```ts
 tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
```

That will fix that issue.

## Node Types Issue

You may have an underline under `import { resolve } from 'node:path';`

You can fix this by installing the types for Node:

```bash
npm install -D @types/node

```

Then in your `tsconfig.json` add the following to the `types` array:

```ts
{
  "compilerOptions": {
    "types": ["node"]
  }
}
```

## Alias dirname Issue

Since we are using ESM, the `__dirname` does not work by default.

Add the following:

```ts
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { resolve } from 'node:path';
```

Now the errors should go away.

## test Issue

For this, we aren't using any testing tools so just delete the `test` object:

```ts
# delete
  test: {
    globals: true,
    environment: 'jsdom',
  },
```


Now we can finally add our proxy. Add the following block:

```ts
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
```

Now in your API calls, you can use the `/api` prefix and it will be proxied to the API. For example, in the `fetchIdea` function, you can change the URL to `/api/ideas/${ideaId}`.

```ts
const fetchIdea = async (ideaId: string) => {
  const response = await fetch(`/api/ideas/${ideaId}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
```

Remember, this is all run on the client. If you log in the console, you will see it in the browser.

This is fine to do, but for this idea I want to use TanStack Query to fetch data. In the next lesson, we will set that up.

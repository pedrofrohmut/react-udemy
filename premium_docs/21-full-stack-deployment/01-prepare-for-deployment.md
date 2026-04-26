# Prepare For Deployment

There are a couple of things we need to change to make our app production-ready. Run both your frontend and backend locally for now.

A while ago we added a proxy in the `vite.config.ts` file. Since we set up our Axios instance, we haven't really needed that because we could just add our API URL to the `baseURL` in the Axios file.

Open the `vite.config.ts` file and either delete or comment out the following:

```ts
 server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
```

Now open the `lib/axios.ts` file and add the following to the `baseURL`:

```
baseURL: `${import.meta.env.VITE_API_URL}/api`,
```

Now try and go to your frontend. You will see a network error. This is because we are no longer using a proxy, so it is not being viewed as the same URL. 

## Enable The Domains In CORS

We are able to assign certain domains to make requests within CORS in our backend. 

Open your backend `server.js` file and change this:

```ts
app.use(cors());
```

To this:

```
// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  // Your frontend URL will go here as well
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
```

Save it and now try your frontend. It should now work. So this means, when we deploy, we need to add the new frontend domain to CORS.

## Push to GitHub

Push both the frontend and backend to GitHub. This is a requirement for both Vercel and Render. If you haven't done this yet, go to the root of your projects and run the following command:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## MongoDB Atlas Whitelist

If you are using MongoDB Atlas, you need to whitelist the IP address of your server. This is a security feature of MongoDB Atlas that prevents unauthorized access to your database.

In Render click on the "Connect" button in the top right and you will see your outbound IP addresses.

Now log into MongoDB Atlas and go to the "Network Access" tab. Click on the "Add IP Address" button and add the IP addresses of your server. You can also set it to "Allow Access from Anywhere" for testing purposes. This is not recommended for production, but it is fine for testing.
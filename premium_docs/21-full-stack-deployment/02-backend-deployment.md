# Backend Deployment

When it comes to deploying a full stack application, there are a few options available. You can deploy the frontend and backend separately or together. In this project, we will deploy seperately. The frontend will be deployed to Vercel and the backend will be deployed to Render. This is a common setup for full stack applications. Vercel is a great choice for deploying React applications, while Render is a great choice for deploying Node.js applications.

Let's start with the backend because the frontend needs the backend. The backend can run by itself.

## Frontend Changes

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
 baseURL: import.meta.env.VITE_API_URL + '/api', 
```

N

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

## Deploy to Render

Go to https://render.com and create an account. Once you have created an account, you will be taken to the dashboard. Click on the "New" button and select "Web Service". This will take you to the create web service page.

Select the "Free" option

Add the following environment variables:

- `MONGO_URI`: `<your-mongodb-uri>`
- `JWT_SECRET`: `<your-jwt-secret>`

Deploy your project. This will take a few minutes.

Your API should now be live. You can use the domain provided by Render to access your API. The domain will look something like this: `https://your-app-name.onrender.com`. You can test your API by going to `https://your-app-name.onrender.com/api/ideas` in your browser. You should see the JSON response with the hardcoded ideas.

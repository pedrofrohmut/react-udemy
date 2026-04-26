# Frontend Deployment

Now that we have our backend set up, let's deploy the frontend to Vercel.

## Build Locally

I would suggest building locally first to check for any issues. TypeScript issues will fail by default when you push to Vercel

Run the following:

```bash
npm run build
```

If you have any errors, address those first.


## Push Latest To GitHub

Make sure that you push your frontend code to GitHub. If you haven't done that yet, run the following commands in your terminal:

```bash
git add .
git commit -m "Deploy frontend to Vercel"
git push origin main
```

Then, go to [Vercel](https://vercel.com/) and create an account if you don't have one. Once you are logged in, click on the "New Project" button.

Select the GitHub repository that contains your frontend code.

Add the following environment variables in the Vercel dashboard:

```
VITE_API_URL=https://your-backend-url.com/api
```

Click on the "Deploy" button to deploy your frontend.

You are probably going to get an error because we need to add the frontend domain to the backend CORS whitelist. To do that, go to your backend code and open the `server.js` file. Find the following line:

```javascript
// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://YOUR_FRONTEND_URL.vercel.app',
];
```

BE SURE not to add a trailing slash to the URL or it will not work.

You will need to push your changes to GitHub so that Render can pick them up. Run the following commands in your terminal:

Once you do that, you should be able to access your frontend at the URL provided by Vercel.

That's It! You have successfully deployed your full stack application.

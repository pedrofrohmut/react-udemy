# Frontend Deployment

Now we want to deploy our frontend to Vercel. We did this with a previous project. Just make sure that you push your code to Github and then go to Vercel and create a new project. Select the repository you just pushed to Github.

Before you click "Deploy", add the following environment variables:

VITE_STRAPI_API_URL=https://friendly-dev-strapi.onrender.com/api
VITE_STRAPI_BASE_URL=https://friendly-dev-strapi.onrender.com

It is important to mention that the way the Render free tier works is if nobody has used the app for 15 minutes, it will go to sleep. So if you try to access the app and it is sleeping, it will take a few seconds to wake up. This is why if you have a real production app, you should use a paid plan. The free plan is best for testing purposes. So you may get a 504 error. Just wait a few seconds and try again.

You can use something like UptimeRobot to ping your app every 5 minutes to keep it awake. This is a good solution for testing purposes, but not for production.

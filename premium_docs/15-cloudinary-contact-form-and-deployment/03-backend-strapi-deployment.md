# Backend Strapi Deployment

Since we have a de-coupled frontend and backend, we will be deploying them both separately. For the frontend, we will use Vercel as we did for the previous project. For Strapi, it is a bit more complicated because Strapi is a Node.js application and requires a server to run on. We will be using Render for this purpose. Render is a cloud platform that allows you to deploy web applications, static sites, and databases with ease. It has a very generous free tier so you don't have to pay anything or give any credit card info. It's also very simple and the process is similar to Vercel. You push to Github and then simply select your repo from Strapi. There are a few other small steps, but overall it's a simple process.

Our database is already set up with Neon, so we don't need to worry about that. If you wanted to, you could use a different database in production. I would probably suggest this for a real project because you don't want to mess with real data in development. But for this project, we'll use the same one.

## Push To Github

Before you do anything with Render, you need to push your project to Github. I know you guys know how to do this but as a refresher, here are the steps:

1. Open your terminal and navigate to your Strapi project folder.
2. Run the command `git init` to initialize a new Git repository.
3. Run the command `git add .` to stage all your files for commit.
4. Run the command `git commit -m "Initial commit"` to commit your files.
5. Go to Github and create a new repository. Make sure to select "Public" and "Add a README file".
6. Copy the URL of your new repository.
7. Go back to your terminal and run the command `git remote add origin <your-repo-url>` to add your remote repository.
8. Run the command `git push -u origin master` to push your files to Github.

Now you should have a remote repository with your strapi project.

## Render Setup

Let's go to https://render.com and create an account. You can sign up with Github, Google, or email. I recommend using Github so you can easily connect your repo.

Click on the "New" button in the top right corner and select "Web Service". This will take you to a page where you can select your repo. Select your Strapi repo from the list.

Scroll down to the plans and select the free one.

#### Environment Variables

Scroll down to the Envoronment Variables section. We need to add the environment variables for our Strapi project. Open the .env file and copy the following variables and paste them in the inputs on Render

That's it. Now click the save button. It will take a couple of minutes to deploy your app. You can see the logs in the Render dashboard. Once it's done, you will see a green checkmark next to your service.

You will get a domain name assigned to you, which of course you can change later.

Click on the domain and you should be taken to your production dashboard. This of course can be accessed anywhere in the world.

Next we want to use the production api url in our frontend. We will do that next.

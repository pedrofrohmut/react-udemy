# Database & Strapi Admin Setup

We are going to use Neon Postgres, which is a serverless Postgres database that is free for small projects. It's an amazing platform and they make it super easy to create and manage Postgres databases. You can sign up for a free account at [Neon](https://neon.tech/) or log in with GitHub. Once you are logged in, you will be taken to the Neon dashboard.

Create a new project. Call it whatever you want. I will call mine `friendly-dev`. Give your database a name as well. I will call mine `friendly-dev-db`. Click the "Create" button.

Click on "Connect" and copy the database URL including the password and paste it in your `.env` file in the `friendly-dev-backend` folder. make sure it is your BACKEND .env file not your React app. You don't want this in your frontend public env variables.

It should look something like this:

```bash
DATABASE_URL="postgresql://friendly-db-dev_owner:npg_wNG4eeedl6d@ep-broad-shadow-a4n1rwlt-pooler.us-east-1.aws.neon.tech/friendly-dev-db?sslmode=require"
```

You need to install the postgres client in your backend. Again, be sure you are in the `friendly-dev-backend` folder. Run the following command:

```bash
npm install pg
```

## Start Strapi

To start Strapi, open the terminal in the `friendly-dev-backend` folder and run the following command:

```bash
npm run develop
```

This will start the Strapi server. Go to [http://localhost:1337/admin](http://localhost:1337/admin) in your browser. This will take you to the Strapi admin panel. When you run it for the first time, it will ask you to create an admin user. Fill out the form and submit.

You will now be directed to the dashboard. If you go to Neon and click on "Tables", you will see that there are a ton of tables that were created for you.

From here we need to build our content structure. We will do this in the next lesson.

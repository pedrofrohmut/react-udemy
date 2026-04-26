# Create Strapi Project

Let's create our Strapi project. avigate to the `friendly-dev` folder and run the following command to create a new Strapi project in the `friendly-dev-backend` folder:

```bash
npx create-strapi-app@latest friendly-dev-backend --no-run
```

The `--no-run` flag is used to prevent the Strapi server from starting automatically after the installation.

It will ask about your Strapi account. Select the "Skip" option. Strapi is free but you can sign up for different plans that offer support and other features. For now, we will skip this step.

Next, it will ask if you want to use the default database, which is SQLite. This is ok for development, but we will be using Neon Postgres for production. So I will select "No" and then select "Postgres" as the database. You can select the defaults for now because we will be setting up Neon Postgres in the next lesson.

Next, it will ask to start with example structure and data. I would suggest saying "No" to this so we can start with a clean slate.

Next, it will ask if you want to use TypeScript. This is up to you. I will say yes.

Select "Yes" to install the dependencies and init the Git repository.

It will now create your Strapi project in the `friendly-dev-backend` folder. This will take a few minutes.

We don't want to run Strapi yet because we need to create our database and hook it up.

## Peacock Extension

I want it to be very clear on when I am working in the frontend React app and when I am in the backend Strapi app. So I will be using the [Peacock](https://marketplace.visualstudio.com/items?itemName=JohnPapa.vscode-peacock) extension to change the color of my VSCode window. This is not required, but I find it very helpful.

I will open the `friendly-dev-frontend` folder in a new VSCode window and open the command pallete with `CTRL + SHIFT + P` and type "Peacock" and select "Peacock: Change color and enter `#61DAFB`, which is the React branding color.

Then I will open the `friendly-dev-backend` folder in a new VSCode window and do the same thing, but select a different color. I will use `#4945FF`, which is the Strapi branding color.

In the next lesson, we will setup our Postgres database with Neon and setup our admin user.

# Project Setup

Alright, so in the last section we created a simple frontend application for creating ideas. We used JSON Server as a mock API to simulate a backend. In this section, we will create a full stack application using the MERN stack. We will use MongoDB as our database, Express as our backend framework, React as our frontend framework, and Node.js as our runtime environment.

I want to stress that this is sort of a bonus lesson. You can skip this lesson if you want to focus on the frontend part of the project. But I highly recommend you to follow along and create your own backend API. This will help you understand how the frontend and backend communicate with each other and how to build a full stack application.

We technically already created a full stack app with the portfolio project but we used Strapi as our backend. In this lesson, we will be creating our own backend API from scratch using Node.js and Express.

## Folder Setup

If you followed along with the last section, you should have a folder called `idea-drop`. You could build this as a monorepo, which we talked about in the last section, but for now, we will keep it simple and create a new folder called `idea-drop-api` inside the `idea-drop` folder. This will be our backend API.

I am going to open VS Code with the `idea-drop-api` folder as the workspace. You can do this by running the following command in your terminal:

```bash
code idea-drop-api
```

Let's run the following command to initialize a new Node.js project in the `idea-drop-api` folder:

```bash
npm init
```

Answer the questions as follows:

- Package name: idea-drop-backend
- Version: 1.0.0
- Description: A full stack application for creating ideas
- Entry point: server.js
- Test command:
- Git repository:
- Keywords:
- Author: Your Name
- License: MIT
- Is this OK? (yes)

## Install Dependencies

Now that we have our Node.js project set up, let's install the dependencies we need for our backend API. We will be using the following dependencies for now:

- `express`: A web framework for Node.js
- `mongoose`: A MongoDB object modeling tool
- `cors`: A middleware for enabling CORS (Cross-Origin Resource Sharing)
- `dotenv`: A zero-dependency module that loads environment variables from a `.env` file into `process.env`

## More on cors

CORS stands for Cross-Origin Resource Sharing. It's a browser security feature that controls how resources (like APIs) can be requested from a different domain (or port) than the one the browser is currently on.

By default, browsers block cross-origin requests for security reasons. So if your frontend (e.g. http://localhost:5173) tries to make a request to a backend API running on http://localhost:8000, the browser will block it unless the server explicitly says, "Yes, I allow requests from that origin." So we can control who can access the api.

Run the following command to install these dependencies:

```bash
npm install express mongoose cors dotenv
```

We are not going to use TypeScript for the backend at this point. We will be using JavaScript for the backend. If you want to use TypeScript, you can follow the official documentation for setting up TypeScript with Node.js and Express.

I do however want to use ES Modules. By default, Node.js uses CommonJS modules. To use ES Modules, we need to add the following line to our `package.json` file:

```json
"type": "module"
```

## Basic Server Setup

Now that we have our dependencies installed, let's create a basic server setup. Create a new file called `server.js` in the `idea-drop-api` folder. This will be our main entry point for the backend API.

Add the following code to the `server.js` file:

```javascript
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

This code sets up a basic Express server that listens on port 5000. We also added CORS middleware to enable CORS for our API. This is important because our frontend application will be running on a different port (3000) and we need to allow cross-origin requests.

## NPM Scripts

Can run this server using the following command:

```bash
node server.js
```

But I want to create a few scripts to make it easier to run the server. Let's add the following scripts to our `package.json` file:

```json
"scripts": {
  "start": "node server.js",
  "dev": "node --watch server.js",
}
```

This will allow us to run the server using the following commands:

```bash
npm start
```

or

```bash
npm run dev
```

The dev script will watch for changes in the `server.js` file and automatically restart the server. This is useful for development purposes. This is a fairly new feature in Node.js and is not available in all versions. If you are using an older version of Node.js, you can use a package called `nodemon` to achieve the same effect.

## Environment Variables

Just like in the frontend React website, we can have environment variables in our backend Node.js application. This is useful for storing sensitive information like API keys, database connection strings, and other configuration settings that should not be hardcoded in your codebase. Unlike the frontend, we do not need to prefix our environment variables with `VITE_` in the backend. Also, you can put anything here including sensitive information because it will not be exposed to the client.

## `dotenv` Package

In order to use environment variables in our Node.js application, we need to user the `dotenv` package that we installed. This package allows us to load environment variables from a `.env` file into `process.env`. This is a common practice in Node.js applications. If you did not install it, you can do so by running the following command:

```bash
npm install dotenv
```

Open your `server.js` file and add the following line at the top:

```javascript
import dotenv from 'dotenv';
dotenv.config();
```

We have to call the `config` method to load the environment variables from the `.env` file into `process.env`. This should be done before you use any environment variables in your code.

Let's add the port number to our `.env` file. Open your `.env` file and add the following line:

```bash
PORT=8000
```

Now in the `server.js` file, it will first check if the `PORT` environment variable is set. If it is not set, it will default to `5000`. This way, you can easily change the port number without modifying your code.

```javascript
const PORT = process.env.PORT || 8000;
```

## Git

I would suggest initializing a git repository in the `idea-drop-api` folder. You can do this by running the following command:

```bash
git init
```

Create a new file called `.gitignore` in the `idea-drop-api` folder and add the following lines to it:

```
node_modules
.env
```

This will ignore the `node_modules` folder and the `.env` file from being tracked by git. The `.env` file will be used to store environment variables such as the MongoDB connection string.

Now add all the files to the git repository and commit the changes:

```bash
git add .
git commit -m "Initial commit"
```

We have a basic server running, but it doesn't do anything. There are no routes or endpoints. Let's add a simple endpoint to test our server in the next lesson.

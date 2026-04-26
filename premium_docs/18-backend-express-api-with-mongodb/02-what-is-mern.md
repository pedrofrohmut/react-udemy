# What Is The MERN Stack

I just want to take a minute to talk about what the MERN stack is. I know a lot of you probably know this, but this is more for the beginners.

MERN stands for the following:

- MongoDB – A NoSQL database that stores data in flexible, JSON-like documents. Unlike relational databases, MongoDB doesn’t use tables or schemas in the traditional sense, making it great for handling unstructured or rapidly changing data. It's commonly used for storing application data like users, products, posts, etc. We'll be using a cloud version of Mongo called MongoDB Atlas. This is actually the preffered way of using MongoDB.

- Express.js – A lightweight and flexible Node.js web application framework that simplifies building server-side logic. It handles routing, middleware, and backend API endpoints. Express allows you to easily build RESTful APIs to communicate with the frontend.

- React – A JavaScript library for building user interfaces, developed by Facebook. React lets you build complex UIs using reusable components and manage dynamic data with state. In the MERN stack, React is used on the frontend to create the client-side application.

- Node.js – A JavaScript runtime built on Chrome’s V8 engine that lets you run JavaScript on the server. It’s used as the base for Express.js and allows you to write full-stack applications using JavaScript both on the frontend and backend.

## Why Use The MERN Stack?

The main appeal of the MERN stack is that it allows you to use JavaScript across the entire stack—from the database layer all the way to the UI. This makes it easier for developers to work across different parts of the application without needing to context switch between languages.

It’s also highly flexible, open-source, and supported by a huge community. If you're building modern full-stack applications and want full control over both frontend and backend, the MERN stack is a solid choice.

What we are going to do now is create an API from scratch that does the same thing that our JSON Server fake REST API does. It will have the same routes. We'll also add authentication. We aren't done with our frontend UI yet. We still have to add the authentication and handle that on the client. So we have quite a ways to go.
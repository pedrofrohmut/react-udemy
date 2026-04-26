# Post Content Type

Now we are going to add a new data type to Strapi for blog posts. Log into your admin panel and goto the "Content Types Builder" and create a new type called `Post`. This type will have the following fields:

- title: Text (required)
- slug: UID (required)
- excerpt: Text (long text) (required)
- body: Rich Text - This will be a WYSIWYG editor for the body of the post. You can add images, links, and other formatting options. (required)
- date: Date (required)
- image: Media (single media)

The slug will be of type UID. This means it will be a unique identifier for the post. We want to select the title field as the "attached field". When you add a post, click the little reload icon in the slug field and it will update with the slug from the title.

We did not initially have an image, but I figured since it's so easy with Strapi, we should add one. I have attached a zip file to the lesson with the images. You can also use your own if you want.

Add all of the fields and save it.

## Add Content

Now we need to add some content.

Here is the data to add:

- title: React Hooks Overview
- slug: react-hooks-overview
- excerpt: Understand useState, useEffect, and custom hooks with real-world examples
  date: 2025-01-15
- body: React Hooks are functions that let you use state and other React features without writing a class. They are a way to use state and lifecycle methods in functional components. In this article, we will explore the most commonly used hooks: useState, useEffect, and custom hooks.
  image: blog-1.png

- title: Utility-First vs Component-Based CSS
- slug: css-utility-vs-component
- excerpt: Explore the pros and cons of Tailwind CSS vs traditional component styling
- date: 2025-02-25
- body: Utility-first CSS, popularized by frameworks like Tailwind CSS, allows developers to apply styling directly in the HTML using predefined utility classes. This approach promotes rapid development, reduces the need to write custom CSS, and encourages design consistency by reusing the same utility classes across components.
- image: blog-2.png

- title: Writing Clean Code
- slug: writing-clean-code
- excerpt: Best practices for writing clean, maintainable code
- date: 2025-03-10
- body: Clean code is code that’s easy to read, easy to understand, and easy to change. It avoids unnecessary complexity and follows consistent conventions, making it easier for others (and your future self) to work with. Clean code favors meaningful variable names, modular functions, and clear separation of concerns. Rather than writing clever one-liners, clean code prioritizes readability and simplicity.
- image: blog-3.png

- title: API Authentication Strategies Explained
- slug: api-authentication-strategies
- excerpt: A breakdown of API auth methods like JWT, OAuth2, API keys, and more
- date: 2025-04-05
- body: API authentication ensures that only authorized users or systems can access your endpoints. One of the most common methods is using **API keys**, which are simple tokens passed in headers or query parameters. While easy to implement, API keys lack fine-grained access control and are best suited for internal or low-security use cases.
- image: blog-4.png

- title: Deploying Full Stack Apps
- slug: deploying-full-stack-apps
- excerpt: A guide to deploying your full-stack applications with ease
- date: 2025-05-20
- body: Deploying a full-stack application means taking both your frontend and backend and making them accessible to users over the internet. This typically involves bundling your frontend (React, Vue, etc.), setting up a backend server (Node.js, Express, etc.), and configuring a database. Services like Vercel, Netlify, and Render have made this process far easier by offering one-click deployments, CI/CD pipelines, and built-in environment variable management.
- image: blog-5.png

## Permissions

You have to enable read permissions in order to get the content from the API from the frontend. Click on "Settings" then "Users & Persmissions->Roles" and select the "Public" role. Scroll down to the "Post" section and enable the "find" and "findOne" permissions. This will allow anyone to read the posts from the API.

Once you have added all the content and enabled read access, let's move on.

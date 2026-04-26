# Section & Project Intro

In this section, we will continue to learn about aspects of React, but we're also going to learn and use the React Router Framework. We've already used React Router in declarative mode, but now we're going to use it in framework mode, which is extremely powerful. In fact, if you've ever used or heard of the Remix meta framework, React Router has replaced that. So we'll be building a server-side rendered project. Which means we can use things like loaders and actions. In this particular section, we'll start what is what I would say the main project of this course, which is called "The Friendly Dev" and it's mean to be a portfolio website for a web developer to showcase their projects, tell a litte bit about themselves as well as create blog posts.

So we're going to learn about React Router as a framework throughout the whole project, however we're also going to learn about working with different data resources. We'll start off by keeping our projects in a JSON file that is served with a fake REST api using JSON Server. And our blog will use a combination of a JSON file for the meta data and Markdown files for the blog posts, which is a fine solution for a small personal blog.

Once we get that up and running, we're going to get into a headless content management system called Strapi. This is similar to something like Wordpress where we have an admin area we can log into and create blog posts except it's headless, meaning it doesn't have a client facing website. It serves JSON data with the content we create in the admin area. So we'll refactor our website to use the Strapi API for both the projects and the blog posts. We're also going to use a cloud Postgres database from Neon.

In addition to these major aspects, we'll do things like create a responsive hamburger menu, add category filtering and sorting for the projects, add a text filter for blog posts along with re-usable pagination for both projects and posts. We'll also hook up a contact form with a service called FormSpree. 

We're also going to integrate Cloudinary with Strapi for image uploads. And at the end, we'll deploy our Strapi API to Render.com and our frontend to Vercel.

So this is a great real-world project that you guys can actually use in real life if you want. Maybe just change up the design. Which we'll also be using Tailwind for.

So this will take up the next 4 sections or so. We'll learn all about React Router framework and much more.
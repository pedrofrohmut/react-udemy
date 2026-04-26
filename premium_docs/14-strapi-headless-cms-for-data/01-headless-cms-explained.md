# Headless CMS Explained

Alright, so as it is now, we are using JSON files for our projects. I want to show you a more real-life example of how we may do this. We have a bunch of options. We could setup our own backend with Express or another backend framework or even a different language such as PHP or Pythom, however, for a small project like this, headless content management systems (CMS) are a great option. They allow us to manage our content in a user-friendly way and provide an API for us to consume that data in our frontend application.

## What Is a Headless CMS?

A headless CMS is a content management system that provides a backend for managing content but does not dictate how that content is presented to the user. This means that the frontend and backend are decoupled, allowing developers to use any technology stack they prefer for the frontend while still having a powerful backend for managing content. You have probably heard of Wordpress, which is a CMS, however, it is very opinionated and tightly coupled to its frontend. At least traditionally. Now you can actually use Wordpress as a headless CMS.

## What Is Strapi?

Strapi is an open-source headless content management system (CMS). There are a ton of options out there but many of them are paid and are hosted by the company that created them. Strapi is open-source and can be self-hosted, which means you have full control over your data and how it is managed. It is built with Node.js and provides a RESTful API out of the box, making it easy to integrate with any frontend framework or library. Strapi also has a powerful admin panel for managing content, which makes it easy for non-technical users to manage their content without needing to know how to code. This is great for freelancers to offer their clients.

## Our Project

Users will be able to log in to the admin panel and create new projects and blog posts. Using Markdown for a blog is a fine option, but if you plan on creating a lot of posts or have a lot of users, it is better to have a UI for managing that content.

In the next lesson, we will get Strapi up and running locally.

# What Is React?

So I'm sure that most of you have an idea of what React is. I mean you wouldn't purchase a course on something that you have absolutely no idea about, right? That would just be weird. But for those of you who are still a bit confused, let me explain.

React is a very popular client-side or frontend JavaScript library that is used to build user interfaces. It was created by Facebook in 2011 and released as open source in 2013. Today, it is maintained by Meta (formerly Facebook) and a large open-source community of developers and organizations around the world.

At its core, React allows developers to build encapsulated components that manage their own state, and then compose them to create complex UIs. If that sounds like gibberish to you, don't worry, by the end of this course, you'll be very familiar with components, state and all the other fundamentals of react. We'll go over the benefits of React in a bit, but just know that it makes building interactive elements in the browser much easier.

React is updated pretty frequently, so it's always getting new features and improvements. The latest version is version 19 and that's what we'll be using in this course.

## Is React A Framework

You may have noticed that when I introduced React, I called it a library and not a framework. This is because React is essentially a library that provides the tools to build user interfaces, but it doesn’t dictate how you structure your application.

A framework typically comes with a lot of built-in functionality and enforces a specific way of doing things. Think of frameworks like Angular or Vue—they include things like routing, state management, and form handling as part of the package. React, on the other hand, is more flexible. It focuses only on the UI, and you can choose additional tools for things like routing (React Router) and state management (Zustand, Redux, or Context API).

Something like Next.js is a framework that is built on React and it provides additional features like server-side rendering, file-based routing, and API handling. 

So to answer this question, I would say, technically no, React is a library, however, calling  it a framework still makes sense because you can add a few other small tools to it, such as a router and it behaves like one. it’s also in direct competition with frameworks like Angular.

## Why Use React

So, why should you use React instead of just writing plain JavaScript or using another framework? Well, there are a few key reasons for this:

1. Build Rich, Interactive UIs
   If you used the web back in the 90s and early 2000s, you probably remember static, boring websites. The page loaded and you had some text and images and that was it. Nowadays, users expect rich, interactive experiences. The page loads but then you have all kinds of forms and controls and things you click on to cause some kind of effect. React makes it easy to build these kinds of UIs with features like state management, lifecycle methods, and hooks. If you try and do some of this stuff with vanilla JavaScript, you'll quickly realize how much easier React makes it. I think vanilla JavaScript is great for learning the basics, and can be used for some small projects, but once you start building more complex applications, you'll want to use a library/framework like React.

2. Component-Based Architecture
   React is all about reusable components. Instead of writing one massive, tangled mess of code, you break your UI into small, manageable pieces—buttons, forms, navigation bars, etc. This makes your code more organized, maintainable, and scalable. This brings me back to the first point of building rich, interactive UIs. You can build a button component and use it in multiple places in your application. If you want to change the style of the button, you only have to do it in one place. This is a huge time saver and makes your codebase much easier to maintain.

3. Declarative and Easy to Read
   React uses a declarative approach to building UIs, meaning you describe what you want the UI to look like, and React handles the "how." This is much cleaner and easier to debug than manually updating the DOM like in vanilla JavaScript.

4. Huge Ecosystem and Community Support
   React is widely adopted, meaning there’s a massive community, tons of third-party libraries, and plenty of job opportunities. Whether you need UI components, routing, or state management, there's likely a React library for it.

5. Extremely popular in the industry
   If you're looking to become a web developer, it is probably your best bet to finding a job as it is by far the most popular frontend web tool.

6. Learn Once, Use Anywhere
   Once you learn React, you can apply your skills to different platforms and use different meta-frameworks and environments. 

   You can also use React to build all kinds of different applications and we'll talk about that next.

In fact, let's look at some of the different types of applications that you can build with React:


Single Page Applications (SPA): The initial type of application that React and other front-end frameworks of it's kind were created for are called "single page applications" or "SPAs". SPAs load a single HTML page and dynamically update it as the user interacts with the app. So your entire UI controlled by frontend JavaScript. I’ll dive deeper into SPAs in the next lesson to give you a better understanding.

Server-Rendered Applications (SSR): React is also used for building server-side rendered applications with the help of a meta framework like Next.js. These work a bit differently than SPAs and allow you to render components on the server before they reach the client. This can improve performance and SEO, especially for public-facing sites.

Static Websites: You can also build fast, static websites with React using tools like Next.js, Gatsby, or Astro. These frameworks generate all of the HTML files at build time, which means your site can be served directly from a CDN for maximum performance. This is great for marketing pages, blogs, documentation sites, portfolios, and more.

Mobile Applications: React can be used to build mobile apps with React Native, allowing you to write cross-platform native apps for iOS and Android using JavaScript and React’s component model. This is a huge benefit because you don’t have to learn separate languages like Swift or Kotlin.

Desktop Applications: You can build desktop applications using Electron, which combines React with Node.js and Chromium. This means you can create cross-platform desktop apps for Windows, macOS, and Linux using the same skills and tools you use for the web.

So if I had to sum up what React is and used for in a few words, it would be interactive UIs and components. Back in the early 2000s, websites were very static. A page loaded and you had some content to read with the occaisonal form. Now, there's all types of actions and events on web pages and in web apps. Doing this stuff with vanilla JavaScript is just not efficient. React makes it much easier and much more organized. So to be a front-end or full stack web developer in 2025 and on, you really need to know a front-end framework, whether it's React or something else. 

In the next lesson, I want to talk a little more about single page applications.

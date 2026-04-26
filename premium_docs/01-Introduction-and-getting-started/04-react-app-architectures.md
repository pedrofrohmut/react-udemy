# React App Architectures

When it comes to building applications with React, there's a whole bunch of different architectures and environments you can build and work with. If some of this goes over your head, don't worry about it. You don't need to understand the intricacies of different architectures to start using React.

# Single Page Applications (SPAs)

The first architecture type is really what these frontend frameworks were created for back around the early 2010s, and that is Single Page Applications, or SPAs. This is where the browser only actually loads a single HTML file. The rest of the UI is generated and updated using client-side JavaScript — in this case, React. So you get everything you need in that initial load and your UI is very fast and interactive. Even if you have what seem like multiple pages, like say an about page or a contact page, when the user navigates to one of those pages, it looks and feels like a normal page change, but under the hood, JavaScript is swapping out components and fetching new data without touching the actual page structure.

This is why SPAs feel so fast and snappy. You're not asking the server for a whole new HTML document every time. You're just pulling in the data you need and rendering it on the fly using JavaScript — usually with a library like React, Vue, or Svelte.

There are some drawbacks to SPAs such as longer initial loads due to large JavaScript bundles and there can be issues with SEO because the content is loaded with the JavScript. However after that initial load, the UI is extremely fast.

## Server-Side Rendered Apps

Server-Side Rendering (SSR) is a modern hybrid approach that's become really popular in recent years. You can still use React to create these types of applications, but it’s usually paired with meta frameworks like Next.js, or even tools like React Router v7, which supports SSR behavior (though it’s not a full SSR framework on its own). In fact, we’ll be using React Router in one of the projects later in this course.

With SSR, pages are rendered on the server for each request, and then JavaScript takes over on the client to enable interactivity. It blends the best of both worlds: fast initial page loads (like traditional multi-page apps) and dynamic, app-like behavior (like SPAs). This helps address things like SEO and first-load performance.

However, there are still tradeoffs. It requires a server to render pages on-demand. It's more complex to deploy and maintain than a static site or SPA. Page-to-page navigation can be slower than client-side routing unless caching and prefetching are used effectively.

## Static Site Generation (SSG)

Static Site Generation (SSG) is another powerful way to build React applications — and in many cases, it's the fastest and most cost-effective option available.

With SSG, your pages are pre-rendered at build time. That means instead of generating HTML on the fly like SSR, the HTML for each page is created ahead of time when you build the project. Then those pre-rendered pages are served as static files from a CDN or static host (like Vercel, Netlify, or even GitHub Pages).

You’re still using React components to build your UI, but during the build process, those components get turned into plain HTML files. Then when a user visits your site, they get lightning-fast performance because there's no server logic involved during the request — just static files being served.

The downside is if your site has hundreds or thousands of pages (like a large blog or product catalog), builds can become very slow. You typically would use SSG for small to medium-sized projects.


## Mobile Applications

You can also use React along with the React Native framework to build native mobile apps. Not some mobile container that wraps a web app, but an actual native app for iOS or Android. One of the coolest things about using React Native is you have a single codebase and you can compile for both iOS and Android, where normally, if you wanted an app on both platforms, you would need to build them separately. iOS with a language like Swift or Objective C and something like Kotlin or Java for Android. So React Native makes it easier and cheaper to build applications for both.

## Desktop Applications

I'll even throw in desktop applications because we have frameworks like Electron, which allow you to build native Windows, MacOS and Linux applications with JavaScript and you can use React to create the UI.

So as you can see, there are quite a few types of architectures. We'll mostly be focusing on single page apps because that's kind of the default if you aren't using any additional framework. Although, like I said, we will explore SSR in one of the larger projects in the course and that's the friendly dev website.

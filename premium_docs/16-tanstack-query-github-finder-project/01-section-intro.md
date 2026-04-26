# Section Intro

Up to this point, when it comes to making HTTP requests, we have been using the `useEffect` hook and then I showed you how to use React Router loaders and actions. Now I want to show you a third way and that is by using the popular library [TanStack Query](https://tanstack.com/query/latest), formerly known as "React Query". This is an extremely powerful tool to work with APIs, both fetching and mutating data.

It offers a bunch of built in features when it comes to caching, prefetching data, state handling and more. It can be used with a bunch of different frameworks, but it's React-first. I'll talk more about how TanStack Query works in the next lesson, but I just want to give you a demo of the project we'll be creating in this section. 

It's called Github Finder and we'll be using the GitHub REST API to be able to get user data and do some other things. So we come to the project and we can start to search for a GitHub user. Right away, there will be a dropdown with some suggestions. So we're making a request with TanStack Query behind the scenes to get these suggestions. Then when we enter a username, it shows us some data including their avatar, name, bio and link to their GitHub profile.

We'll also have a recent searches component that saves your last five searches in local storage. 

In addition to using TanStack Query to fetch data, we're going to take a look at mutations, which are used to mutate data on the server. We'll do this by adding a follow and unfollow button where you click it and it makes a PUT or a DELETE request through TanStack Query.

We'll be using TypeScript for this project. We'll have some other small features like a toast notification using the Sonner library.

I do want to mention that this is not something you should push to production unless you remove the follow button because in order to use that, we had to store a personal access token in the client because creating a backend server is beyond the scope for this project. So just remove that and you can deploy and put it in your portfolio.

We'll also be working with both TanStack Query and TanStack Router in the project after this as well. Let's get started.
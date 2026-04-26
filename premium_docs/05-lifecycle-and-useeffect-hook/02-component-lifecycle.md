# Understanding Component Lifecycle in React

So we know how to create components, add some state, pass in props, and render UI. But what happens when a component is created, updated, or removed from the DOM? I feel like this wasn't discussed enough in the previous React course that this one replaced. I want you guys to really understand what's going on behind the scenes.

In this section, we'll talk about component lifecycle and the useEffect hook. We're even going to look at class components, which are the old way of writing components.I want to do this so you can better understand the lifecycle.

## Component Lifecycle

Every React component goes through a series of phases from the time it's created or added to the DOM to when it's removed from the DOM. These phases are called the component lifecycle.

There are three main phases in the component lifecycle:

<img src="../images/react-lifecycle-1.png" width="500" />

1. **Mounting**: This is when the component is created and added to the DOM.
2. **Updating**: This is when the component is updated in the DOM. When this happens, the component is re-rendered. This means that the component is updated with new data or props. What triggers this phase is when the component's state or props change. For example, let's say you have a counter component that increments a number every time you click a button. When you click the button, the component's state changes and the component is re-rendered with the new state.
3. **Unmounting**: This is when the component is removed from the DOM. Meaning the component is no longer rendered.

When we write our React code, we can tap into these phases. Traditionally, React components were written with classes and there were certain lifecylce methods that we could use to do something when a component was created, updated, or removed. Back then, we could still use functional components, but we couldn't tap into these lifecycle methods. They were called dumb components because they were just used to render UI.

Starting in React 16.8, we can now use functional components to tap into these lifecycle methods. We do this with hooks. This is the standard now. You really only deal with class components if you're working with legacy code.

Now people, should I still learn how to write class components? I think you should spend a little time just understanding them but never use them in your projects.

I do however want to show you how they work when it comes to lifecycle then I'll show you the more modern way using hooks and specifically the `useEffect` hook.

## Why Do I Need to Understand Lifecycle?

You might be wondering why you need to understand lifecycle. It's important because you should understand what's going on behind the scenes. You need to know when to run which code at the right time. There can be things that you want to happen at certain points in the lifecycle. These are called "side effects" For example, you might want to fetch data from an API when a component is created or updated. You can do this by tapping into the lifecycle methods or with modern React, the `useEffect` hook. Which, we'll learn about soon.

Another important aspect, probably the most important is to avoid bugs caused my unecessary re-renders. This can be a real pain point with React. You can run into issues where your component is re-rendering too many times or not re-rendering when you expect it to. Understanding lifecycle will help you debug these issues.

It will also help you debug your code and write more efficient code. 

In the next lesson, I want to just setup a simple playground app so that we can experiment with lifecycle methods and hooks a little bit.






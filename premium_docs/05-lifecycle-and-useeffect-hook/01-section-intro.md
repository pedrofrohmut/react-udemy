# Section Intro

In this section, we're going to look at component lifecycle and the `useEffect` hook. All components go through certain phases from mounting to updating to unmounting in the DOM. This is reffered to as "LifeCylce" and there are certain points in that lifecycle that we can hook into using the `useEffect` hook. We do this to handle something called "side effects". Side effects are things like data fetching, setting up a subscription, or manually changing the DOM in React components. They are basically, anything that affects the outside world. Dealing with localstorage is a side effect, so at the end of this section, we'll be using the useEffect hook to save our notes to localstorage.

Now we're also going to look at class components. Classes used to be the standard prior to hooks. I wouldn't suggest using them now but the reason that I want to show you class components is one, so you have an idea how they work if you ever run into them with legacy code and two, they have something called "lifecycle methods" and I think showing you these will give you a better idea about how lifecycle works.

As far as the project, it's a mini-project I called the Lifecycle Playground. We're going to have button that mounts and unmounts a component from the DOM and we'll log at different phases. We'll first do it with a class component and lifecyctle methods, then we'll do it with a functional component and the `useEffect` hook. This way you can get an idea of the different phases in case you want something to happen at these points.


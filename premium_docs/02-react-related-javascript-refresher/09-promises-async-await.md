# Promises & Async/Await

JavaScript handles asynchronous operations using Promises and async/await, allowing us to manage things like API calls, database queries, or file reading without blocking execution.

## Promises

A Promise is an object that represents the eventual result of an asynchronous operation.
It can be in one of three states:

    - Pending – the async operation hasn’t finished yet.
    - Fulfilled – the operation succeeded (calls resolve).
    - Rejected – the operation failed (calls reject).

More often than not, you will be using Promises when working with APIs rather than creating them yourself. However, it is important to understand how they work.

Let's create a simple promise, which is resolved after a certain amount of time:

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise resolved!'); // Promise resolved!
  }, 2000);
});
```

We are creating a new promise. The function w pass to new Promise(...) is called the executor function.

It receives two parameters: resolve and reject, which are functions used to signal success or failure.

Inside the executor, we're simulating an async operation using setTimeout.

This delays code execution by 2 seconds (2000 ms).


This creates a new Promise object that resolves after 2 seconds. When I say resolve, I mean that the promise is successful. If the promise fails, we can reject it instead. We can then use the `then` method to handle the resolved promise:

```javascript
myPromise.then((data) => {
  console.log(data);
});
```

If we want to handle a rejected promise, we can use the `catch` method:

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Promise rejected!');
  }, 2000);
});

myPromise
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error); // Promise rejected!
  });
```

## Using Promises with APIs

When working with APIs, we can use the `fetch` method to make HTTP requests. The `fetch` method returns a Promise, which we can then use to handle the response:

```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Async/Await

Async/Await is a modern way to handle asynchronous operations in JavaScript. It is built on top of Promises and provides a more readable and manageable way to write asynchronous code. It replaces the use of `then` and `catch` with `async` and `await` keywords.

```javascript
const fetchData = async () => {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

fetchData();
```

The `async` keyword is used to define an asynchronous function, and the `await` keyword is used to wait for the Promise to resolve. We can use `try` and `catch` blocks to handle the resolved and rejected Promises.

You will use promises with APIs all the time in React, whether you are dealing with your own API from your backend or a third-party API. It is important to understand how they work and how to use them effectively.

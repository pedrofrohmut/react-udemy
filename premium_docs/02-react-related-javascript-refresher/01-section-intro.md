# Section Intro

Before we get into React, I want to make sure you have a good understanding of JavaScript. In particular, the JavaScript features that are most relevant to React. You can skip this section if you're already comfortable with this stuff, but we will be looking at the following topics:

- Arrow Functions & Function Expressions: Arrow functions are a shorter way to write functions in JavaScript. They're often used in React components, especially in event handlers and callbacks. They also behave differently with this, which is important to understand when dealing with context.
- Template Literals: Template literals let you embed variables and expressions inside strings using backticks. You'll use these all over the place in JSX for dynamic text.
- The Ternary Operator: This is a shorthand for if/else and is commonly used in JSX for conditional rendering.
- Desctructuring Obejects & Arrays: Destructuring allows you to unpack values from arrays or properties from objects into variables. You'll see this a lot in React when working with props, state, and hooks.
- Spread & Rest Operators: The spread operator ... lets you copy or merge arrays and objects. The rest operator gathers multiple values into one. Both are extremely useful when updating state in React.
- Array Methods: Methods like .map(), .filter(), and .reduce() are essential in React for rendering lists, transforming data, and managing state.
- Optional Chaining & Nullish Coalescing: These are used to safely access nested values and provide fallback defaults. Super helpful in JSX when working with potentially undefined data.
- Immutability: Immutability means not changing data directly, but instead creating a new copy of the data with the updates you want. In JavaScript, certain data types like objects and arrays are reference types, which means if you change them directly, you're actually modifying the original data. In React, this can lead to bugs, unexpected behavior, and issues with rendering. React relies on immutability to detect when something has changed so it knows when to re-render components.
- Promises & Async/Await: React apps often fetch data from APIs. Knowing how to work with Promises and async/await is critical for writing clean, readable async code.

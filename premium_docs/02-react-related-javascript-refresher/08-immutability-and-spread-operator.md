# Immutability & Spread Operator

In JavaScript, immutability means not modifying existing data but instead creating new copies when making changes. This is a core concept in functional programming and is especially important in React, where state should be immutable to ensure proper re-renders. Now I know we have not gotten into React yet and terms like "state" and "re-render" may be foreign to you. To put it simply, state is just data attached to either a component or the app itself that your React components watch for updates. React relies on comparing the old and new state by reference. If you mutate an object or array directly, its reference doesn’t change — so React may not realize anything changed. Therefore, your component may not re-render, which just means paint the new version of the component on the screen.

Immutability also makes it easier to reason about your code and helps prevent bugs. When you modify data in place, it can be difficult to track changes and understand the state of your application at any given time. By creating new copies of data, you can be sure that the original data remains unchanged, making it easier to debug and maintain your code.

I know we aren't using React yet, but it's important to understand immutability now so you're prepared when we start building React applications later on.

The good news is that we have tools like the `useState` hook in React to help us with this. So it's not as complicated as it is with vanilla JavaScript.

## Mutating An Array (Bad Practice)

Mutability, which means changing an array or objects contents directly, is not inherently bad. But when you're dealing with state in React, it's best to avoid mutating data directly. Here's an example of mutating an array:

```javascript
const notes = ['Meeting Notes', 'Grocery List'];
notes.push('Workout Plan'); // Mutates the original array
console.log(notes); // ["Meeting Notes", "Grocery List", "Workout Plan"]
```

In this example, we're adding a new item to the `notes` array by calling the `push` method. This mutates the original array. If we were to pass `notes` to a React component, React may not detect the change and re-render the component as expected.

## Creating A New Array (Good Practice)

To avoid mutating an array, you can create a new array with the updated data. This is where the spread operator comes into play. The spread operator is the same characters as the rest operator, three dots. However, it is used in a different way.

 Here's how you can add a new item to an array without mutating the original array:

```javascript
const notes = ['Meeting Notes', 'Grocery List'];
const newNotes = [...notes, 'Workout Plan']; // Creates a new array
console.log(notes); // ["Meeting Notes", "Grocery List"]
console.log(newNotes); // ["Meeting Notes", "Grocery List", "Workout Plan"]
```

In this example, we're creating a new array called `newNotes` by spreading the `notes` array and adding a new item to it. This ensures that the original `notes` array remains unchanged.

## Updating a Value

If you wanted to change "Grocery List" to "Shopping List" and do it in an immutable way, you could do the following:

```js
const newNotes = notes.map((note) =>
  note === 'Grocery List' ? 'Shopping List' : note
);
````

## Mutating An Object (Bad Practice)

```javascript
const user = {
  name: 'John Doe',
  age: 30,
};

user.age = 31; // Mutates the original object
console.log(user); // { name: "John Doe", age: 31 }
```

In this example, we're changing the `age` property of the `user` object directly. This mutates the original object, which can cause issues when working with React state.

## Creating A New Object (Good Practice)

```javascript
const user = {
  name: 'John Doe',
  age: 30,
};

const newUser = { ...user, age: 31 }; // Creates a new object
console.log(user); // { name: "John Doe", age: 30 }
console.log(newUser); // { name: "John Doe", age: 31 }
```

To avoid mutating an object, you can create a new object with the updated data. In this example, we're creating a new object called `newUser` by spreading the `user` object and updating the `age` property. This ensures that the original `user` object remains unchanged.

These are examples for adding items, but the same principles apply when removing or updating items in an array or object. Always create new copies of data to ensure immutability. The `filter` method is commonly used to remove items from an array without mutating it.

Luckily, in React, we don't have to worry about manually creating new copies of state objects. React provides a `useState` hook that handles immutability for us. But I still think it's important to understand the concept of immutability and how to work with immutable data in JavaScript.

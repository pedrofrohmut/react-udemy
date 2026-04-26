# Ternary Operator & Short Circuit Rendering

In React, you will often see the ternary operator and short-circuit rendering used to conditionally render components and data. In this lesson, we will look at both of these concepts and how they are used in React.

## Ternary Operator

The ternary operator (?) is a concise way to write an `if` statement in JavaScript. It's used a lot in React because it allows you to write conditional logic in a single line. React components return JSX, and you can't use long form `if` statements inside JSX. It has to be a single expression. The ternary operator is a great way to handle conditional rendering in React.

Let's look at a simple example. First, I will write a regular if statement:

```javascript
const number = 5;
let message;
if (number % 2 === 0) {
  message = 'Even Number';
} else {
  message = 'Odd Number';
}

console.log(message);
```

Let's rewrite this using the ternary operator:

```javascript
const number = 5;
const message = number % 2 === 0 ? 'Even Number' : 'Odd Number';
console.log(message);
```

The ternary operator takes three operands: a condition followed by a question mark (?), an expression to execute. One thing that helped me with the syntax is to think of the question mark as the `if` and the colon as the `else`.

Let's do a more real-life example and render something based on a condition within a template literal.

Let's use the following data object:

```javascript
const note = {
  title: 'Meeting Notes',
  content: 'Discuss project roadmap...',
  timestamp: Date.now(),
  isPinned: true,
```

Let's say we want to output a message based on whether the note is pinned or not. We can use the ternary operator to do this:

```javascript
const noteText = `Title: ${note.title}
Status: ${note.isPinned ? '📌 Pinned Note' : 'Regular Note'}
Last Edited: ${new Date(note.timestamp).toLocaleString()}`;

console.log(noteText);
```

It will output '📌 Pinned Note' if the note is pinned and 'Regular Note' if it's not.

## Short Circuit Rendering

Short-circuit rendering is another way to conditionally render components in React. It's based on the concept of short-circuit evaluation in JavaScript. In short-circuit evaluation, the second operand is only evaluated if the first operand is not falsy. We us it in React as sort of a ternary operator without the else part.

Let's look at an example of how this works:

```javascript
console.log(false && 'Hello'); // false
console.log(true && 'Hello'); // "Hello"
```

As you can see, if the first operand is falsy, the second operand is not evaluated. So in the first example it never shows "Hello". In the second example, it does because the first operand is true.

Let's look at another example closer to what you would see in React:

```javascript
const isLoggedIn = true;

function showWelcome() {
  return isLoggedIn && 'Welcome, User!';
}

console.log(showWelcome()); // Output: Welcome, User!
```

In this example, the `showWelcome` function will return 'Welcome, User!' only if `isLoggedIn` is true. If `isLoggedIn` is false, it will return `false`, which if we were using JSX, would not render anything. So it is essentially a ternary without the else part.

# Template Literals

Template literals are a way to concatenate strings in JavaScript. They are a more modern way to do this than using the `+` operator. They allow you to embed expressions inside the string.

Let's look at a very simple example:

```javascript
const name = 'John';
// Concatenation using the + operator
const greeting = 'Hello, ' + name;

// Using template literals
const greeting = `Hello, ${name}`;
```

Instead of quotes, we use backticks to surround the string. Then we can use the `${}` syntax is used to embed expressions inside the string. You can put any valid JavaScript expression inside the curly braces.

Let's look at another example. We'll integrate arrow functions, which we looked at in the last lesson:

```javascript
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  // Concatenation using the + operator
  return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
  // Using template literals
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};
```

Let's create a note object with some dummy data:

```javascript
// Sample note data
const note = {
  title: 'Discuss project roadmap',
  timestamp: Date.now(),
};
```

Let's now output the function expression to the console using template literals:

```javascript
console.log(`Last edited: ${formatDate(note.timestamp)}`);
```

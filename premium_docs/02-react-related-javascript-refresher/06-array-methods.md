# Array Methods

Array methods are a very important and useful party of JavaScript. They allow us to manipulate arrays in a variety of ways. Here are some of the most common array methods:

## map()

The `map()` method is probably the most common when it comes to React. It is used for creating what are called "lists", which are essentially arrays of elements. These elements could be React components or HTML tags with content.

The `map()` method creates a new array with the results of calling a provided function on every element in the calling array.

Let's take the following array of notes:

```javascript
const notes = [
  { title: 'Meeting Notes', content: 'Discuss project roadmap', isPinned: true },
  { title: 'Grocery List', content: 'Buy milk, eggs, bread', isPinned: false },
  { title: 'Workout Plan', content: 'Push day: Bench, Shoulder Press', isPinned: false },
  { title: 'Recipe Ideas', content: 'Pasta, Salad, Tacos', isPinned: false },
];
```

Let's say we want to create an array of just the titles of the notes. We can use the `map()` method to do this:

```javascript
const noteTitles = notes.map((note) => note.title);
console.log(noteTitles); // [ "Meeting Notes", "Grocery List", "Workout Plan", "Recipe Ideas" ]
```

So the function we passed into the `map()` method is called for each element in the `notes` array. The `note` parameter is the current element being processed. The function returns the `title` property of the `note` object, which is then added to the `noteTitles` array. You can also pass an index as a second parameter to the function if you need it like so:

```javascript
const noteTitles = notes.map((note, index) => `${index + 1}. ${note.title}`);
```

## filter()

The `filter()` method creates a new array with all elements that pass the test implemented by the provided function. So it is similar to the `map()` method, but instead of transforming the elements, it filters them based on a condition.

In React, this method is often used for deleting or removing elements from the UI.

Let's say we want to filter out the notes that are isPinned. We can use the `filter()` method to do this:

```javascript
const pinnedNotes = notes.filter((note) => note.isPinned);
console.log(pinnedNotes); // [ { title: "Meeting Notes", content: "Discuss project roadmap", isPinned: true } ]
```

We could even use both the `map()` and `filter()` methods together to create a new array of just the titles of the pinned notes:

```javascript
const pinnedNoteTitles = notes
  .filter((note) => note.isPinned)
  .map((note) => note.title);
console.log(pinnedNoteTitles); // [ "Meeting Notes" ]
```

## reduce()

The `reduce()` method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value. This is useful for summing up numbers, concatenating strings, or any other operation that requires combining elements of an array.

Let's create a simple array of numbers:

```javascript
const numbers = [1, 2, 3, 4, 5];
```

Let's say we want to sum up all the numbers in the array. We can use the `reduce()` method to do this:

```javascript
const sum = numbers.reduce((total, number) => total + number, 0);
console.log(sum); // 15
```

The function we pass in takes in two parameters: the `total` accumulator and the current `number` being processed. The function returns the sum of the `total` and `number`, which is then passed to the next iteration. The `0` at the end is the initial value of the `total` accumulator.

Let's say we want to count the total number of characters in all the notes. We can use the `reduce()` method to do this:

```javascript
const totalCharacters = notes.reduce(
  (total, note) => total + note.content.length,
  0
);
console.log(totalCharacters); // 94
```

## forEach()

The `forEach()` method executes a provided function once for each array element. It is similar to the `map()` method, but it does not return a new array. It is useful when you want to perform an action on each element in the array.

Let's say we want to log the title of each note to the console. We can use the `forEach()` method to do this:

```javascript
notes.forEach((note) => console.log(note.title));
// Meeting Notes
```

Those are the most common array methods you will encounter in JavaScript. There are many more array methods available, so be sure to check out the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) for more information.

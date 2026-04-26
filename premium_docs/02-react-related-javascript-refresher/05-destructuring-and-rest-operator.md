# Desctructuring & Rest Operator

Another JavaScript feature that is very useful in React is destructuring. Destructuring allows you to extract multiple pieces of data from arrays and objects and assign them to variables in a single statement.

## Destructuring Arrays

Let's use an array of notes:

```javascript
const notes = [
  { title: 'Meeting Notes', content: 'Discuss project roadmap' },
  { title: 'Grocery List', content: 'Buy milk, eggs, bread' },
  { title: 'Workout Plan', content: 'Push day: Bench, Shoulder Press' },
  { title: 'Recipe Ideas', content: 'Pasta, Salad, Tacos' },
];
```

To destructure the array, you can use the following syntax:

```javascript
const [firstNote, secondNote] = notes;
console.log(firstNote); // { title: "Meeting Notes", content: "Discuss project roadmap" }
console.log(secondNote.title); // "Grocery List"
```

So we are extracting the first two elements of the `notes` array and assigning them to the `firstNote` and `secondNote` variables.

## Rest Operator

The rest operator (`...`) allows you to collect the remaining elements of an array into a new array. You can use it to destructure the first element and then collect the rest of the elements into a new array.

Let's use the same `notes` array:

```javascript
const [firstNote, ...otherNotes] = notes;
console.log(firstNote); // { title: "Meeting Notes", content: "Discuss project roadmap" }
console.log(otherNotes); // [ { title: "Grocery List", content: "Buy milk, eggs, bread" }, { title: "Workout Plan", content: "Push day: Bench, Shoulder Press" }, { title: "Recipe Ideas", content: "Pasta, Salad, Tacos" } ]
```

## Destructuring Objects

We can also destructure objects. Let's use the following object:

```javascript
const note = {
  title: 'Meeting Notes',
  content: 'Discuss project roadmap',
  isPinned: true,
};
```

To destructure the object, you can use the following syntax:

```javascript
const { title, content } = note;
console.log(title); // "Meeting Notes"
console.log(content); // "Discuss project roadmap"
```

You can also rename the variables when destructuring an object:

```javascript
const { title: noteTitle, content: noteContent } = note;
console.log(noteTitle); // "Meeting Notes"
console.log(noteContent); // "Discuss project roadmap"
```

## Nested Destructuring

Let's say we have the following object:

```javascript
const user = {
  name: 'Ben',
  address: { city: 'Boston', state: 'MA' },
};
```

We can extract the `city` property from the `address` object using destructuring:

```javascript
const {
  address: { city },
} = user;
console.log(city); // "Boston"
```

You can also destructure arrays inside of objects. Let's use the following object:

```javascript
const note = {
  title: 'Meeting Notes',
  content: 'Discuss project roadmap',
  isPinned: true,
  tags: ['meeting', 'roadmap', 'planning'],
};
```

To destructure the nested object, you can use the following syntax:

```javascript
const {
  title,
  content,
  tags: [firstTag],
} = note;
console.log(firstTag); // "meeting"
```

You can also use the rest operator with the nested destructuring:

```javascript
const {
  title,
  content,
  tags: [firstTag, ...otherTags],
} = note;
```

This kind of thing is very common in React.

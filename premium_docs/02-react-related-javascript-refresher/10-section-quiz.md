# Section Quiz

1. What kind of return does this arrow function have?

```javascript
const getRectangleArea = (width, height) => width * height;
```

- [ ] Implicit
- [ ] Explicit
- [ ] None
- [ ] Both

Answer: Implicit

2. Which of the following correctly uses a template literal?

- [ ] `'Hello ' + name + '!'`
- [ ] `"Hello, ${name}!"`
- [ ] `"Hello " + name + "!"`
- [ ] `Hello, ${name}!`

Answer: `"Hello, ${name}!"`

3. What will the following code output?

```javascript
const age = 20;
const message = age >= 18 ? 'Adult' : 'Minor';
console.log(message);
```

- [ ] true
- [ ] false
- [ ] Adult
- [ ] Minor

Answer: Adult

4. How would you extract city from this object using destructuring?

```javascript
const user = {
  name: 'Alice',
  address: { city: 'New York', country: 'USA' },
};
```

- [ ] `const { city } = user;`
- [ ] `const { address: { city } } = user;`
- [ ] `const { city } = user.address;`
- [ ] `const { address: { city } } = user.address;`

Answer: `const { address: { city } } = user;`

5. What will the following code output?

```javascript
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4, 5];
console.log(newNumbers);
```

- [ ] [1, 2, 3, 4, 5]
- [ ] [1, 2, 3, [4, 5]]
- [ ] [4, 5, 1, 2, 3]
- [ ] [1, 2, 3]

Answer: [1, 2, 3, 4, 5]

6. Which method is used for removing items from the UI without mutating it?

- [ ] `splice`
- [ ] `filter`
- [ ] `map`
- [ ] `reduce`

Answer: `filter`

7. Which of the following correctly adds an item to an array immutably?

- [ ] `numbers[numbers.length] = 4`
- [ ] `numbers.push(4)`
- [ ] `const newNumbers = [...numbers, 4]`
- [ ] `numbers.splice(0, 0, 4)`

Answer: `const newNumbers = [...numbers, 4]`

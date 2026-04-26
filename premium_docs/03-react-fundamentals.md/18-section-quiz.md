# Section Quiz

1. What does JSX stand for?

- [ ] JavaScript XML
- [ ] JavaScript Syntax Extension
- [ ] JavaScript Extension
- [ ] JSON Syntax

Answer: A - JavaScript XML

2. What is the correct way to embed a JavaScript variable in JSX?

- [ ] `{{ variable }}`
- [ ] `<%= variable %>`
- [ ] `{ variable }`
- [ ] `$variable`

Answer: C - `{ variable }`

3. What is the purpose of the useState hook?

- [ ] To fetch data
- [ ] To pass state to other components
- [ ] To store and update state in a functional component
- [ ] To create reusable components

Answer: C - To store and update state in a functional component

4.  What will the following code render when the button is clicked?

```javascript
function App() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

- [ ] Nothing
- [ ] 0
- [ ] It increases the count by 1 each time the button is clicked
- [ ] It decreases the count by 1 each time the button is clicked

Answer: C - It increases the count by 1 each time the button is clicked

5. How are props passed to a component?

- [ ] Through a special props keyword
- [ ] Using this.props =
- [ ] As arguments in the component definition
- [ ] As attributes in the JSX tag

Answer: D - As attributes in the JSX tag

6. Which statement is true about props in React?

- [ ] Props can only be numbers and strings
- [ ] Props are mutable
- [ ] Props are used to pass data from parent to child
- [ ] Props must be defined in state first

Answer: C - Props are used to pass data from parent to child

7. What is the best way to render a list of items in React?

- [ ] With a for loop 
- [ ] With the .map() method
- [ ] With a while loop
- [ ] With the forEach() method

Answer: B - With the .map() method

8. What is the purpose of the key prop in a list?

- [ ] To uniquely identify each element in the list
- [ ] To style the list items
- [ ] To add event listeners to the list items
- [ ] To sort the list items

Answer: A - To uniquely identify each element in the list

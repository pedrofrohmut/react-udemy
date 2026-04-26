# Section Quiz

1. What is prop drilling?

- [ ] Passing props into useContext()
- [ ] Passing data through multiple layers of components just to reach a deeply nested one
- [ ] Using too many props in one component
- [ ] A method to extract props from children

Answer: B - Passing data through multiple layers of components just to reach a deeply nested one

2. What problem does the Context API primarily solve in a React app?

- [ ] It improves component performance
- [ ] It eliminates the need for useEffect
- [ ] It allows global state to be accessed without prop drilling
- [ ] It replaces the need for component-level state

Answer: C - It allows global state to be accessed without prop drilling

3.  What are the three basic steps to using the Context API?

- [ ] useRef(), useContext(), useReducer()
- [ ] Create a context, call an API, update the DOM
- [ ] Declare props globally, wrap app in state, pass values with props
- [ ] Create a context, use a provider to share value, consume with useContext()

Answer: D -  Create a context, use a provider to share value, consume with useContext()

4. Which of the following is NOT a good use case for the Context API?

- [ ] Sharing the authenticated user’s info across the app
- [ ] Controlling theme state (dark/light) globally
- [ ] Passing frequently typed input text from one component to another
- [ ] Managing a shopping cart’s global item list

Answer: C - Passing frequently typed input text from one component to another

5.  Why is a custom hook like useProducts() used in this context implementation?

- [ ] It improves performance of the provider
- [ ] It simplifies consuming the context in other components
- [ ] It memoizes all fetch requests
- [ ] It replaces the need for useState entirely

Answer: B - It simplifies consuming the context in other components

6. Which prop is required on the context provider to pass down data?

- [ ] value
- [ ] context
- [ ] children
- [ ] props

Answer: A - value
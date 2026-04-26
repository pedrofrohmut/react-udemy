# Section Quiz

1. What are the three main phases of a React component's lifecycle?

- [ ] Initialization, Execution, Termination
- [ ] Creation, Deletion, Mutation
- [ ] Begin, Render, Destroy
- [ ] Mounting, Updating, Unmounting

Answer: D - Mounting, Updating, Unmounting

2. Which class lifecycle method is most closely equivalent to using useEffect(() => { ... }, []) in a functional component?

- [ ] componentDidMount
- [ ] componentDidUpdate
- [ ] componentWillUnmount
- [ ] componentDidCatch

Answer: A - componentDidMount

3. What does passing an empty dependency array [] to useEffect do?

- [ ] It runs the effect on every render
- [ ] It runs the effect only on the first render
- [ ] It runs the effect on every update
- [ ] It runs the effect only when a specific state changes

Answer: B - It runs the effect only on the first render

4. How can you detect when a component is unmounted using useEffect?

- [ ] Use a useUnmount() hook
- [ ] Set useEffect(() => {}, [null])
- [ ] Return a cleanup function inside useEffect
- [ ] Call ReactDOM.unmount() inside the component

Answer: C - Return a cleanup function inside useEffect

5.  In the LifecycleLogger component, why do we use a separate useEffect with [count] as the dependency?

- [ ] To initialize state
- [ ] To log every time the count changes (i.e., on updates)
- [ ] To prevent re-renders
- [ ] To unmount the component

Answer: B - To log every time the count changes (i.e., on updates)

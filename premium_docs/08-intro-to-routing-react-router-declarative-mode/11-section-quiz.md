# Section Quiz

1. In declarative mode with React Router 7, how do you specify what component should render for a specific URL path?

- [ ] Use a <Route path="..." render="..." /> statement
- [ ] Pass the component to a component prop in <Routes>
- [ ] Use a <Route path="..." element={<Component />} /> inside <Routes>
- [ ] Assign the route inside a .json config file

Answer: C - Use a <Route path="..." element={<Component />} /> inside <Routes>

2. What is the role of the Routes component in a React Router app?

- [ ] It matches the current URL and renders the first matching <Route>
- [ ] It renders the fallback component when no route is matched
- [ ] It is a higher-order component that wraps the app state
- [ ] It provides built-in animations for route transitions

Answer: A -It matches the current URL and renders the first matching <Route>

3.  What does a dynamic route like /blog/:id allow you to do?

- [ ] Render multiple routes at the same time
- [ ] Define route-based styles
- [ ] Capture URL parameters and use them in the component
- [ ] Prevent direct access to certain paths

Answer: C -  Capture URL parameters and use them in the component

4. What is the correct package to install for React Router 7+ in this project?

- [ ] react-router-dom
- [ ] react-router-v7
- [ ] @react/router
- [ ] react-router

Answer: D - react-router

5.  What is the purpose of adding a path="*" route in React Router?
- [ ] To define the homepage
- [ ] To match all nested routes under /
- [ ] To catch any undefined or non-matching routes and show a fallback page
- [ ] To create a redirect for authenticated users

Answer: C - To catch any undefined or non-matching routes and show a fallback page

6. What does this line do in the JSX?

{coin.links.blockchain_site[0] && (
  <a href={coin.links.blockchain_site[0]}>...</a>
)}


- [ ] It renders the link no matter what
- [ ] It ensures the link is only shown if a blockchain site exists
- [ ] It disables the link until the page fully loads
- [ ] It binds a redirect handler

Answer: B - It ensures the link is only shown if a blockchain site exists
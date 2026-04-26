# Section Quiz

1. Which file is responsible for defining all the routes in framework mode?

- [ ] vite.config.ts
- [ ] routes/index.tsx
- [ ] app/routes.ts
- [ ] main.tsx

Answer: C - app/routes.ts

2. What function is used to define a basic route in framework mode?

- [ ] defineRoute()
- [ ] route()
- [ ] useRoutes()
- [ ] createRoute()

Answer: B - route()

3.  What does the route() function require as its arguments?

- [ ] Only the path to the component file
- [ ] A path and a layout component
- [ ] A URL and metadata object
- [ ] A name and the relative path to the component file

Answer: D - A name and the relative path to the component file

4. What happens during client-side hydration?

- [ ] Data is streamed from the server to the browser
- [ ] React runs JavaScript and attaches interactivity to the static HTML
- [ ] Styles are rendered before content
- [ ] Components are removed and re-added by the browser

Answer: B - React runs JavaScript and attaches interactivity to the static HTML

5.  If window is undefined in a component, where is the code currently executing?

- [ ] Inside a service worker
- [ ] In the browser
- [ ] On the server
- [ ] In a web worker

Answer: C - On the server

6. When is useEffect executed during SSR?

- [ ] During the initial server render
- [ ] Before hydration
- [ ] Only on the client after hydration
- [ ] In both client and server equally

Answer: C -  Only on the client after hydration

7. Which component is used to display the output for a specific route?

- [ ] <Children />
- [ ] <Output />
- [ ] <Outlet />
- [ ] <App />

Answer: C - <Outlet />
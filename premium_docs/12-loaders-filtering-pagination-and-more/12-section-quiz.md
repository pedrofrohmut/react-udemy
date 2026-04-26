# Section Quiz

1. How is data from a loader accessed?

- [ ] It is automatically saved to localStorage
- [ ] It is passed to the component as props
- [ ] From a function called "getLoaderData()"
- [ ] It must be fetched again on the client

Answer: B - It is passed to the component as props

2. What is the key difference between a server loader and a client loader?

- [ ] Client loaders only work with REST APIs
- [ ] Server loaders return data asynchronously
- [ ] Server loaders fetch data before rendering, client loaders fetch after rendering
- [ ] Server loaders use useEffect, client loaders do not

Answer: C - Server loaders fetch data before rendering, client loaders fetch after rendering

3.  What is the purpose of hydrateFallback when using client loaders?

- [ ] To define the default data format
- [ ] To cache the loader result
- [ ] To handle hydration errors in SSR
- [ ] To render a fallback UI (like a spinner) while the loader runs

Answer: D - To render a fallback UI (like a spinner) while the loader runs

4. What is the purpose of creating a Project type in TypeScript?

- [ ] To dynamically fetch data from the backend
- [ ] To validate form inputs
- [ ] To define the structure of the project data and enable type checking
- [ ]To format project data as a class

Answer: C - To define the structure of the project data and enable type checking

5.  What is the correct JSX to render all projects using the ProjectCard component?

- [ ] <ProjectCard project={projects} />
- [ ] {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
- [ ] {projects.map((project) => <ProjectCard key={project.id} {...project} />)}
- [ ] <ProjectCard key={project.id} />

Answer: B - {projects.map((project) => <ProjectCard key={project.id} project={project} />)}

6.  What is the purpose of the condition {totalPages > 1 && renderPagination()}?

- [ ] To only fetch projects when there is more than one page
- [ ] To prevent rendering pagination buttons if not needed
- [ ] To reset the pagination on route change
- [ ] To apply a different layout for multiple pages

Answer: B - To prevent rendering pagination buttons if not needed


7.  What data structure is used to get unique categories from the project list?

- [ ] Array
- [ ] Object
- [ ] Map
- [ ] Set

Answer: D - Set

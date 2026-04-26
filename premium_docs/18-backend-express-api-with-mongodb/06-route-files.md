# Route Files

We have two test routes on our server in the `server.js` file. We can move them to a separate file for better organization. Create a new folder called `routes` in the root of the project and create a new file called `ideaRoutes.js` inside it. This will be for any routes related to ideas.

Since we are using a separate file for our routes, we need to import the `express` module in the `ideaRoutes.js` file. We also need to import the `router` object from the `express` module. The `router` object is used to define routes in an Express application. We will use it to define our routes in the `ideaRoutes.js` file.

```javascript
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  const ideas = [
    { id: 1, title: 'Idea 1', description: 'Description for Idea 1' },
    { id: 2, title: 'Idea 2', description: 'Description for Idea 2' },
    { id: 3, title: 'Idea 3', description: 'Description for Idea 3' },
  ];
  res.json(ideas);
});

router.post('/', (req, res) => {
  const newIdea = req.body;
  newIdea.id = Date.now(); // Simulate an ID for the new idea
  res.status(201).json(newIdea); // Send back the created idea with a 201 status code
});

export default router;
```

We bring in Express and create a new router object. We then define our routes using the `router` object instead of `app`. The `router` object is similar to the `app` object, but it is used to define routes in a modular way. This allows us to keep our routes organized and separate from the rest of our application. We then just export the router object at the end of the file.

Also noticed, we removed the `/api/ideas` part from the route. This is because we will be using the router object to define our routes, and we will add the `/api/ideas` prefix when we use it in our `server.js` file.

To use the `ideaRoutes.js` file in our `server.js` file, we need to import it and use it as middleware. We can do this by adding the following code to the top of our `server.js` file:

```javascript
import ideasRouter from './routes/ideaRoutes.js';

app.use('/api/ideas', ideasRouter);
```

Try making the GET and POST requests again. You should see the same results as before, but now we have a cleaner and more organized code structure.

## Adding Function Descriptions

This is a personal preference, but I like to add a few comments for all my routes. This way, I can quickly see what each route does and what the endpoint is without having to read through the entire code. You can add a comment above each route like this:

```javascript
// @route GET    /api/ideas
// @description   Get all ideas
// @access        Public
router.get('/', async (req, res, next) => {}

// @route POST    /api/ideas
// @description   Create a new idea
// @access        Public
router.post('/', async (req, res, next) => {}
```

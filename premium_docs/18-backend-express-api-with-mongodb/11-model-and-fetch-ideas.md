# Mongoose Models

With Mongoose, we can create models that represent our data structure. Models are used to create and read documents from the underlying MongoDB database.

Create a new file at `models/Idea.js` and add the following code:

```javascript
import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Idea = mongoose.model('Idea', ideaSchema);

export default Idea;
```

What we are doing here is defining a schema for our `Idea` model. The schema defines the structure of the documents in the `ideas` collection. We are defining the following fields:

- `title`: A string that is required and trimmed.
- `summary`: A string that is required and trimmed.
- `description`: A string that is required.
- `tags`: An array of strings that defaults to an empty array.
- `timestamps`: This option adds `createdAt` and `updatedAt` fields to the schema automatically.

Then we call `mongoose.model` to create a model called `Idea` based on the schema we just defined. This model will be used to interact with the `ideas` collection in the MongoDB database. Then we export the model so that we can use it in other parts of our application.

## Fetching Ideas

Now let's add the route to fetch all ideas from the database. Open the `routes/ideaRoutes.js` file and import the model:

```js
import Idea from '../models/Idea.js'
````



Add the following code to the `GET /api/ideas` route:

```javascript
// @route GET    /api/ideas
// @description   Get all ideas
// @access        Public
router.get('/', async (req, res, next) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });
    res.json(ideas);
  } catch (err) {
    next(err); // send to your error handler
  }
});
```

This is very simple. We are using the `find` method to get all ideas from the database and sort them by the `createdAt` field in descending order. If there is an error, we pass it to the error handler.

Test this route by sending a GET request to `http://localhost:5000/api/ideas` using Postman or your browser. You should see the idea that we already created in the database.

Make sure that you select the `GET` method in Postman and enter the URL `http://localhost:5000/api/ideas` in the address bar.

You should now see all of the ideas in the database. If you have not created any ideas yet, you will see an empty array `[]`.

## Single Idea Route

Now we need a route to get a single idea by its ID. Open the `routes/ideaRoutes.js` file and add the following code:

```javascript
// @route GET     /api/ideas/:id
// @description   Get a single idea by ID
// @access        Public
router.get('/:id', async (req, res, next) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      res.status(404);
      throw new Error('Idea not found');
    }
    res.json(idea);
  } catch (err) {
    next(err);
  }
});
```

Now go to Postman or the browser and send a GET request to `http://localhost:5000/api/ideas/:id`, replacing `:id` with the ID of the idea you want to fetch. You can find the ID in the response from the previous request.

This works and shows the idea with the specified ID.

Now try with an invalid ID. You get a weird error message. This comes from Mongoose. We need to handle this error and send a proper response.

Change the route code to this:

```javascript
// @route GET     /api/ideas/:id
// @description   Get a single idea by ID
// @access        Public
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error('Idea not found');
    }

    const idea = await Idea.findById(id);

    if (!idea) {
      res.status(404);
      throw new Error('Idea not found');
    }

    res.json(idea);
  } catch (err) {
    next(err);
  }
});
```

You have to import `mongoose` at the top of the file:

```javascript
const mongoose = require('mongoose');
```

We desctruture the `id` from `req.params` and check if it is a valid ObjectId using `mongoose.Types.ObjectId.isValid(id)`. If it is not valid, we send a 404 response with an error message. If it is valid, we fetch the idea from the database and send it as a response.


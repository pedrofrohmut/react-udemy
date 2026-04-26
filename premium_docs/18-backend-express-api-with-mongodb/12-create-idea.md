# Create Idea

Now that the model for an Idea is setup in Mongoose and we are fetching ideas, we can create the route to create an Idea. Open the `routes/ideaRoutes.js` file and import the model:

```javascript
import Idea from '../models/Idea.js';
```

Then, create a POST route to create an Idea:

```javascript
// @route POST    /api/ideas
// @description   Create a new idea
// @access        Public
router.post('/', async (req, res, next) => {
  try {
    const { title, summary, description, tags } = req.body || {};

    if (!title?.trim() || !summary?.trim() || !description?.trim()) {
      res.status(400);
      throw new Error('Title, summary, and description are required');
    }

    const newIdea = new Idea({
      title,
      summary,
      description,
      tags:
        typeof tags === 'string'
          ? tags
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean)
          : Array.isArray(tags)
          ? tags
          : [],
    });

    const savedIdea = await newIdea.save();
    res.status(201).json(savedIdea);
  } catch (err) {
    next(err); // forwards to errorHandler middleware
  }
});
```

We are first checking to make sure that there is a body, which are the form fields and then we are checking for the specific fields that we need. If not, we send a 400 status code and an error message. This will use the custom error handler that we created. If the fields are present, we create a new Idea object and save it to the database. For tags, we take in a string but save it as an array. Finally, we send the saved Idea back in the response with a 201 status code.

## Test the Route

Open Postman or whatever you want to test with and make a POST request to `http://localhost:5000/api/ideas`

Start by not entering any body and you should get a 400 status code with the error message "Title, summary, and description are required".

Then, try to create an Idea with the following body:

```json
{
  "title": "My First Idea",
  "summary": "This is a summary of my first idea.",
  "description": "This is a detailed description of my first idea.",
  "tags": "tag1, tag2, tag3"
}
```

You should get a response with the created Idea object. The ID will be created automatically.

## Check The Database

You can check the database to see if the Idea was created. Open MongoDB Atlas and click on "Browse Collections". Then, click on the "ideas" collection. You should see the Idea that you just created.

## Route Access

I want to mention that right now, all routes are public. This means that anyone can manage ideas without authentication. I want to focus on building a REST API for our MERN atack app and then we can look at options for authentication. So, for now, we will leave the routes as public. But in a real-world app, you would want to protect these routes with authentication and authorization.

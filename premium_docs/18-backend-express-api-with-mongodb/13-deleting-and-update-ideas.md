# Deleting Ideas

We now want to add the ability to delete ideas. Let's create the following route in the `routes/ideaRoutes.js` file:

```javascript
// @route DELETE  /api/ideas/:id
// @description   Delete idea by ID
// @access        Public
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error('Idea not found');
    }

    const idea = await Idea.findByIdAndDelete(id);

    if (!idea) {
      res.status(404);
      throw new Error('Idea not found');
    }

    res.json({ message: 'Idea deleted successfully' });
  } catch (err) {
    next(err);
  }
});
```

This is very similar to what we did to get an idea by ID. We check if the ID is valid, then we use `findByIdAndDelete` to delete the idea. If the idea is not found, we return a 404 error.

Let's delete the test idea that we created. Open Compass and check the ID for the test idea. Then make a delete request to the API using Postman:

```
DELETE http://localhost:5000/api/ideas/646f2a1e4c8b3d2f4c8b3d2f
```

You should get a response like this:

```json
{
  "message": "Idea deleted successfully"
}
```

## Update Idea

Now we need a route to update an idea. Updates typically use the "PUT" method. You may also see "PATCH" as well. We will create a new route in the `routes/ideaRoutes.js` file. The route will look like this:

```javascript
// @route PUT     /api/ideas/:id
// @description   Update idea by ID
// @access        Public
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error('Idea not found');
    }

    const { title, summary, description, tags } = req.body || {};

    if (!title || !summary || !description) {
      res.status(400);
      throw new Error('Title, summary, and description are required');
    }

    const updatedIdea = await Idea.findByIdAndUpdate(
      id,
      {
        title,
        summary,
        description,
        tags: Array.isArray(tags) ? tags : tags.split(',').map((t) => t.trim()),
      },
      { new: true, runValidators: true }
    );

    if (!updatedIdea) {
      res.status(404);
      throw new Error('Idea not found');
    }

    res.json(updatedIdea);
  } catch (err) {
    next(err);
  }
});
```

We are getting the `id` from the request parameters. We are also checking if the `id` is a valid MongoDB ObjectId. If it is not, we return a 404 error. We are also checking if the required fields are present in the request body. If they are not, we return a 400 error.

We use the Mongoose `findByIdAndUpdate` method to update the idea. We pass the `id`, the updated fields, and some options. The `new` option tells Mongoose to return the updated document. The `runValidators` option tells Mongoose to run the validators on the updated document.Validators are functions that check if the data is valid. For example, we have a validator that checks if the `title` is required. If the data is not valid, Mongoose will throw an error.

## Testing the Update Route

Now make a request to the update route. You can use Postman or any other API testing tool. Make sure to set the request method to `PUT` and the URL to `http://localhost:5000/api/ideas/:id`, where `:id` is the ID of the idea you want to update. Then add the body of the request. The body should be in JSON format. For example:

```json
{
  "title": "Updated Idea",
  "summary": "Updated summary",
  "description": "Updated description",
  "tags": "tag1, tag2, tag3"
}
```

We now have a full CRUD API for our ideas. We can create, read, update, and delete ideas.

In the next section, we will integrate our API into our React frontend instead of using JSON Server.


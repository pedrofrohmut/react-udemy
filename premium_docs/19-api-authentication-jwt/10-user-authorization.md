# Get User In Protected Routes

Now that we have the token working to access protected routes, we need to get the user from the token in the protected route. This is easy because if you look at the middleware, we have this line:

```javascript
req.user = user;
```

This is the user that is logged in. We can use this user in the protected route. If you do a console log in the `ideaRoutes.js` file in the `POST /api/ideas`, you will see the user object.

Open the `routes/ideaRoutes.js` file and add the user to the idea when creating a new idea. This way, we can know who created the idea. We can also use this user to check if the user is the owner of the idea when updating or deleting it.

```javascript
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
  user: req.user._id, // Add this line to set the user
});
```

Now you should be able to create a new idea as that user.

## Permission Check before Deleting

Right now anyone can delete an idea. Yes the route is protected, but if you are logged in, you can delete any idea. We need to check if the user is the owner of the idea before deleting it.

Got to the `DELETE /api/ideas/:id` route and replace this code:

```javascript
const idea = await Idea.findByIdAndDelete(id);

if (!idea) {
  res.status(404);
  throw new Error('Idea not found');
}
```

With the following code:

```javascript
const idea = await Idea.findById(id);

if (!idea) {
  res.status(404);
  throw new Error('Idea not found');
}

// Check if the logged-in user owns the idea
if (idea.user.toString() !== req.user._id.toString()) {
  res.status(403);
  throw new Error('Not authorized to delete this idea');
}

await idea.deleteOne();
```

So instead of deleting the idea right away, we first check if the idea exists. If it does, we check if the logged-in user is the owner of the idea. If not, we throw a 403 error. If they are the owner, we delete the idea.

## Permission Check before Updating

We want to do the same for updating an idea. Go to the `PUT /api/ideas/:id` route. We are not going to use the `findByIdAndUpdate` method because we want to check if the user is the owner of the idea before updating it. Here is the whole route code

```javascript
router.put('/:id', protect, async (req, res, next) => {
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

    // Check ownership
    if (idea.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this idea');
    }

    const { title, summary, description, tags } = req.body;

    if (!title || !summary || !description) {
      res.status(400);
      throw new Error('Title, summary, and description are required');
    }

    idea.title = title;
    idea.summary = summary;
    idea.description = description;
    idea.tags = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
      ? tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const updatedIdea = await idea.save();

    res.json(updatedIdea);
  } catch (err) {
    next(err);
  }
});
```

We are doing the same thing as before. We check if the idea exists and if the logged-in user is the owner of the idea. If not, we throw a 403 error. If they are the owner, we update the idea.

We then assign the new values to the idea and save it. Finally, we send the updated idea in the response.

The `filter(Boolean)` method is used to remove any empty strings from the tags array. This way, we don't have to worry about empty tags being saved in the database.

This is how it works:

- Each item in the array is passed to the Boolean constructor
- The Boolean constructor coerces each item to true or false depending on whether it’s truthy or falsy
- If the item is truthy, we keep it

You can test this by creating an idea and using your token to update it. You should be able to update it if it is yours. If you try to update an idea that you don’t own, you should get a 403 error.

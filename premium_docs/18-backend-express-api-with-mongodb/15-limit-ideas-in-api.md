# Limit Ideas On Homepage In API

We want to show only 3 ideas on the homepage. We can of course do this in the frontend, but it is better to do it in the backend. This way, we can limit the data we send to the client.

Let's go back to the backend and open the `routes/ideaRoutes.js` file and work in the first route to get all ideas.

If you want to get something from the url like this `http://localhost:5000/api/ideas?limit=3`, you can use the `req.query` object. This object contains the query string parameters. You can access them like this: `req.query.limit`.

So let's change the code to the following:

```javascript
// @route GET    /api/ideas
// @description   Get all ideas
// @access        Public
// @query        _limit (optional limit for number of ideas returned)
router.get('/', async (req, res, next) => {
  try {
    const limit = parseInt(req.query._limit); // optional limit
    const query = Idea.find().sort({ createdAt: -1 });

    if (!isNaN(limit)) {
      query.limit(limit);
    }

    const ideas = await query.exec();
    res.json(ideas);
  } catch (err) {
    next(err); // pass to error handler
  }
});
```

We are using the `parseInt` function to convert the query string parameter to an integer. We are also checking if the limit is a number using the `isNaN` function. If it is not a number, we do not apply the limit.

Then we are using the `limit` method of the Mongoose query object to limit the number of ideas returned. The `limit` method takes a number as an argument and limits the number of documents returned by the query.

Then we are using the `exec` method to execute the query and get the ideas. The `exec` method returns a promise, so we can use the `await` keyword to wait for the result. Then we send the ideas as a JSON response.

In your frontend in the `routes/index.tsx` file, change the `queryKey` and `queryFn` to 

```ts
onst ideasQueryOptions = queryOptions({
  queryKey: ['ideas', { limit: 3 }],
  queryFn: () => fetchIdeas(3),
});
```

Delete the following lines:

```ts
 const latestIdeas = [...ideas]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);
```

and replace `latestIdeas.map()` with `ideas.map`

Now edit the `fetchIdeas` in the `api/ideas.ts` file to take in a limit:

```ts
export const fetchIdeas = async (limit?: number): Promise<Idea[]> => {
  const response = await api.get('/ideas', {
    params: limit ? { _limit: limit } : {},
  });
  return response.data;
};

```

If you go to the homepage, you should see only 3 ideas. If you want to see more ideas, you can add the `_limit` query string parameter to the URL. For example: `http://localhost:5000/api/ideas?_limit=5`. This will return 5 ideas instead of 3.

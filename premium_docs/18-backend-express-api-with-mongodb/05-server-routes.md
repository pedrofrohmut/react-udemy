# Server Endpoints/Routes

An endpoint or a route in an API is a specific URL where a client can access resources or services provided by the server. We have been making request to the endpoints provided by JSON Server. Now we need to create our own endpoints in Express.

Open the `server.js` file in the `server` folder. Later we can move our routes to a separate file, but for now we will keep it simple. We will create a route to show some ideas. Ultimately, these will come from a database, but for now we will hardcode them.

Add the following above the `app.listen` line in the `server.js` file:

```javascript
app.get('/api/ideas', (req, res) => {
  const ideas = [
    { id: 1, title: 'Idea 1', description: 'Description for Idea 1' },
    { id: 2, title: 'Idea 2', description: 'Description for Idea 2' },
    { id: 3, title: 'Idea 3', description: 'Description for Idea 3' },
  ];
  res.json(ideas);
});
```

As you can see, we use the `app` object and the `get` method to create a GET request. The first argument is the URL, and the second argument is a callback function that takes two arguments: `req` and `res`. The `req` object contains information about the request, and the `res` object is used to send a response back to the client. In this case, we are sending a JSON response with an array of ideas.

## Testing the Endpoint

There are multiple ways to test the endpoint. You can use Postman, Insomnia, or even your browser. Since this is a GET request, you can simply open your browser and go to `http://localhost:5000/api/ideas`. You should see the JSON response with the hardcoded ideas.

I prefer to use Postman. You can install it as a standalone desktop app, but I like to use the VS Code extension. That way I can keep everything in one place. You can install the Postman extension from the VS Code marketplace. Once installed, you can open it from the sidebar.

We want to select a GET request. In the URL field, enter `http://localhost:5000/api/ideas`. Click on the Send button. You should see the JSON response with the hardcoded ideas.

## Status Codes

When you send a request to the server, it will respond with a status code. The status code indicates whether the request was successful or not.

Here are some common status codes:

- `200 OK`: The request was successful.
- `201 Created`: The request was successful, and a new resource was created.
- `204 No Content`: The request was successful, but there is no content to send back.

- `400 Bad Request`: The request was invalid or cannot be served.
- `401 Unauthorized`: The request requires user authentication.
- `403 Forbidden`: The server understood the request, but it refuses to authorize it.
- `404 Not Found`: The server has not found anything matching the request URI.
- `500 Internal Server Error`: The server encountered an unexpected condition that prevented it from fulfilling the request.

Let's add another one for the `POST` request. This will be used to create a new idea. Add the following code below the previous one:

```javascript
app.post('/api/ideas', (req, res) => {
  const { title, description } = req.body || {};
  newIdea.id = Date.now(); // Simulate an ID for the new idea

  const newIdea = { id: Date.now(), title, description };
  res.status(201).json(newIdea);
});
```

We get the incoming body data with `req.body`. We also set `|| {}` so it does not throw an unwanted error if the data is not sent. We want to handle that validation ourselves. We then assign an ID to the new idea using the current timestamp. Finally, we send back the created idea with a 201 status code.

In Express, you need to use middleware to parse the incoming request body. We will use the `express.json()` middleware for this. Add the following line at the top of your `server.js` file, right after the `app.cors()` line:

```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

This will allow Express to parse JSON and URL-encoded data in the request body. The `express.json()` middleware parses incoming requests with JSON payloads, and `express.urlencoded()` parses incoming requests with URL-encoded payloads.

Open up Postman again. Select the `POST` method. In the URL field, enter `http://localhost:5000/api/ideas`. In the body tab, select `raw` and `JSON` from the dropdown. Enter the following JSON:

```json
{
  "title": "Testing New Idea",
  "description": "Description for New Idea"
}
```

You should see the response with the new idea and a 201 status code. This means that the idea was created successfully.

Now you know how to create endpoints in Express and test them using Postman. In the next lesson, we will move the routes to a separate file.

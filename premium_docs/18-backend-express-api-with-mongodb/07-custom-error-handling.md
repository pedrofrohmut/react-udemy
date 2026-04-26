# Custom Error Handling in Express

Before we start to deal with a database, we need to set up a custom error handler. This will help us manage errors in a more structured way.

## Custom Error Handler

To create a custom error handler, we will create a new file called `errorHandler.js` in the `middleware` folder. Middleware is a function that has access to the request object, the response object. You can think of middleware as a way to add functionality to your Express app. Middleware can be used for logging, authentication, error handling, etc.

This file will contain our custom error handling middleware.

```javascript
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500; // Set default to 500 if status code is not set
  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
```

This middleware will catch any errors that occur in our application and send a JSON response with the error message and stack trace (if not in production).

Next, we need to import this middleware into our `server.js` file and use it.

```javascript
import { errorHandler } from './middleware/errorHandler.js';
```

Then add the following AFTER the routes in your `server.js` file:

```javascript
// Error handler middleware
app.use(errorHandler);
```

This will ensure that our custom error handler is used after all other middleware and routes have been defined.

## Testing the Error Handler

To test the error handler, you can create a new route in your `server.js` file that throws an error:

```javascript
app.get('/error', (req, res) => {
  throw new Error('This is a test error!');
});
```

Now you should see the formatted JSON response when you visit the `/error` route in Postman. Make sure it is a GET request.

## 404 Catch All

You probably want to have a catch all for any routes that are not defined. You can do this by adding the following code to your `server.js` file:

```javascript
// 404 error handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass to error handler
});
```

We are creating a new error and passing it to the error handler. This will ensure that any undefined routes will return a 404 error with a JSON response.

Now go to something that does not exist, like `/api/unknown`, and you should see a JSON response with the message "Not Found - /api/unknown".

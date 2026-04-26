# Using Axios

Up until this point in the course, we have been using the Fetch API to make our requests. However, for this project, I want to use Axios. Axios is a promise-based HTTP client for the browser and Node.js. It is a popular choice for making HTTP requests because it has a simple API and supports features like interceptors, request cancellation, and automatic JSON data transformation. The main reason that I want to use it is because it has built-in support for interceptors. Interceptors are functions that Axios calls for every request or response. This allows us to modify the request or response before it is sent or received. Later on, we will be adding a backend API with authentication which includes JSON web tokens and refresh tokens and we want to be able to attach a token to every request to authenticate the user. Interceptors make this easy to do.

Install Axios by running the following command:

```bash
npm install axios
```

## Create an Axios Instance

We will create an Axios instance that we can use to make our requests. This instance will have the base URL set to our API URL and will have interceptors for the request and response.

Create a new file at `src/lib/axios.ts` and add the following code:

```tsx
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

We are creating an Axios instance with the base URL set to `/api`. This is the URL that we will use to make our requests. We are also setting the `withCredentials` option to `true`. This is important because we will be using cookies to store our access and refresh tokens. We also set the `Content-Type` header to `application/json` so that the server knows that we are sending JSON data. So we don't need to set the base URL in every request. We can just use the instance that we created.

## Using the Axios Instance

Open the `src/routes/ideas/$ideaId/index.tsx` file and add the following import statement at the top:

```tsx
import api from '@/lib/axios';
```

Now in the `fetchIdeas` function, we can use the Axios instance to make our request. Replace the `fetch` call with the following code:

```tsx
const fetchIdea = async (ideaId: string): Promise<Idea> => {
  const res = await api.get(`/ideas/${ideaId}`);
  return res.data;
};
```

Notice we did not include `/api` in the URL. This is because we set the base URL in the Axios instance. We are using the `get` method to make a GET request to the `/ideas/${ideaId}` endpoint.

Axios is cleaner because we do not need to explicitly parse the response data. or check if the response is ok. Axios will automatically parse the response data and throw an error if the response is not ok. We can also use the `res.data` property to get the data from the response.

Your page should work the same as it did with fetch. In the next lesson we will fetch all ideas.

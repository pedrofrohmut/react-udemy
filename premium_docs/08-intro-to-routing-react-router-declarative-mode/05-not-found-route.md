# Not Found Route

Let's create a fallback not found 404 page when we go to a route that does not exist. This is a good practice to have in any application. It helps the user understand that they have navigated to a page that does not exist and provides them with options to navigate back to a valid page.

Create a new file at `src/pages/not-found.jsx` and add the following code:

```javascript
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to='/' style={styles.link}>
        ← Go back to Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '80px 20px',
    color: '#fff',
  },
  title: {
    fontSize: '72px',
    marginBottom: '20px',
  },
  message: {
    fontSize: '18px',
    marginBottom: '30px',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
  },
};

export default NotFound;
```

We used some inline styles to center the text and make it look nice. You can customize this as you like.

## Create The Route

Now we need to import this component in our `App.jsx` file and add a route for it. Open `src/App.jsx` and add the following code:

```javascript
import NotFound from './pages/not-found';
```

Then add the route to the `Routes` component:

```javascript
<Route path='*' element={<NotFound />} />
```

Make sure that you add this route at the end of the `Routes` component. This is because React Router will match the first route that it finds. If you put this route at the top, it will always match and never show any other routes.

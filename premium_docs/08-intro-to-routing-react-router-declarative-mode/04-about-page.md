# About Page

We have one route to our hompage. Let's go ahead and create a route for the about page. This will be a simple page that just has some text on it. We will also add a link to this page in the header.

Create a new file at `src/pages/about.jsx` and add the following code:

```javascript
const AboutPage = () => {
  return (
    <div className='about'>
      <h1>About Crypto Dash</h1>
      <p>
        Crypto Dash is a simple React application that displays live
        cryptocurrency data using the CoinGecko API.
      </p>
      <p>
        You can explore the top cryptocurrencies by market cap, filter by name
        or symbol, and sort them by price, market cap, or 24-hour change.
      </p>
      <p>
        This project is built as part of a React tutorial to help you understand
        hooks, components, state management, and integrating with external APIs.
      </p>
      <p>
        🚀 Future features might include detailed coin views, favorites,
        pagination, and much more!
      </p>
    </div>
  );
};

export default AboutPage;
```

Now we need to import this component in our `App.jsx` file and add a route for it. Open `src/App.jsx` and add the following code:

```javascript
import AboutPage from './pages/about';
```

Then add the route to the `Routes` component:

```javascript
<Routes>
  <Route
    path='/'
    element={
      <HomePage
        coins={coins}
        filter={filter}
        setFilter={setFilter}
        limit={limit}
        setLimit={setLimit}
        sortBy={sortBy}
        setSortBy={setSortBy}
        loading={loading}
        error={error}
      />
    }
  />
  <Route path='/about' element={<AboutPage />} /> // Add this line
</Routes>
```

## Linking To Routes

To create a link to a route in React Router, we use the `Link` component. This component is similar to an anchor tag, but it does not cause a full page reload. Instead, it updates the URL and renders the new route. This is what makes it so fast and efficient.

Let's create a file at `src/components/Header.jsx` and add the following code:

```javascript
import { Link } from 'react-router';

const Header = () => {
  return (
    <div className='top-nav'>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
    </div>
  );
};

export default Header;
```

Now import it into the `App.jsx` file and add it to the return statement:

```javascript
import Header from './components/Header';

  return (
    <>
      <Header /> // Add this line
      <Routes>
        <Route
          path='/'
          element={
            <HomePage
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
    </>
  );
};
```

Now you should see the links in the header. If you click on the About link, it should take you to the about page.

You can try changing the `Link` to an anchor tag and see what happens. You will see that it causes a full page reload and the application is not as fast. This is one of the main benefits of using React Router.

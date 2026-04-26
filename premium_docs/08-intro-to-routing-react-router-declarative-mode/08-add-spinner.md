# Add Spinners

Let's show a nice spinner instead of showing the text 'Loading...' when a coin is loading. We can do this a million different ways but I'm going to use a package called 'React Spinners' at https://www.npmjs.com/package/react-spinners.

Install the package:

```bash
npm i react-spinners
```

Create a new component at `components/Spinner` and add the following:

```js
import { BarLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '0 auto',
};

const Spinner = ({color='blue', size='150'}) => {
  return (
    <div>
      <BarLoader
        color='blue'
        cssOverride={override}
        size={150}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
};

export default Spinner;

```

There are all kinds of loaders you can use. I am using the BarLoader.

The override object is used to override the CSS styles. I am just moving it to the middle.

Open the `pages/coin-details.jsx` and import it:

```js
import Spinner from '../components/Spinner';
```

and replace the `<p>Loading... </p>` with `<Spinner />`,


Open the home page and do the same but use a white color prop:

and replace the `<p>Loading... </p>` with `<Spinner color='white' />`,

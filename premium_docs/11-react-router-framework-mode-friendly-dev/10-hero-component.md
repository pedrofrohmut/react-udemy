# Hero Component

Now we are going to create the hero component, which is pretty simple. It will have a welcome title, subtitle and some buttons to navigate to the different sections of the website.

Let's create a new file at `app/components/Hero.tsx` and add the following code:

```jsx
import { Link } from 'react-router';

const Hero = () => {
  return (
    <header className='text-center py-20 px-4 bg-gray-900 text-white transition-colors duration-300'>
      <h2 className='text-4xl font-bold mb-4'>Hey, I'm Brad 👋</h2>
      <p className='text-lg text-gray-300 max-w-2xl mx-auto mb-6'>
        I build friendly web experiences and help others become confident,
        modern developers.
      </p>
      <div className='flex justify-center gap-4'>
        <Link
          to='/projects'
          className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'
        >
          View Projects
        </Link>
        <Link
          to='/contact'
          className='border border-blue-500 text-blue-400 px-6 py-2 rounded hover:bg-blue-600 hover:text-white transition'
        >
          Contact Me
        </Link>
      </div>
    </header>
  );
};

export default Hero;
```

We are using the `Link` component from `react-router` to navigate to the different sections of the website. We don't use the `NavLink` component because we don't need to style the links differently when they are active.

You could put this in your layout, but then it would be on every page. I want to keep the layout as clean as possible, so I will add it to the `Home` page.

Open the `routes/home/index.tsx` file and import the `Hero` component and add it to the page:

```jsx
import Hero from '../components/hero';

const HomePage = () => {
  return (
    <div>
      <Hero />
    </div>
  );
};

export default HomePage;
```

## Props

Let's make the Hero a bit more flexible by adding some props. We will add a `name` and a `text` prop to customize the welcome message.

```jsx
import { Link } from 'react-router';

const Hero = ({
  name = '[NAME]',
  text = 'I build friendly web experiences and help others become confident, modern developers.',
}) => {
  return (
    <header className='text-center py-20 px-4 bg-gray-900 text-white transition-colors duration-300'>
      <h2 className='text-4xl font-bold mb-4'>Hey, I'm {name} 👋</h2>
      <p className='text-lg text-gray-300 max-w-2xl mx-auto mb-6'>{text}</p>
      <div className='flex justify-center gap-4'>
        <Link
          to='/projects'
          className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'
        >
          View Projects
        </Link>
        <Link
          to='/contact'
          className='border border-blue-500 text-blue-400 px-6 py-2 rounded hover:bg-blue-600 hover:text-white transition'
        >
          Contact Me
        </Link>
      </div>
    </header>
  );
};

export default Hero;
```

I just added some default values in case the props are not provided.

I will leave the default text but pass in my name as a prop:

```jsx
<Hero name='John' />
```

## Props Interface

If you want to be more explicit about the props, you can create an interface for the props. Right abobve the component, add the following code:

```jsx
interface HeroProps {
  name?: string;
  text?: string;
}
```

Now add the following code to the component:

```jsx
const Hero: React.FC<HeroProps> = ({
```

The `React.FC` type is a generic type that takes the props interface as a parameter. This way, you can use the props in the component and get type checking and autocompletion in your editor.

We do have one issue. The background color is not extending all the way to the sides and I would like it to. We can solve this by creating a separate layout with a layout route. We will look at those next.

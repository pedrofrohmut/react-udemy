# Idea Card Component

We have the idea cards on both the homepage and the idea page. Let's create a new component for the idea card. This will help us to reuse the code and keep our components clean.

They are a bit different. One has a button style link and one has a text style. So we can have a prop to change the style of the card.

Create a new file called `IdeaCard.tsx` in the `src/components` folder. This will be our idea card component.

Add the following imports to the file:

```tsx
import { Link } from '@tanstack/react-router';
import type { Idea } from '@/types';
import clsx from 'clsx';
```

The `clsx` library is used to conditionally apply classes to the component. We will use it to apply the styles based on the props. It is not needed. We have done conditional classes before. But it is a nice library to have.

Let's create the component:

```tsx
const IdeaCard = ({
  idea,
  button = true,
}: {
  idea: Idea;
  button?: boolean;
}) => {
  return (
    <div className='border border-gray-300 p-4 rounded shadow bg-white flex flex-col justify-between'>
      <div>
        <h2 className='text-lg font-semibold'>{idea.title}</h2>
        <p className='text-gray-700 mt-2'>{idea.summary}</p>
      </div>

      <Link to='/ideas/$ideaId' params={{ ideaId: idea.id }}>
        {button  ? 'View Idea' : 'Read more →'}
      </Link>
    </div>
  );
};

export default IdeaCard;
```

We are taking in the idea itself and another prop for the style of the link. The default is `button`. We are using the `Link` component from `@tanstack/react-router` to link to the idea page. We are also passing the idea ID as a parameter to the link.

## Dynamic Classes

Let's create a conditional class for the link. We can use the `clsx` library to do this. If the `linkStyle` prop is `button`, we will apply the button styles. If it is not, we will apply the text styles.

Add this above the `return` statement:

```tsx
const linkClasses = clsx({
  'text-blue-600 hover:underline mt-3': !button',
  'text-center mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition':
    button,
});
```

Then add the `linkClasses` to the `Link` component:

```tsx
<Link to='/ideas/$ideaId' params={{ ideaId: idea.id }} className={linkClasses}>
  {button ? 'View Idea' : 'Read more →'}
</Link>
```

Now open the `src/routes/ideas/index.tsx` file and import the `IdeaCard` component:

```tsx
import IdeaCard from '@/components/IdeaCard';
```

Then in the .map function, replace the JSX with the `IdeaCard` component:

```tsx
<ul className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
  {ideas.map((idea) => (
    <li key={idea.id} className='flex flex-col'>
      <IdeaCard idea={idea} />
    </li>
  ))}
</ul>
```

We are using the button style on this page.

Now open the `src/routes/index.tsx` file and import the `IdeaCard` component:

```tsx
import IdeaCard from '@/components/IdeaCard';
```

Then in the .map function, replace the JSX with the `IdeaCard` component:

```tsx
<ul className='space-y-6'>
  {ideas.map((idea: Idea) => (
    <li key={idea.id}>
      <IdeaCard idea={idea} button="false" />
    </li>
  ))}
</ul>
```

We are using the text style on this page.

I think this cleans things up a bit.

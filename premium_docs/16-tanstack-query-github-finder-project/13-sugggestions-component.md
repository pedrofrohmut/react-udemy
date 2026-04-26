# Suggestions Component

Now let's put the suggestions into a component. Again, we will leave the state in the main `UserSearch` component, but we will move the rendering logic into a new component called `DropdownSuggestions`. This will make the code cleaner and easier to read.

## Suggestio

Create a new file called `DropdownSuggestions.tsx` in the `src/components` directory and add the following code:

```tsx
import type { GitHubUser } from '../types';

type Props = {
  suggestions: GitHubUser[];
  show: boolean;
  onSelect: (username: string) => void;
};

const SuggestionDropdown = ({ suggestions, show, onSelect }: Props) => {
  if (!show || suggestions.length === 0) return null;

  return (
    <ul className='suggestions'>
      {suggestions.slice(0, 5).map((user) => (
        <li key={user.login} onClick={() => onSelect(user.login)}>
          <img src={user.avatar_url} alt={user.login} className='avatar-xs' />
          {user.login}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionDropdown;
```

We are using the `GitHubUser` type to type the `suggestions` prop. We are also using the `onSelect` prop to call the function when a suggestion is clicked. The `show` prop is used to determine whether to show the suggestions or not.

Now we will import this component into the `UserSearch` component and use it to render the suggestions.

```tsx
import SuggestionDropdown from './SuggestionDropdown';
```

Replace the whole suggestion expression in the return with the following:

```tsx
<SuggestionDropdown
  suggestions={suggestions || []}
  show={showSuggestions}
  onSelect={(selected) => {
    setUsername(selected);
    setShowSuggestions(false);

    if (submittedUsername !== selected) {
      setSubmittedUsername(selected);
    } else {
      refetch();
    }

    setRecentUsers((prev) => {
      const updated = [selected, ...prev.filter((u) => u !== selected)];
      return updated.slice(0, 5);
    });
  }}
/>
```

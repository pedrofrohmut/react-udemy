# Recent Searches

Let's add a recent searches feature to our app. This will allow users to see their previous searches and quickly access them again.

Open the `src/components/UserSearch.tsx` file and add a new state variable to store the recent searches:

```tsx
const [recentUsers, setRecentUsers] = useState([]);
```

Now let's add the following in the `handleSubmit` function to update the recent searches:

```tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const trimmed = username.trim();
  if (!trimmed) return;
  setSubmittedUsername(trimmed);

  setRecentUsers((prev) => {
    const updated = [trimmed, ...prev.filter((u) => u !== trimmed)];
    return updated.slice(0, 5);
  });
};
```

We are first, setting the trimmed username to the submitted username. Then we are updating the recent users by adding the trimmed username to the beginning of the array and removing any duplicates. Finally, we are slicing the array to keep only the last 5 searches. You can change this number to whatever you want.

## TypeScript Complaint

Since we are setting the recent users using a function, we need to tell TypeScript that the state is an array of strings. So let's update the state variable to:

```tsx
const [recentUsers, setRecentUsers] = useState<string[]>([]);
```

## Displaying Recent Searches

Now let's display the recent searches in the UI. We will add a new section below the the data in the `UserSearch` component.

```tsx
{
  recentUsers.length > 0 && (
    <div className='recent-searches'>
      <div className='recent-header'>
        <FaClock />
        <h3>Recent Searches</h3>
      </div>
      <ul>
        {recentUsers.map((user) => (
          <li key={user}>
            <button
              onClick={() => {
                setUsername(user);
                setSubmittedUsername(user);
              }}
            >
              <FaUser className='user-icon' />
              {user}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

This will display the recent searches in a list. Each item will be a button that, when clicked, will set the username and submitted username to the recent search. This will trigger the query to run again with the selected username.

## `RecentSearches` Component

Let's move the recent searches to it's own component. Create a new file at `src/components/RecentSearches.tsx` and add the following code:

```tsx
import { FaClock, FaUser } from 'react-icons/fa';

type RecentSearchesProps = {
  users: string[];
  onSelect: (username: string) => void;
};

const RecentSearches = ({ users, onSelect }: RecentSearchesProps) => {
  return (
    <div className='recent-searches'>
      <div className='recent-header'>
        <FaClock />
        <h3>Recent Searches</h3>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user}>
            <button onClick={() => onSelect(user)}>
              <FaUser className='user-icon' />
              {user}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
```

Then, import this component in the `UserSearch` component and use it to display the recent searches:

```tsx
import RecentSearches from './RecentSearches';
```

```tsx
{
  recentUsers.length > 0 && (
  <RecentSearches
          users={recentUsers}
          onSelect={(username) => {
            setUsername(username);
            setSubmittedUsername(username);
          }}
        />
  );
}
```

You may be asking why I'm not keeping the user state in the App component or why the recent searches state is not in the `RecentSearches` component. I want to discuss that a bit in the next lesson.

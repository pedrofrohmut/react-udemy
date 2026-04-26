# Save Recent Users In Local Storage

Right now, the recent users are stored in the component state. This means that if we refresh the page, the recent users will be lost. To persist the recent users across page refreshes, we can use local storage.

Open the `src/components/UserSearch.tsx` file and set the initial state of 'recentUsers' to the following:

```tsx
const [recentUsers, setRecentUsers] = useState<string[]>(() => {
  const stored = localStorage.getItem('recentUsers');
  return stored ? JSON.parse(stored) : [];
});
```

This will check if there are any recent users stored in local storage. If there are, it will parse them and set them as the initial state. If not, it will set the initial state to an empty array.

Import the `useEffect` hook at the top of the file:

```tsx
import { useState, useEffect } from 'react';
```

Add the following above the return statement:

```tsx
useEffect(() => {
  localStorage.setItem('recentUsers', JSON.stringify(recentUsers));
}, [recentUsers]);
```

Now search and they should persist across page refreshes. You can check the local storage in your devtools to see the recent users stored there.

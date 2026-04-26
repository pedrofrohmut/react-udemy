# Let's Chat About State

Alright, so I wanted to have a little discussion and some explanation on why I have my state the way it is.

You may be asking why I don't have the 'username' state in the main `App` component.

Keeping the state in `UserSearch` for now is a good idea because it’s a self-contained component, and there's no need to lift state up unless another component (like a header, sidebar, or router) needs to access or control it. Everything we need is in `UserSearch`, so it makes sense to keep the state there. The App component just provides a layout and a place for the `UserSearch` component to live. We could put this search component anywhere in the app, and it would still work.

#### Real-World Rule of Thumb

🔒 Single-use state (used only inside 1 component)? Keep it local
🔓 Shared or reused state across multiple components? Lift it up or manage it globally (Zustand, context, etc.)

Another thing that you may ask is why I have the `recentUsers` state in the `UserSearch` component. recentUsers (or recentSearches) should not live inside the <RecentSearches /> component — because that component doesn’t "own" the logic.

`RecentSearches` is a pure display + interaction component.

It does the following:

- Receives data (users)
- Notifies when a user is selected (onSelect)
- Optionally prefetches data

But it doesn't know:

- When a search was made
- What counts as "recent"
- How to update or persist the list

Think of it like this. `UserSearch` is the manager of search state.

`RecentSearches` is a widget that shows it and lets users interact.

You wouldn't have the widget manage the history — you just pass it
in.

This is called the "data down" pattern. The component that owns the data is the one that manages it. The component that displays the data is just a dumb component that doesn't know how to manage it.

Of course, there's a million ways that you could handle this. I don't want you to think that my way is the only way. This is just what I prefer for this particular project.

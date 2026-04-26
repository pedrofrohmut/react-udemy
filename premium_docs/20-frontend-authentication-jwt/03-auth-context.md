# Auth Context

We need to create a context for the authentication. This will allow us to manage the authentication state and provide it to the rest of the application. The is where we will set the access token and the user in state so that we can use it in the rest of the application.

Create a new file at `src/context/AuthContext.tsx` and add the following imports:

```typescript
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
```

## Context Type

We will use an interface to define the shape of the context:

```typescript
interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  user: { id: string; name: string; email: string } | null;
  setUser: (user: AuthContextType['user']) => void;
}
```

The auth context will have the following values:

- `accessToken` - The token we get from the server when we log in. This will be used to authenticate the user in the API requests.
- `setAccessToken` Set the access token in the state.
- `user` - The user object that we get from the server when we log in. This will be used to display the user information in the application.
- `setUser` - Set the user object in the state.

## Create the Context

Next, we will create the context itself. We will use the `createContext` function from React to create the context. We will also create a custom hook that will allow us to use the context in our components.

```typescript
const AuthContext = createContext<AuthContextType | undefined>(undefined);
```

We are setting the default value of the context to `undefined`. This is because we will be using the context in a provider, and we want to make sure that we are using the context correctly. If we try to use the context outside of a provider, we will get an error.

## Create the Provider

We need to create a provider that will allow us to use the context in our components. The provider will be a component that will wrap our application and provide the context to the rest of the application.

```typescript
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthContextType['user']>(null);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

The `AuthProvider` component will take the `children` prop, which will be the rest of the application. We are then passing the `accessToken`, `setAccessToken`, `user`, and `setUser` values to the context provider. This will allow us to use these values in the rest of the application.

## Create the Custom Hook

We will create a custom hook that will allow us to use the context in our components. This will make it easier to use the context in our components without having to use the `useContext` hook every time.

```typescript
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

Otherwise, we would need to bring in the `useContext` hook and the `AuthContext` every time we want to use the context. This will make it easier to use the context in our components.

Here is the entire `src/context/AuthContext.tsx` file:

```typescript
import { createContext, useContext, useState, type ReactNode } from 'react';

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  user: { id: string; name: string; email: string } | null;
  setUser: (user: AuthContextType['user']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthContextType['user']>(null);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
```

## Use The Provider

Now open the `src/main.tsx` and import the `AuthProvider` and wrap the `App` component with it:

```typescript
import { AuthProvider } from './context/AuthContext';
```

Add the wrapper:

```typescript
const rootElement = document.getElementById('app');
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>
      </QueryClientProvider>
    </AuthProvider>
  );
}
```

Now that our context is set up, we can use it in our components.

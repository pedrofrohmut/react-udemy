# Create A Project Type

We went over what types are in TypeScript a little while ago. Since we have a resource that we are working with called "projects", we are going to create a type for it. This is a good practice because it allows us to define the shape of the data that we are working with. This will help us catch errors early on and make our code more readable.

## Create A Type File

Create a new file at `app/types.ts`. This is where all of our custom types will go.

Add the following code:

```ts
export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  category: string;
  featured: boolean;
};
```

This matches the structure of our project data.

Now bring it into the project page/component:

```ts
import type { Project } from '~/types';
```

In the loader, we want it to return a promise with an object with the projects key and the value of the projects array.

```ts
export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  //...
}
```

Now where we destructure the loader data, we can use the Project type to type it:

```ts
const { projects } = loaderData as { projects: Project[] };
```

This will give us type safety when working with the projects data. We can now use the Project type to type the data that we are working with. This will help us catch errors early on and make our code more readable.

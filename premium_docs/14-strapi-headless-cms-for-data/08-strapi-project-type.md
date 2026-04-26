# Strapi Project Type

Now that the projects page is coming from Strapi, we need to handle the types for the data coming from strapi, which is a bit different than JSON server.

## Strapi Project Types

Let's create a TypeScript type for the Strapi Response and the project item. This will help us to type the response we get from Strapi and make our code more readable.

In the `src/types.ts` file, add the following:

```ts
export type StrapiResponse<T> = {
  data: T[];
};

export type StrapiProject = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  image?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
  url: string;
  date: string;
  category: string;
  featured: boolean;
};
```

We have a type for the response itself, which is just an array of items. We are using a generic type here. So we are saying it returns an array called `data`, which could be anything. We are also creating a type for the project attributes including the `documentId`. This will help us to type the response we get from Strapi and make our code more readable. The image has a URL and formats. The formats are optional, so we are using the `?` operator. The image can also be undefined, so we are using the `?` operator again.

We also need to add the `documentId` to the project type. This is the ID we will use to link to the individual project page. We will use this ID to fetch the individual project from Strapi.

```ts
export type Project = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  category: string;
  featured: boolean;
};
```

Now add the import in the `src/routes/projects/index.tsx` file:

```tsx
import type { Project, StrapiProject, StrapiResponse } from '~/types';
```

And add this type to the loader function:

```ts
const json: StrapiResponse<StrapiProject> = await res.json();
```

Now go to the projects page and you should see the projects fetched from Strapi and no TypeScript errors.


# Accessing The  Strapi API

By default, Strapi is secured. Even though we created a project type with some data, if we hit the following endponts, we will get a 403 error.

```bash
http://localhost:1337/api/projects
```

We need to go into the Strapi admin panel and set the permissions for the public role to allow access to the projects collection type.

1. Go to the Strapi admin panel at `http://localhost:1337/admin`.
2. Click on the "Settings" tab in the left sidebar.
3. Under the "Users & Permissions" section, click on "Roles".
4. Click on the "Public" role.
5. Scroll down to the "Permissions" section.
6. Expand the "Project" collection type and check the box for "find" and "findOne".
7. Click the "Save" button at the bottom of the page.
8. Now, you can access the projects data by hitting the following endpoints:

```bash

http://localhost:1337/api/projects
http://localhost:1337/api/projects/ovd6zlno3d647x8ljkds4so9
```

The second one contains the document ID of the project. This is what we use to access it. Not the regular ID.

## Strapi API URL

Let's add the Strapi API URL to our environment variables. Change it from the JSON Server URL to the new Strapi URL:

```env
VITE_API_URL=http://localhost:1337/api
```

# Integrating Our API

Now that we have our API set up, let's integrate it with our frontend. This means we will replace the JSON Server with our own API.

Open your frontend project in a text editor. Run the frontend in a separate terminal window. Do NOT run the json-server command. We will be using our own API instead. Keep the backend running in another terminal window.

When you run the frontend, you will see a "Failed to fetch" error. This is because the JSON Server endpoint was `http://localhost:5000/ideas`, so we needed to add a rewrite to the proxy in the `vite.config.js` file. Our API uses the `/api/ideas` endpoint, so we just need to remove the rewrite.

Open the `vite.config.js` file in the root of your frontend project and remove this line:

```javascript
        rewrite: (path) => path.replace(/^\/api/, ''),
```

Now restart the frontend server. You should see the ideas list again. This time, coming from our own API and not the JSON Server.

We are not out of the woods yet. One thing you may notice right away is that it is not limiting the number of ideas on the homepage. This is because we are not using the `limit` query parameter in our API. We will fix that in the next section.

#### Test Idea Details Page

Click on the "Ideas" link and that should work. Click on the "View Idea" to goto the single details page. That does not work. If you look at the URL it shows `http://localhost:3000/ideas/undefined`. This is because MongoDB uses "_id_" as the field name for the ID. We are using "id" in our frontend. We need to change that in our frontend code.

## Change the Type

First, let's change the field name in the types. Open the `src/types.ts` file and change the `id` field to `_id`:

```typescript
export interface Idea {
  _id: string;
  // ... other fields
}
```

Now change `id` to `_id` in the following files:

- `src/routes/index.tsx` (key prop)
- `src/routes/ideas/index.tsx` (key prop)
- `src/components/IdeaCard.tsx` (Link params)

#### Test Delete

Test the delete functionality. Click on the "Delete" button on an idea card. It should work as expected.

#### Test Add Idea

Open the "Add Idea" page. Fill in the form and click on the "Add Idea" button. It should work as expected.

#### Test Update Idea

Click on the "Edit" button on an idea card. It should take you to the edit page. Fill in the form and click on the "Update Idea" button. It should work as expected.

Now we just need to limit the ideas on the homepage. We will do that in the next lesson.

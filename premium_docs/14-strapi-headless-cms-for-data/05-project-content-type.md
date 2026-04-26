 # Content Types

In Strapi, content types are the building blocks of your data structure. They define the shape of the data you want to manage in your application. Each content type can have various fields, which can be of different types (e.g., text, number, date, media, etc.). We are going to have content types for projects and blog posts. We will start with projects.

Depending on when you watch this, the Strapi interface could change but don't let that alarm you. The core concepts will remain the same. The interface is just a way to interact with the core concepts.

As it is now, if you did not install sample data, you will have a button that goes to the content type builder. Click that.

You will already have a user type. This is for authentication and authorization. The way our project works is only the admins can create content. The users can only view the content. So we will not have a frontend login.

On the left side, click on "Create New Collection Type". For display name, put "Project". For the name, it will automatically be set to "projects". Click continue.

## Select Fields

Now we need our fields. We want the same fields we have in our JSON file, which are:

- title
- description
- image
- url
- date
- category
- featured

Create a new field for each of these. The field types are as follows:

- title: Text (required)
- description: Text (long text)
- image: Media (single media)
- url: Text
- date: Date
- category: Enumeration (select) Options: "Fullstack", "Frontend", "Design" Default: Frontend
- featured: Boolean Default: false

Click "Save" at the top right. This will take you back to the content type builder. You will see your new content type in the list.

## Creating Content

Now let's add some projects. Click on the "Content Manager" icon and then click "Create Content". You should see "Project" at the top of the list. Click on "Create New Entry". This will take you to the content creation page. You should see a form with the fields we created in the previous section. Fill in the form with the following data:

- title: DevDash
- description: A productivity dashboard for developers to track tasks, goals, and inspiration.
- image: Select the project-1 image from the course files or main git repo
- url: https://example.com
- date: 2025-02-01
- category: Fullstack
- featured: false

You can choose to "Save" or "Publish". If you save, the content will be saved as a draft and will not be visible on the frontend. If you publish, the content will be visible on the frontend. For this example, we will publish the content.

You created your first project! Now, let's create a few more projects:

- title: SnapFeed
- description: A photo-sharing app with uploads, a feed, and social features
- image: project-2.png
- url: https://example.com
- date: 2025-01-20
- category: Frontend
- featured: true

- title: NoteNest
- description: A note-taking app with categories and local storage support
- image: project-3.png
- url: https://example.com
- date: 2024-12-15
- category: Fullstack
- featured: true

- title: FitTrack
- description: A fitness tracker that logs workouts and progress visually
- image: project-4.png
- url: https://example.com
- date: 2024-11-05
- category: Fullstack
- featured: false

- title: CodeCritic
- description: A code snippet review tool with comments and upvotes
- image: project-5.png
- url: https://example.com
- date: 2024-10-12
- category: Frontend
- featured: false

- title: InspoQuote
- description: A daily inspiration quote generator with save/share options
- image: project-6.png
- url: https://example.com
- date: 2024-09-28
- category: Fullstack
- featured: false

- title: Blogify
- description: A minimalist blogging platform with Markdown and comments
- image: project-7.png
- url: https://example.com
- date: 2024-09-01
- category: Fullstack
- featured: false

That's all there is to adding projects. You would show this to your client.

Now we need to work on having the frontend access this data. In the next lesson, we will look at how to make the data accessible.

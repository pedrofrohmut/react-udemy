# What Is Markdown?

When we talk about building a blog, there are a ton of options. You can create your own backend server that saves posts to a database. You can use a headless CMS like Contentful or Strapi. You can use a static site generator like Gatsby or Next.js. You can use a blogging platform like WordPress or Ghost. One really simple and popular option for smaller blogs is to use Markdown files. It is a simple way to write blog posts in a simple syntax and then convert them to HTML.

Markdown is a lightweight markup language with plain text formatting syntax. It is designed so that it can be converted to HTML and many other formats. Markdown is often used to format readme files, for writing messages in online discussion forums and creating blog posts or other forms of informational writings.

We will be using Markdown for the blog post content. This means that we will write our blog posts in Markdown files and then convert them to HTML when we render them on the page. This is a really simple way to write blog posts and it allows us to keep the content separate from the metadata.

I just want to give you a really quick crash course on Markdown so you can get started writing your own blog posts.

Markdown files have a `.md` extension. You can write them in any text editor. VS Code has a preview mode that will show you what the Markdown will look like when it is converted to HTML. I actually use an extension called "Markdown Preview Enhanced" that gives me a live preview of the Markdown as I write it.

Here are some of the most common things you will use:

- Headers: `# Header 1`, `## Header 2`, `### Header 3`, etc.
- Lists: `- Item 1`, `- Item 2`, etc.
- Links: `[Link text](https://www.example.com)`
- Images: `![Alt text](https://www.example.com/image.jpg)`
- Bold: `**Bold text**`
- Italics: `*Italic text*`
- Code: `` `Code` ``
- Blockquote: `> Quote`

There are many more things you can do with Markdown, but these are the basics. You can find a more comprehensive guide at [https://www.markdownguide.org/](https://www.markdownguide.org/).

## How We Will Structure Our Blog

We are going to use a combination of JSON data and Markdown files for the blog. We will use JSON data for the index or metadata of the blog, which will contain metadata about each post, like the title, date, and excerpt. We will use Markdown for the actual content of the posts. This will allow us to keep the content separate from the metadata and make it easy to add new posts.

## React Markdown

We are going to use a library called `react-markdown` to convert Markdown to HTML. It is really simple to use. You just install it and then import it into your component. You can pass the Markdown as a string to the component and it will render it as HTML.

## Adding the Markdown Files

Attached to this lesson's downloads are a few markdown files. The name of the file must cooncide with the slug of the post. For example, if the slug is `my-first-post`, the file must be named `my-first-post.md`. We are going to put them in a folder called `posts` in the `app` directory.

Download the files and put them in the `app/posts` directory.

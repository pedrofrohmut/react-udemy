# Section Quiz

1. Why do images disappear after deployment on Render's free tier?

- [ ] The image format is not supported
- [ ] The images are stored in the frontend
- [ ] The file system is read-only and ephemeral 
- [ ] Strapi doesn't support file uploads on Render

Answer: C - The file system is read-only and ephemeral on free accounts

2. What is the benefit of using Cloudinary with a React + Strapi setup?

- [ ] It offers persistent image storage independent of your server
- [ ] It adds GraphQL support automatically
- [ ] Cloudinary provides SEO optimization
- [ ] It allows frontend-only image uploads

Answer: A - It offers persistent image storage independent of your server

3.  Where should Cloudinary credentials be placed in your project?

- [ ] In the React frontend .env file
- [ ] In a public config file in the frontend
- [ ] In the backend .env file of your Strapi project
- [ ] Hardcoded directly into the loader functions

Answer: C - In the backend .env file of your Strapi project

4. Which of the following should you add to Render's Environment Variables section during deployment?

- [ ] Your Vercel domain
- [ ] The contents of your Strapi .env file (e.g., database URL, Cloudinary keys)
- [ ] Only frontend build settings
- [ ] Your GitHub webhook token

Answer: B - The contents of your Strapi .env file (e.g., database URL, Cloudinary keys)

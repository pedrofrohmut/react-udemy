# Section Quiz

1. Why does the frontend show a network error after removing the proxy?

- [ ] MongoDB is not connected
- [ ] The frontend and backend are now on different domains, and CORS blocks the request
- [ ] The backend server is down
- [ ] Vite requires a proxy in production

Answer: B - The frontend and backend are now on different domains, and CORS blocks the request

2. What should be added to the allowedOrigins array in production?

- [ ] Only the backend domain
- [ ] Your GitHub repository URL
- [ ] The production frontend URL (e.g. from Vercel)
- [ ] The MongoDB connection string

Answer: C - The production frontend URL (e.g. from Vercel)

3.  Why do we deploy the backend first before the frontend?

- [ ] The backend takes longer to deploy
- [ ] The backend must be running for the frontend to function correctly
- [ ] Render requires more setup than Vercel
- [ ] Vercel needs MongoDB configured first

Answer: B - The backend must be running for the frontend to function correctly

4. What is the recommended first step before deploying your React frontend to Vercel?

- [ ] Push to GitHub
- [ ] Set up MongoDB Atlas
- [ ] Run npm run dev
- [ ] Run npm run build to check for errors


Answer: D - Run npm run build to check for errors

5. Where should you add your frontend domain in the backend to allow CORS?

- [ ] .env file
- [ ] In MongoDB settings
- [ ] server.js, inside the allowedOrigins array
- [ ] Vercel dashboard

Answer: C - server.js, inside the allowedOrigins array


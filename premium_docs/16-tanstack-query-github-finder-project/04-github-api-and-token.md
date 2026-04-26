# GitHub API & Token

GitHub has an extensive REST API that allows you to interact with nearly every aspect of the platform — including repositories, users, issues, and more.

In this project, we’ll focus on the Users API, specifically:

    - Searching for users by keyword
    - Fetching a single user’s profile
    - Getting a user’s public repositories

These endpoints are public, but they are rate-limited unless you authenticate.

### 🔗 Endpoints We’ll Use

Description Endpoint
Search users  https://api.github.com/search/users?q=bradtraversy
Get single user details https://api.github.com/users/bradtraversy
Get user repositories https://api.github.com/users/bradtraversy/repos

> You can replace "brad" or "bradtraversy" with any GitHub username or search term.

### ⚠️ Rate Limiting

    - Unauthenticated requests: 60 requests per hour.
    - Authenticated requests: Up to 5,000 requests per hour using a personal access token.

For testing, unauthenticated requests are fine. If you hit the limit, you’ll get a 403 error with a rate limit exceeded message.

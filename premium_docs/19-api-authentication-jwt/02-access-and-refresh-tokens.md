# Access & Refresh Tokens

We know what a JWT is — a token that contains a payload like a user ID and is signed by the server. But how do we use JWTs effectively for authentication?

A common but insecure approach (even in many tutorials, including some of my older ones) is to generate a **single long-lived token**, store it in `localStorage`, and send it with every request. While this technically works, it's not very secure. If someone manages to access your `localStorage` (via an XSS attack or physical access), they can steal that token and impersonate you until it expires — which might be 30+ days later.

## Using Access & Refresh Tokens (The Right Way)

A more secure approach is to use **two tokens**: an **access token** and a **refresh token**.

- **Access Token**: A short-lived token (e.g. 5 seconds to 15 minutes) that is used to authenticate API requests.
- **Refresh Token**: A long-lived token (e.g. 30 days) that is stored in a **HTTP-only cookie** and used to obtain new access tokens after expiration.

This setup gives us the best of both worlds:

- The access token is short-lived, so if it’s stolen, it becomes useless quickly. The shorter the lifespan, the more secure it is.
- The refresh token is stored in a cookie that **JavaScript can't access** (because it’s `HttpOnly`), protecting it from XSS attacks.
- Ideally, the access token would be stored in memory but if it has a very short lifespan, you can also store it in `localStorage` or `sessionStorage`. We will store it in memory in state.

Even if an attacker steals the access token from memory or `localStorage`, they **cannot refresh it** or keep the session alive without access to the refresh token.

You can also use the refresh token to log out users: just clear the cookie and they’ll need to re-authenticate.

## API Endpoints

Here's how our API will handle authentication:

- `POST /api/auth/register`  
  Create a new user and return both tokens.

  - `accessToken`: sent in the response body.
  - `refreshToken`: sent as an HTTP-only cookie.

- `POST /api/auth/login`  
  Authenticate a user and return both tokens (same as above).

- `POST /api/auth/refresh`  
  Issue a new access token using the refresh token.

  - The client **doesn't need to send anything manually** — the browser sends the cookie automatically.
  - The server verifies it and responds with a fresh access token.

- `POST /api/auth/logout`  
  Clear the refresh token cookie.
  - This ends the user’s ability to refresh access tokens.

## Where Should You Store the Access Token?

That’s up to you:

- **LocalStorage**: Easier, survives page reloads, but vulnerable to XSS.
- **Memory**: Safer, but access token is lost on page reload (so you’ll need to call `/refresh` on load).

Either way, your app is more secure than using a long-lived token without a refresh strategy.

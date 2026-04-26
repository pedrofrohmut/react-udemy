# Section Quiz

1. What happens to the access token when the user does a hard refresh?

- [ ] It's saved permanently
- [ ] It is regenerated
- [ ] It is lost from state
- [ ] It moves to cookies

Answer: C - It is lost from state

2. How will the app get a new access token after a hard refresh?

- [ ] From localStorage
- [ ] From a browser prompt
- [ ] From a session timeout handler
- [ ] By sending the refresh token (via cookie) to the /refresh endpoint

Answer: D - By sending the refresh token (via cookie) to the /refresh endpoint

3.  What is the role of the Axios interceptor in this setup?

- [ ] It redirects users after login
- [ ] It stores tokens in cookies
- [ ] It catches 401 responses and refreshes the token
- [ ] It validates form input

Answer: C - It catches 401 responses and refreshes the token

4. What is the main purpose of the Auth Context?

- [ ] To store the refresh token
- [ ] To manage route permissions
- [ ] To encrypt API responses
- [ ] To share access token and user across components


Answer: D - To share access token and user across components

5. Which values are stored in the AuthContext?

- [ ] Access token and user object
- [ ] Access token and refresh token
- [ ] User ID and password
- [ ] Access token and cookie data

Answer: A - Access token and user object


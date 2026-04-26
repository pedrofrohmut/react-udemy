# Section Quiz

1. What are the three parts of a JWT?

- [ ] Algorithm, Claims, Key
- [ ] Header, Payload, Signature
- [ ] Header, Body, Footer
- [ ] Issuer, Expiration, Role

Answer: B - Header, Payload, Signature

2. Why should you avoid putting sensitive data like passwords in the JWT payload?

- [ ] Because JWTs can't be read by the server
- [ ] Because the payload is Base64Url-encoded, not encrypted
- [ ] Because tokens expire too quickly
- [ ] Because the header blocks it

Answer: B - Because the payload is Base64Url-encoded, not encrypted

3.  What is the role of the signature in a JWT?

- [ ] To make the token smaller
- [ ] To encrypt the payload
- [ ] To verify the token hasn’t been tampered with
- [ ] To track login attempts

Answer: C - To verify the token hasn’t been tampered with

4. What is the primary purpose of an access token?

- [ ] To permanently identify a user
- [ ] To store frontend state
- [ ] To store the user's password
- [ ] To authenticate API requests for a short time

Answer: D - To authenticate API requests for a short time

5. Why is storing a long-lived token in localStorage a bad idea?

- [ ] It takes up too much space
- [ ] It makes your app slow
- [ ] It is vulnerable to XSS attacks
- [ ] It can't be read by the server

Answer: C - It is vulnerable to XSS attacks

6.  What type is used to relate an idea to a user in the Mongoose schema?

- [ ] String
- [ ] Number
- [ ] ObjectId
- [ ] UUID

Answer: C - ObjectId

7.  Where should the JWT token be sent from the client?

- [ ] Inside a query parameter
- [ ] In a JSON body
- [ ] In the Authorization header using Bearer <token> format
- [ ] As a cookie

Answer: C - In the Authorization header using Bearer <token> format


8.  What happens if no token is present in the request header?

- [ ] The request continues as normal
- [ ] A 401 Unauthorized error is thrown
- [ ] A 404 error is returned
- [ ] The server crashes

Answer: B - A 401 Unauthorized error is thrown


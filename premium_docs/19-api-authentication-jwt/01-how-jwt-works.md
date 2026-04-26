# How JWT (JSON Web Tokens) Works

Before we start, I just want to go over what JWT is and how it works. We will be using JWTs for both access tokens and refresh tokens. I'll talk about the difference in the next lesson. JWT stands for JSON Web Token. It is a compact, URL-safe means of representing claims to be transferred between two parties. So we can generate a token on the server and send it to the client. The client can then use this token to authenticate itself to the server. It is digitally signed, so we can verify that the token has not been tampered with. It is also base64 encoded, so it is safe to send over the internet. The token contains three parts: the `header`, the `payload`, and the `signature`.

<img src="../images/jwt-structure.png" alt="JWT Structure" width="600" />

- Header: The header contains information about how the token is signed and which algorithm is used. For instance, **HS256** is HMAC using **SHA-256**.

- Payload: The payload contains the claims and the actual data being transfered. There are 3 types of claims.

1. Registered Claims: (Optional but recommended). This can contain things like the expiration of the token, the issued at timestamp, the `sub`, which is usually the user id
2. Public Claims: These are custom claims that intend to be shared. This is the data like the user name, role, etc.
3. Private Claims: App-specific claims agreed on between parties — e.g., isAdmin: true.

🔒 Important: The payload is Base64Url-encoded, not encrypted. Anyone who has the token can decode and read the payload, so never put passwords or secrets in a JWT.

For the most part, you will at least have a user ID in the payload so that you can identify which user is which once they log in.

- Signature: Verifies that the token hasn't been altered and confirms the identity of the issuer.

With HS256, the server uses a shared secret key.

With RS256, the server signs with a private key, and clients verify with the public key.


## Storing JWTs

You can store the JWT in local storage or cookies. For better security, you should store it in an HTTP-only cookie. This way, the token is not accessible to JavaScript running in the browser, which helps prevent XSS attacks. However, you can still use local storage if you want to. Just be aware of the security implications.

## Why Use JWT?

JWT is a popular choice for authentication and information exchange because:

- **Compact**: JWTs are small in size, making them easy to transmit over the network.
- **Self-contained**: JWTs contain all the information needed to verify the token, reducing the need for multiple database queries.
- **Stateless**: JWTs are stateless, meaning the server does not need to store session information. This makes it easier to scale applications.
- **Cross-domain**: JWTs can be used across different domains, making them suitable for microservices architectures.
- **Secure**: JWTs can be signed and encrypted, ensuring the integrity and confidentiality of the data.
- **Standardized**: JWT is an open standard (RFC 7519) that is widely adopted and supported by many libraries and frameworks.

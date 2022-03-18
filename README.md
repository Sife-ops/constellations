# Equuleus

## Todo

- logging
- sign-in/out naming
- project name change to 'Equuleus'
- startup checks
- refactor token management ...

- remove rest endpoints OK
- refactor auth middleware OK
- remove ngrok OK

## Login Process

0. On application mount, client sends a POST request to server refresh endpoint.

1. If the refresh token contained in the HTTP cookie of the request exists and
is valid, the server responds with an HTTP cookie containing a refresh token AND
an object with an 'accessToken' property containing an access token.  Otherwise,
server responds with error.

2. If the client received tokens from the server, the application sets a local
storage item 'yu' with the value of the access token (the refresh token is
persisted in HTTP cookies and is automatically included in subsequent requests),
sets its 'loggedIn' state to true, and mounts the home component.  Otherwise,
'loggedIn' state remains false and login component mounts.

3. Client sends GraphQL login mutation with email, password, and 'remember'
parameters.

4. If credentials are good, server responds with an HTTP cookie containing a
refresh token (no access token object is sent). Otherwise, error.

5. If client received an HTTP cookie containing a refresh token, the application
triggers 'window.location.reload' and the same process happens again starting
from step 0.

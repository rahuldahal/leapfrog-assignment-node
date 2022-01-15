# React node coding assignment

Leapfrog Technology, Inc. assignment to use node.js to create a CRUD API and React.js to consume it.

# API Documentation

## Endpoints

### POST `/signup`

Expects `{email, password}` on `req.body` <br />

<hr />

On Success `{message: {accessToken, refreshToken}}` on `res.body` <br />
On Failure `{error}` on `res.body`

<hr />
<hr />

### POST `/signin`

Expects `{email, password}` on `req.body` <br />

<hr />

On Success `{message: {accessToken, refreshToken}}` on `res.body` <br />
On Failure `{error}` on `res.body`

<hr />
<hr />

### GET `/contacts`

Expects _Bearer [token]_ on `req.header.Authorization` <br />

<hr />

On Success `{message: {contacts}}` on `res.body` <br />
On Failure `{error}` on `res.body`

<hr />
<hr />

### POST `/contacts`

Expects _Bearer [token]_ on `req.header.Authorization` <br />
Expects `{name, phone, photograph}` on `req.body` <br />

<hr />

On Success `{message: {contacts}}` on `res.body` <br />
On Failure `{error}` on `res.body`

<hr />
<hr />

### PUT `/contacts`

Expects _Bearer [token]_ on `req.header.Authorization` <br />
Expects `{name, phone, photograph}` on `req.body` <br />

<hr />

On Success `{message: {contacts}}` on `res.body` <br />
On Failure `{error}` on `res.body`

<hr />
<hr />

### DELETE `/contacts`

Expects _Bearer [token]_ on `req.header.Authorization` <br />
Expects _\_id_ on `req.params` <br />

<hr />

On Success `{message: {contacts}}` on `res.body` <br />
On Failure `{error}` on `res.body`

<hr />
<hr />

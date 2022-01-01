# React node coding assignment

Leapfrog Technology, Inc. assignment to use node.js to create a CRUD API and React.js to consume it.

In this assignment, you are requested to create a simple `Contact manager` application. You are free to make any UI/UX decision. You can make use of `Bootstrap` if you want quick ready-made templates.

## API Requirements

1. Create `POST /signup` endpoint for user signup. The endpoint should take `email` and `password` as payload.
2. Create `POST /signin` endpoint for user signin. The endpoint should take same payload as `/signup`.
3. Create a `token` based authentication mechanism.
4. Create `GET /contacts` endpoint to fetch all contacts for user
5. Create `POST /contacts` endpoint to add a contact
6. Create `PUT /contacts/{contact_id}` to update a contact
7. Create `DELETE /contacts/{contact_id}` to delete a contact
8. All endpoints need to be accessible to only authenticated users.
9. You will have to create `users` and `contacts` table for storing details.
10. The mandatory fields for a contact are: Name, Phone, Photograph. You are free to choose all extra fields. (eg: address, email,...)
11. Resize the contact image/photograph to a desirable size for a contact and upload the photographs to any free cloud storage service of your choice.

## Application requirements

1. The application should have a login/signup page.
2. Show list of contacts for user once logged in.
3. The contacts main page should only be accessible once authenticated.
4. Allow user to add new contact. (eg: You can add a button to navigate to different `add contact form` page).
5. Allow user to edit existing contact detail.
6. Allow user to delete a contact.
7. Try to use a functional approach for creating React components using React Hooks.
8. Try to create a single reusable form component for adding/updating contacts.
9. Allow user to mark a contact as `favourite`.
10. The `favourite` contacts should always be listed at the top, in alphabetical order.

## Some good to haves.

1. Capability to categorize a contact's number. For example: different numbers for work, home, mobile, etc for the same contact.
2. Time bound token authentication. The access token needs to get expired after a few minutes, after which is regenerated using a refresh token.
3. Unit Tests.

## General objective of assignment

1. Build a simple CRUD application
2. Learn how FE and BE communicates with each other
3. Learn how `tokens` are handled in FE and BE

## What are we looking for

1. Ability to build a basic application
2. Code quality: readability, maintanability, reusability, etc etc
3. How you use the version control.

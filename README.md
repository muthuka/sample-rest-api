# sample-rest-api
Sample REST API - This project showcases how you can run a node.js based REST API backend service with simple operations and other details mentioned below.

## Setup

Create a .env file in the root folder and fill information as shown below:
```
PORT=5000
INSTANCE="Dev"
JWT_SECRET_KEY=really_important_secret_key
ROOT_PASSWORD=secret1234!
TOKEN_EXPIRATION_SECONDS=3600
```

## Postman

If you want to run the service and test it with Postman, look for the files under /postman folder and import them as a collection and also environment Local.

# Project Details

1. Supported CRUD Operations:
  - Implemented basic Create, Read, Update, and Delete (CRUD) operations for a resource, such as `User`. The resource should have at least the following fields:

- `id` (auto-incremented or UUID)
- `name`
- `email`
- `role`

Used an in-memory database such as a dictionary to store data.

2. Authentication:
  - Implemented token-based authentication using JWT (JSON Web Token).
  - Only authenticated users areallowed to perform CRUD operations.
  - Include token expiration and a middleware to validate the token before accessing the CRUD routes.

3. API Endpoints:
  The API exposed the following endpoints:
  - POST /login – To authenticate users and return a JWT token.
  - POST /users – Create a new user.
  - GET /users – Retrieve all users.
  - GET /users/:id – Retrieve a specific user by ID.
  - PUT /users/:id – Update a specific user's details by ID.
  - DELETE /users/:id – Delete a user by ID.

4. Development Best Practices:
  - Modular structure: Separating routes, controllers, and utilities
  - Environment Variables: Used dotenv package.
  - Error Handling: Implemented error handling and return proper HTTP status codes
  - Validation: Added input validation for creating and updating users (e.g., validate email format, required fields).
  - Logging: Implement basic logging to track errors and user activity using a logging library like winston.
  - Code Quality: Used linting with ESLint, consistent formatting

5. Additional
  - Wrote basic unit tests for CRUD operations and authentication using a testing framework like Jest.
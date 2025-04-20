# Backend Configuration Guide

This guide provides instructions to set up and run the backend for the Electron system.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [XAMPP](https://www.apachefriends.org/) for MySQL
- [npm](https://www.npmjs.com/) (comes with Node.js)
- `.env` file with the required environment variables

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd sistema/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure the `.env` file:
    Create a `.env` file in the root of the `backend` directory with the following variables:
    ```
    PORT=4000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=<your_mysql_password>
    DB_NAME=<your_database_name>
    ```

4. Set up the database:
    - Start XAMPP and ensure MySQL is running.
    - Import the database schema into MySQL.

## Running the Server

Start the backend server:
```bash
npm start
```

The server will be available at: [http://localhost:4000/graphql](http://localhost:4000/graphql)

## GraphQL Endpoints

### Query: `login`
Authenticate a user with their username or email and password.

**Example Query:**
```graphql
query {
  login(identifier: "user@example.com", password: "password123") {
     token
     user {
        id
        username
        email
        group_id
     }
  }
}
```

## Project Structure

- `src/models/`: Database models (e.g., `userModel.js`)
- `src/resolvers/`: GraphQL resolvers (e.g., `authResolver.js`)
- `src/schemas/`: GraphQL schemas (e.g., `authSchema.js`)
- `src/app.js`: Main application entry point

## Troubleshooting

- Ensure the database credentials in `.env` are correct.
- Verify that MySQL is running in XAMPP.

For further assistance, refer to the project documentation or contact the development team.  
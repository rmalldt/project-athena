# Athena App API

## Overview

Athena API allows users to perform the student authentication and view student information such as name, email, id, score and allows an access to history quiz games.

## Getting Started

### Prerequisites

- Node.js
- NPM
- A cloud-based database hosting platform such as [Supabase](https://supabase.com) or [Neon](https://console.neon.tech).

### Installation

1. Clone the repository.

   - Run `git clone [repo]`.

2. Navigate to the project directory.

   - Navigate to the project with `cd server`.

3. Install dependencies.

   - Run `npm install` to install all dependencies for the project.

4. Setup database.

   - Create a database instance on [Supabase](https://supabase.com) (or other cloud-based database hosting platform such as [Neon](https://console.neon.tech))

   - Retrieve the database URL connection string & copy it.

   - Create a `.env` file in the root directory with the following:

   ```
   DB_URL=<YOUR_DB_URL>
   ```

   - Replace `<YOUR_DB_URL>` with the database URL you copied.

   - Run `npm run setup-db` to setup the database.

5. Setup your port.

   - Add a `PORT` key assigned to port 3000 `.env` file.

   ```
   PORT=3000
   ```

6. Run the server.

   - Run `npm run dev` to run the server in development mode.

   - Run `npm start` to run the server in production mode.

### Database Schema

Please check `server/src/db/setup.sql` file.

## Running the app using Docker

### Provide the environment variables

In order to run the app using Docker, provide the ENV variable ENV DB_URL by setting <YOUR_DB_URL> (ENV PORT is already set to 3000) in the existing Dockerfile so they are accessible inside the application.

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
ENV PORT=3000
ENV DB_URL=<YOUR_DB_URL>
EXPOSE 3000
RUN npm run setup-db
CMD ["node", "src/index.js"]
```

### Build Docker Image and run the Container

1. Navigate to project directory `cd api`

2. Build the Image off of the Snacks API: `docker build -t <YOUR_DOCKER_USERNAME>/athena:0.0.1.RELEASE .`

3. Run a container: `docker run -d -p <HOST_PORT>:<CONTAINER_PORT> --name snacks-api <YOUR_DOCKER_USERNAME>/athena:0.0.1.RELEASE`

   - Choose your <HOST_PORT> value of your choice in order to access the container using the browser.
   - The <CONTAINER_PORT> value must match the `ENV PORT=3000` defined in the Dockerfile.

## API Endpoints

### BASE URL

`http://localhost:<PORT>/snacks`

### API Endpoints

| Route        | Response                                                           |
| ------------ | ------------------------------------------------------------------ |
| `/`          | Returns a JSON object describing the API.                          |
| `/users`     | User authentication route.                                         |
| `/dashboard` | Accepts a JSON object and uses it to create and store a new snack. |
| `/topics`    | Returns a JSON object representing the game topics.                |
| `/scores`    | Returns a JSON object representing user scores.                    |
| `/questions` | Returns a JSON object representing user game topics questions.     |

### Example Request

Use the following GET request to get api info - `GET /`

`curl -X GET http://localhost:<port>/`

A successful response will return a JSON response as follows:

```json
{
  "name": "Athena - Educational App",
  "description": "Educational application for Non-STEM subjects."
}
```

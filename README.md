# `UK Cathedral Plotter Backend`

A proof-of-concept (PoC) backend API that retrieves and serves UK cathedral data from Open Street Maps (OSM), including
locations and associated information such as denominations.

# File Structure

- `/src` Main source code
    - `controllers/` ~ Request/Response handlers
    - `middleware/` ~ Custom Express middleware
    - `models/` ~ Enums and Interfaces
    - `routes/` ~ API route definitions
    - `services/` ~ Business logic, commonly called by controllers
    - `utils/` ~ Utility functions and helpers
    - `app.ts` ~ Entry point
    - `express-server.ts` ~ Express server set up logic
- `/public/frontend/` ~ Static frontend files

# Running Locally

To run this application locally:

- Install `node_modules`

    ```bash
    npm install
    ```

- Create a `.env` file at the root of the project.

  ```bash
  vim .env
  ```

- Populate the env file. See example [below](#Env-Example).

- Run the server in development mode

  ```bash
  npm run dev
  ```

If you have the `uk-cathedral-plotter-frontend` running locally the two should now be able to communicate.

# Building For Production

To build this application for production:

```bash
npm run build
```

The build will be output to `dist`.

The static frontend files should be built and placed in `/public/frontend/`

# Env Example

```yaml
# The port number the server should run on (default 9212)
PORT=9212
```

# Testing

To run all tests:

```bash
npm run test
```

To run integration tests:

```bash
npm run test:integration
```

To run unit tests:

```bash
npm run test:unit
```

# Step-by-step: Locally running frontend and backend

## Backend

Clone the `uk-cathedral-plotter-backend` to your local system.

```bash
git clone git@github.com:r-rayns/uk-cathedral-plotter-backend.git
```

Change to the `uk-cathedral-plotter-backend` directory and install the dependencies.

```bash
cd uk-cathedral-plotter-backend
npm install
```

Create a `.env` file at the root of the project.

```bash
touch .env
```

Once created, copy and paste the following into the `.env` file:

```yaml
# The port number the server should run on (default 9212)
PORT=9212
```

Start the backend server in `development` mode:

```bash
npm run dev
```

## Frontend

Clone the `uk-cathedral-plotter-frontend` to your local system.

```bash
git clone git@github.com:r-rayns/uk-cathedral-plotter-frontend.git
```

Change to the `uk-cathedral-plotter-frontend` directory and install the dependencies.

```bash
cd uk-cathedral-plotter-frontend
npm install
```

Start the frontend:

```bash
npm start
```

The frontend should then be running on port 3000, and you should be able to open a browser to see the app running at:
`http://localhost:3000/`.
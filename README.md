# `UK Cathedral Plotter Backend`

A proof-of-concept (PoC) backend API that retrieves and serves UK cathedral data from Open Street Maps (OSM), including
locations and associated information such as denominations.

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
# The port number the serve should run on (default 9212)
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


# Cat-o-pedia

Simple app built with React and Node.js

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before installing and running the app, please create a .env file in the project's root directory and fill it with necessary information as shown below.

```
EXPRESS_PORT=3002,
DEFAULT_DATABASE=cats
DEFAULT_COLLECTION=cats
DEFAULT_URI=(database uri)
DB_USERNAME=(database username)
DB_PASSWORD=(database password)
```

If you wish to use a local database without login information, ommit (remove) the username and password.

**Please remember to add the exact same express port to the `proxy` section in the /client/package.json file.**

### Installing

Install server dependencies

```
npm install
```

Install client dependencies

```
cd client
npm install
```

### Running the app

Run server and client in the development mode

```
npm start
```

Run server in the development mode

```
npm run server
```

Run client in the development mode

```
npm run client
```

## Running the tests

```
npm run test:client
npm run test:server
```

## Deployment

To prepare a build ready for production

```
npm run build:client
```

For more information about production ready build please read [Create-react-app's README.md](/client/README.md)

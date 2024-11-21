# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/Jimmba/nodejs2024Q3-service.git
```

## Installing NPM modules

```
npm install
```

update `.env` if needed

posible LOG_LEVEL values:

FATAL = 0,
ERROR = 1,
WARN = 2,
INFO = 3,
DEBUG = 4,

log file rotation size should be specified in Kb:
LOG_FILE_SIZE=1024

## Running application

```
npm start
```

## Running container

Install docker compose and run it according to operating system (https://docs.docker.com/compose/install/)
`docker compose up --build` (Linux OS)

## Migrations

After starting container run `npm run migrations:up` to create tables in database

## Documentation

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Developing mode

You can run container in `watch` mode. Container should restart if there are some changes in `src` folder
Run `watch` mode according instructions according your OS (https://docs.docker.com/compose/how-tos/file-watch/)
`docker compose watch` (Linux OS)

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

# Angular-Authentication-Template

This repository demonstrates the use of [Auth0](https://auth0.com) within an Angular 6 application and a sample Node API with a protected route.

This project was created referencing [this repository](https://github.com/auth0-blog/angular-auth0-aside).

## Dependencies

- [Node.js with npm](http://nodejs.org), Node >= 6.9.0, npm >= 3
- [@angular/cli](https://github.com/angular/angular-cli), >= 6

## Installation

From the root directory, run the following commands to install dependencies for the server and client-side:

```
npm install
cd server
npm install
```

In your [Auth0 administrative portal](https://manage.auth0.com/), create a new client and API as well as a new user to login with. Add `http://localhost:4200/callback` to your Allowed Callback URLs and `http://localhost:4200` to your Allowed Web Origins and Allowed Logout URLs in your newly created Auth0 client.

Open `server/config.js.example` and remove `.example` from the file name. Then replace `[CLIENT_DOMAIN]` with your Auth0 domain.

Open `src/app/shared/auth/auth0-variables.ts.example` and remove `.example` from the file name. Then replace `[CLIENT_ID]` and `[CLIENT_DOMAIN]` with your Auth0 client ID and domain.

## Serving the project

```
npm start
```

Login with an authorized user. The `/dashboard` endpoint is only accessible when a user is logged in.

## Additional Information

[Angular Material](https://material.angular.io/) is fully integrated into this project. Material components can be added to the material module located at `src/app/material/material.module.ts`.

[Prettier](https://prettier.io/) is used to format files and is triggered when committing files with git. Configuration for Prettier is defined in `.prettierrc`.

# Angular-Authentication-Template

A sample Angular application which handles user authentication using [Auth0](https://auth0.com/).  This project was created referencing [this guide](https://auth0.com/blog/angular-2-authentication/).

## Installation
In your [Auth0 administrative portal](https://manage.auth0.com/), create a new client and API as well as a new user to login with.  Add ```http://localhost:4200/callback``` to your Allowed Callback URLs in your newly created Auth0 client. 


Install project depencies.

```
npm install
```

Under the ```src/app/shared``` directory, rename ```auth-config.ts.example``` to ```auth-config.ts``` and set your ```CLIENT_ID```, ```CLIENT_DOMAIN```, and ```AUDIENCE``` to the values provided in your Auth0 administrative portal.
## Usage
```
npm start
```

Login with an authorized user.  The ```/dashboard``` endpoint is only accessible when a user is logged in. 

## Additional Information
[JSON Placeholder](https://jsonplaceholder.typicode.com/) is used to make a dummy API call.  ```src/app/shared/data.service.ts``` show an example of calling this API with an Authorization header.

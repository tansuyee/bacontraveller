# Running locally
- Install postgres, and a database browser like TablePlus or Postico or just use the cli.
- Create a new database in postgres, for example `bt-dev`.
- Create a file `./server/config/config.json` to connect to the postgres process. The file should look like this: (You should only need to set up the "development" part, other fields don't matter)
```
{
  "development": {
    "username": <your postgres username>,
    "password": null,
    "database": <your database name, e.g. bt-dev>,
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  "test": {
    "username": "linhan",
    "password": null,
    "database": "bt-test",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": null,
    "database": "bt-prod",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  }
}
```
- Create another file `./server/config/secrets.js` that looks like this. The secret can be anything you want.
```
module.exports = {  
  jwtSecret: "anythingyouwanthere"
};
```
- Install dependencies with `yarn install`
- Ensure that your postgres database is running, e.g. `ps aux | grep postgres`, if not start it.
- Run `yarn add sequelize -g` to install sequelize globally, then run `sequelize db:migrate` in the project root directory to run the database migrations. You should verify that the tables have been created in the postgres db. This means that your db-server connection is working.
- Start server with `yarn start:dev`
- Verify that you can hit the users endpoint, and am able to create a user - refer to api documentation. That should mean that everything is working.

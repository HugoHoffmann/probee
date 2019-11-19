<h1 align="center">Welcome to probee 📝🐝</h1>
<p>
  A management project using adonisJs to backend and reactJs to frontend
</p>

## Install

```sh
cd server && yarn install 
```
```sh
cd client && yarn install
```

## Start Server

```sh
cd server

# setup `.env` file based on `.env.example`, you need to create an account on smtp server provider, like mailtrap.io and fill the fields in `.env` about it.
# If you want, there is a `docker-compose.yaml` file in root folder, running it a postgres's container and redis's container will be started.

adonis migration:run
adonis seed
adonio kue:listen
adonis serve --dev
```

## Start Client

```sh
cd client && yarn start
```

## Show your support

Give a ⭐️ if this project helped you!

***

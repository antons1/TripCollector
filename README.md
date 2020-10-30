# TripCollector

# How to run

Prerequisites:
- Docker (required for DB, useful for frontend and backend)
- Node/NPM (required for frontend)
- JRE (required for backend)
- Leiningen (required for backend)

The client can be run from `client` by running `npm start` (after `npm install`)

The server can be run from `server` either through a REPL (run `(run-app)` in `core.clj`) or build by running `./build.sh` and then run the built jar file by running `java jar ./target/trip-collector-0.1.0-SNAPSHOT-standalone.jar`

The database is run through docker, run `./start.sh` from `db`

Both the client and the server can also be run through docker, the server by running `./start.sh` in `server` and the client by running `docker run -itd --name trip-collector.frontend -p 1234:1234 hantonsen/trip-collector.frontend` (after running `docker build . -t hantonsen/trip-collector.frontend`)

Goal: Create an app that can collect data from different sources (strava, google photos, evernote, google maps etc.) and create an overview of a trip you have had by showing the data together in a cool way
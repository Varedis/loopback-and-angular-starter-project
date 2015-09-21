# Loopback and Angular Starter Project

This project aims to get you set up with Loopback and Angular.js quickly and easily.

## Importing Loopback routes as services

In order to ensure the angular knows about loopback routes and can create services from them, then the following command needs to be ran when making changes to a model

`lb-ng server/server.js client/js/services/lb-services.js`

# Loopback and Angular Starter Project

This project aims to get you set up with Loopback and AngularJS quickly and easily.

This project incorporates the following technology:

* Node.js
* Loopback
* MongoDB
* AngularJS
* Gulp

ES6 is also supported by the build process thanks to Babel.

## Installation

To get started with the project you will need to run the following commands.

    git clone https://github.com/Varedis/loopback-and-angular-starter-project.git
    cd loopback-and-angular-starter-project
    bower install
    npm install
    gulp
    nodemon
    
During local development, gulp needs to be run to compile your Scss files into css, so you probably want to run gulp in a seperate terminal so it can constantly be running in the background.

## Deploying and building for production

The starter application comes with a complete build process which performs the following actions:
 
* Converts html partials into angular templates.
* Minify and revision css. 
* Annotate, minify and revision javascript.
* Transform the index.html file to replace the includes.

To create a build of your application you can run the following command:

    gulp build
    NODE_ENV=production node
    
The build folder is not included in git. Ideally you will have the actual build being performed on your server when you deploy the application.

## Importing Loopback routes as services

It is possible to link the Angular application to your loopback api, this enables you to create services which interact with the API quickly and easily.

You can see an example of a created service at `client/js/services/auth.fct.js`.

In order to ensure the angular knows about all the available loopback routes, then the following command needs to be ran when you have made changes to a model

`lb-ng server/server.js client/js/services/lb-services.js`

This command creates the `lb-services` file which contains all the logic for contacting the API. You can then create your own services for interacting with your models.

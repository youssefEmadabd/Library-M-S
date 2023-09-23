# Library-M-S

A simple library management system

# Technologies used:

* node
* typescript
* express
* sequelize & postgres

# Architecture:

MVC with an additional service Module (without the view component of course)

# DB setup:

* install sequelize cli using npm install --save-dev sequelize-cli
* Create a new postgres database named library
* add .env file and copy the content of .env.example file
* update port and db connection attributes along with the url to your local machine's configuration
* run npx sequelize-cli db:migrate. This will create all the tables form the migration scripts

# Setting up the project:

* Run npm i
* run the app using npm run dev (this will run ts-node-dev which will rerun the project after each update)
* if the logger returns running on port <port> and a successful database connection message is logged, then the project is ready.

# testing flow:

* use the register admin api
* use the register borrower api
* both apis will return a token, you'll need the admin token for admin specific operations since there is a middleware that will not allow borrowers and will allow admins, also you would need to add the borrower token to the borrower specific apis (all arranged in folders in the postman collection that will be shared via email)
* afterwards, use the apis with the example body and query params written.

# Docker:

* To build the image, use docker build ./
* The image should now be built, you can use docker desktop to run the image or through the terminal using docker build.



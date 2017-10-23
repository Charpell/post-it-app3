# Post-it-app
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)
[![Build Status](https://travis-ci.org/Charpell/post-it-app.svg?branch=Chore/Feedback-Implementation)](https://travis-ci.org/Charpell/post-it-app) [![Coverage Status](https://coveralls.io/repos/github/Charpell/post-it-app/badge.svg?branch=Chore/Feedback-Implementation)](https://coveralls.io/github/Charpell/post-it-app?branch=Production-Build)
[![Code Climate](https://codeclimate.com/github/Charpell/post-it-app/badges/gpa.svg)](https://codeclimate.com/github/Charpell/post-it-app)

PostIt is a simple application that allows friends and colleagues create groups for notifications. The application is hosted online on [link](https://post-it-app35.herokuapp.com/)

## Key Features of this Application
+ Users can Sign Up
+ Users can Log in
+ Users can Create group
+ Users can add other users to a group
+ Users can send broadcast message to group members
+ Users can retrieve all the messages posted to groups the user belongs to
+ Users can get in app notification, email notification and sms notification depending on the message prioriy
+ Users can Sign in with Google account
+ Users can reset thier Password


## Requirements
+ Node Enviroment 
+ Git 
+ Firebase Database Account
+ Postman
+ Google Chrome 

## Local Installation Guide
* Clone the repo with the following command `git clone https://github.com/Charpell/post-it-app.git`
* Change into the directory `cd post-it-app`
* Run `npm install` to install all the dependencies needed to run the application
* To test the application, run `npm test`
* On your local machine Run `npm start` to start the server and visit `http://localhost:3000`

## Technologies
 * [ECMAScript 6](http://es6-features.org/): This is the newest version of JavsScript with new features such as arrow functions, spread and rest operators and many more.
 * [REACT](https://facebook.github.io/react/): REACT is a JavaScript framework developed by Facebook and it is used for developing web application. REACT is the 'VIEW' in the MVC architecture.
 * [FLUX](http://facebook.github.io/flux/): Flux is an architecture used for building stable and efficient web applications. Flux design is a unidirectional flow of data.
 * [Babel:](https://babeljs.io/)  Babel is used to transpile es6 down to es5.
 * [Webpack:](https://webpack.github.io/docs/what-is-webpack.html)  Webpack is used to bundle modules with dependencies and run mundane tasks.
 * [Axios:](https://www.npmjs.com/package/axios)  Axios is an http client library used in making API calls.
 * [Jest:](https://facebook.github.io/jest/) Jest is used to run tests.

 # Coding Style
- Airbnb 

# Language
- Javascript

## Limitations
+ Users cannot upload picture
+ Users cannot choose to accept invitation request
+ Users cannot leave a group
+ Users cannot delete a message when sent

## FAQ
### Is PostIt app free or do you plan to monetize it in future?
Yes its totally free and it will continue to be free

### How many end points are there currently?
Currently its 15

### Is PostIt app open source
Yes, and i encourage you to contribute to the project

### What if I want to use another port on my local machine?
That's easy. In the root of the project. create a file named .env and add the following line to it:
`PORT=<your_desired_port>`
where <your_desired_port> is the port you want to use. So, if you want to use port 9000, you will write:
`PORT=9000`


## Contributions
 Contributions are always welcome. If you are interested in enhancing the features in the project, follow these steps below:
 + Fork the project to your repository then clone it to your local machine.
 + Create a new branch and make features that will enhance it.
 + If the you wish to update an existing enhancement submit a pull request.
 + If you find bugs in the application, create a `New Issue` and let me know about it.
 + If you need clarification on what is not clear, contact me via mail [ebuka.umeh@andela.com](mailto:ebuka.umeh@andela.com)

## Author
    Ebuka Umeh

## License & Copyright
MIT © [Ebuka Umeh](https://github.com/Charpell)

Licensed under the [MIT License](LICENSE).

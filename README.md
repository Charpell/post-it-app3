## Post-it-app
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)
[![Build Status](https://travis-ci.org/Charpell/post-it-app.svg?branch=Chore/second-feedback-implementation)](https://travis-ci.org/Charpell/post-it-app)
[![Coverage Status](https://coveralls.io/repos/github/Charpell/post-it-app/badge.svg?branch=Chore%2Fsecond-feedback-implementation)](https://coveralls.io/github/Charpell/post-it-app?branch=Chore%2Fsecond-feedback-implementation) 
[![Code Climate](https://codeclimate.com/github/Charpell/post-it-app/badges/gpa.svg)](https://codeclimate.com/github/Charpell/post-it-app)
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)


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

## Coding Style
- Airbnb 

## Language
- Javascript

## Limitations
+ Users cannot upload their picture.
+ Users cannot choose to accept or reject an invitation request.
+ Users cannot leave a group.
+ Users cannot delete a message when sent

## FAQ
#### Is PostIt app free or do you plan to monetize it in future?
Yes its totally free and it will continue to be free

#### How many end points are there currently?
Currently its 15

#### Is PostIt app open source?
Yes, and i encourage you to contribute to the project

#### What if I want to use another port on my local machine?
That's easy. In the root of the project. create a file named .env and add the following line to it:
`PORT=<your_desired_port>`
where <your_desired_port> is the port you want to use. So, if you want to use port 9000, you will write:
`PORT=9000`



## Contributions
PostIt welcomes contributions in form of pull requests, as main purpose of open sourcing is to make it better and easier to use.

#### Reporting Bugs
 If you find bugs in the application, create a `New Issue` with additional data, like your node/npm version or snippet of code and let me know about it.

#### Contact
 If you need clarification on what is not clear, contact me via mail [ebuka.umeh@andela.com](mailto:ebuka.umeh@andela.com)

#### Pull requests
+ Fork the repository and create a branch from `develop`.
+ If you have added or changed existing code, add unit tests!
+ Ensure that all unit tests passes.
+ Check that your code lints (Eslint)

#### Style guide
+ Use es6 syntax only
+ Use semicolons
+ 2 space indention (no tabs)
+ Prefer single quote over double quote
+ Prefer template strings
+ 120 character length limit
+ Do not use console.log, etc in code (expect debugging locally)
+ Always add exact versions of packages 3.2.0 instead of ^3.2.0

#### Branch Naming Convention
A sample of the branch naming convention is found on the [Branch Naming wiki page](https://github.com/Charpell/post-it-app/wiki/Branch-Naming-Convention)

#### Commit Message Convention
A sample of the commit message convention is  found on the [Commit Message wiki page](https://github.com/Charpell/post-it-app/wiki/Commit-Message-Convention)

#### Pull Request Naming and Description Convention
A sample of the pull request naming and description convention on the [Pull Request Naming and Description wiki page](https://github.com/Charpell/post-it-app/wiki/Pull-Request-Naming-and-Description-Convention)

## Author
Ebuka Umeh

## License & Copyright
MIT © [Ebuka Umeh](https://github.com/Charpell)

Licensed under the [MIT License](LICENSE).

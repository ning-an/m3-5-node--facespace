'use strict';

const express = require('express');
const morgan = require('morgan');

const { users } = require('./data/users');
const { handleHomepage, handleProfilePage, handleSignin, handleName } = require('./data/handlers');



// declare the 404 function
const handleFourOhFour = (req, res) => {
  res.status(404).send("I couldn't find what you're looking for.");
};

// -----------------------------------------------------
// server endpoints
express()
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(express.urlencoded({ extended: false }))
  .set('view engine', 'ejs')

  // endpoints
  .get('/', handleHomepage)
  .get('/users/:_id', handleProfilePage)
  .get('/signin', handleSignin)
  .post('/getname', handleName)
  // a catchall endpoint that will send the 404 message.
  .get('*', handleFourOhFour)

  .listen(8000, () => console.log('Listening on port 8000'));

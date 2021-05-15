'use strict';
// users.js
/**
 * Configure the routes for the users API
 */
const express = require('express');
const router  = express.Router();
const users   = require('../controller/user.controller');

/* GET users listing. */

module.exports = function(app) {

  // Route for authentication
  router.post('/authenticate', users.tokenize);

  router.route('/')
    .get( users.authenticate, users.list )
    .post( users.create )
    
  router.route('/:userId')
    .get( users.authenticate, users.getOne )
    .delete( users.authenticate, users.isAdmin, users.delete )
    .put( users.authenticate, users.isAdmin, users.update );

  router.param('userId', users.userById);

  return router;
}

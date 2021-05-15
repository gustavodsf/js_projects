'use strict';
// cattle.js
/**
 * Configure the routes for the cattle API
 */
const express = require('express');
const router  = express.Router();

const users   = require('../controller/user.controller');
const production  = require('../controller/production.controller');

/* GET cattles listing. */

module.exports = function(app) {
  router.route('/create').post( users.authenticate, production.create );
  router.route('/list').get( users.authenticate, production.list );
  router.route('/delete/:id').get( users.authenticate, production.delete );
  return router;
}

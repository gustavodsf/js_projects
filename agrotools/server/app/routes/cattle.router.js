'use strict';
// cattle.js
/**
 * Configure the routes for the cattle API
 */
const express = require('express');
const router  = express.Router();

const users   = require('../controller/user.controller');
const cattle  = require('../controller/cattle.controller');

/* GET cattles listing. */

module.exports = function(app) {
  router.route('/create').post( users.authenticate, cattle.create );
  
  router.route('/edit').post( users.authenticate, cattle.edit );
  
  router.route('/delete/:id').get( users.authenticate, cattle.delete );
  router.route('/status/:id/:newStatus').get( users.authenticate, cattle.changeStatus );

  router.route('/list').get( users.authenticate, cattle.list );
  return router;
}

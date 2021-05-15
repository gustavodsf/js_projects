'use strict';
// user.controller.js
/**
 * Implementação do controller de usuário
 */
var _ = require('lodash');

module.exports = _.extend(
  this,
  require('./user/user.profile'),
  require('./user/user.authentication')
);

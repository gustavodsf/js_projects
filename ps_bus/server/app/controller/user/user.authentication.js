'use strict';
// user.authentication.js
/**
 * Implementação dos middlewares e controler relacionados a autenticação de usuário
 */
var User  = require('../../model/user.model');
var util  = require('../../tools/util');
var jwt   = require('jsonwebtoken');
var sec   = require('../../../config/auth');
var _     = require('lodash');

exports.isAdmin = function( req, res, next) {
  let user = req.userInToken;
  if (!user.admin) {
    let error = new Error('User is not admin');
    error.status = 403;
    util.resError(res, error);
  }
  else next();
}

exports.tokenize = function(req, res) {
  User.findOne({
    name: req.body.name,
  })
    .exec((err, user) => {
      if (err) util.resError(res, err);

      err = new Error('Authentication failed.');
      err.status = 403;
      err.success = false;
      if( !user ) util.resError( res, err );
      else if( !user.authenticate(req.body.password) ) util.resError(res, err);

      else {
        try {
          let userWithoutSecretFields = _.pick(user, ['name', '_id', 'admin']);
          let token = jwt.sign(userWithoutSecretFields, sec.secret, {
            expiresIn: "24h"
          });
          res.format({
            html() {
              res.render('user/detail', {
                token: token,
                user: userWithoutSecretFields
              });
            },
            json() {
              res.json({
                success: true,
                message: 'Authentication successfull',
                token: token,
                user: userWithoutSecretFields
              });
            }
          });
        }
        catch (err) {
          util.resError(res, err);
        }
      }
    });
};

exports.authenticate = function ( req, res, next ) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, sec.secret, function( err, decoded ) {
      if (err) util.resError( res, err);
      else {
        let userFields = decoded;
        User.findById(userFields._id)
          .select('-password -salt')
          .exec( (err, user) => {
            if (err) util.resError(res, err);
            else {
              req.userInToken = user;
              next();
            }
          });
      }
    });
  }
  else {
    let err = {
      status: 403,
      success: false,
      message: 'No token provided'
    }
    util.resError(res, err);
  }
};

'use strict';
// user.profile.js
/**
* Implementação da manipulação do Schema User
*/

const User = require('../../model/user.model');
const util = require('../../tools/util');
const _ = require('lodash');

// Middlewares
exports.userById = function(req, res, next, id) {
  User.findById(id).exec((err, user) => {
    if(err) util.resError(res, err);
    if( !user ) {
      let error = new Error(`Failed to find user ${id}`);
      util.resError(res, error);
    }
    req.user = user;
    next();
  });
};

/*
* Restful methods
*/

exports.list = function(req, res) {
  User.find().select('-password').sort('-created').exec(function(err, users) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (err) {
      util.resError(res, err);
    }
    else {
      res.format({
        html() {
          res.render('user/list',{
            users: users,
            token: token
          });
        },
        json() {
          res.json(users);
        }
      })
    }
  });
};

exports.create = function(req, res) {
  let user = new User();
  user.name = req.body.name;
  user.password = req.body.password;
  user.admin = req.body.admin || false;
  console.log(req.body);
  user.save(function(err) {
    console.log(user);
    if(err) {
      util.resError(res, err);
    }
    else {
      res.format({
        html() {
          res.render('user/detail', {user: user})
        },
        json() {
          res.json({message: "User successfully created"});
        }
      });
    }
  });
};

exports.getOne = function(req, res) {
  res.format({
    json() {
      let userObject = req.user.toObject();
      res.json( _.omit(userObject, ['password', 'salt']) );
    },
    html() {
      res.render('user/detail', {user:user});
    }
  })
}

exports.update = function(req, res) {
  let user = req.user
  user = _.extend(user, req.body);
  user.save((err) => {
    if(err) util.resError(res, err);
    else {
      res.format({
        json() {
          res.json({
            success: true,
            message: 'User successfully updated'
          });
        },
        html() {
          res.location('back');
        }
      })
    }
  });
}

exports.delete = function( req, res ) {
  let user = req.user;
  user.remove( (err) => {
    if (err) util.resError( res, err );
    else {
      res.json({
        success: true,
        message: "User successfully removed"
      });
    }
  });
}

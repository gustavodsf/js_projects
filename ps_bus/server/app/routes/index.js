'use strict';
/**
 * Configure the routes for the main pages
 */


const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bus Server' });
});

router.get('/signup', function( req, res ) {
  res.render('sign', {
    action: '/users',
    title: 'Sign Up',
  });
});

router.get('/signin', function( req, res ) {
  res.render('sign', {
    action: '/users/authenticate',
    title: 'Sign In'
  })
});

module.exports = router;

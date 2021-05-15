'suse strict';
// api.js
/**
 * Configure the routes for the Bus API
 */
const express   = require('express');
const router    = express.Router();
const workload  = require('../controller/workload.controller');
const users     = require('../controller/user.controller');

module.exports = function (app) {

  router.route('/generate/file')
    .get( users.authenticate, workload.generateFile);

  router.route('/file/is/ok')
    .get( users.authenticate, workload.fileIsOk)

  router.route('/list/:sended')
    .get( users.authenticate, workload.list )

  router.route('/create')
    .post( users.authenticate, workload.create );

  router.route('/update')
    .post( users.authenticate, workload.update );

  router.route('/create/str')
    .post( users.authenticate, workload.createStr );

  router.route('/update/str')
    .post( users.authenticate, workload.updateStr );

  router.route('/delete/:jornadaId')
    .delete( users.authenticate, workload.delete );
    //.delete( users.authenticate, users.isAdmin, workload.delete );

  router.param('jornadaId', workload.jornadaById);
  return router;
}

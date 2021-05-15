'use strict';
// users.js
/**
 * Configure the routes for the users API
 */
const express = require('express');
const router  = express.Router();

const users   = require('../controller/user.controller');
const model   = require('../controller/model.controller');

/* GET users listing. */

module.exports = function(app) {

  router.route('/fuel'  ).get( users.authenticate, model.listFuel   );
  router.route('/garage').get( users.authenticate, model.listGarage );
  router.route('/pump'  ).get( users.authenticate, model.listPump   );
  router.route('/oil'   ).get( users.authenticate, model.listOil    );
  router.route('/tank'  ).get( users.authenticate, model.listTank   );

  router.route('/load/funcionario').post( users.authenticate, model.loadFuncionario );
  router.route('/load/frota').post( users.authenticate, model.laodFrota );

  router.route('/update/funcionario/:date/:hora').get(users.authenticate, model.updateFuncionario);
  router.route('/update/frota/:date/:hora').get(users.authenticate, model.updateFrota);

  return router;
}

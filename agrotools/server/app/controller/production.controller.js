const ProductionModel = require('../model/production.model');
const util = require('../tools/util');
const moment = require('moment');

exports.create = function(req,res) {
  let productionJson = {'value': req.body.production, 'date': new Date() };
  console.log(productionJson)
  let production = new ProductionModel(productionJson);

  production.save((err) => {
    if(err){
      console.log(err);
      util.resError(res, err);
    }else {
      res.json({
        success:true,
        message: "The production was stored with success!"
      });
    }
  });
}

exports.list = function(req, res){
  ProductionModel.find().sort('-created').exec((err,productions) => {
    if(err) util.resError( res, err );
    else res.json( productions );
  });
}

exports.delete = function(req,res) {
  let id = req.param('id');
  ProductionModel.findByIdAndRemove(id, function (err, todo) {
    if (err){
      console.log(err);
      util.resError(res, err);
    } else{
      res.json({
        success:true,
        message: "The production was deleted with success!"
      });
    }
});
}

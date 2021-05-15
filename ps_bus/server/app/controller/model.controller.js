const util    = require('../tools/util');

const EmployeeModel    = require('../model/employee.model'  );
const FleetModel   = require('../model/fleet.model');
const FuelModel    = require('../model/fuel.model'  );
const GarageModel  = require('../model/garage.model');
const OilModel     = require('../model/oil.model'   );
const PumpModel    = require('../model/pump.model'  );
const TankModel    = require('../model/tank.model'  );
const DocUpdateModel = require('../model/doc.update.model'  )

exports.listFuel = function(req,res) {
  FuelModel.find({}).sort('code').exec(function(err, results){
    if(err) util.resError( res, err );
    else res.json( results );
  });
}

exports.listGarage = function(req,res) {
  GarageModel.find({}).sort('code').exec(function(err, results){
    if(err) util.resError( res, err );
    else res.json( results );
  });
}

exports.listOil = function(req,res) {
  OilModel.find({}).sort('code').exec(function(err, results){
    if(err) util.resError( res, err );
    else res.json( results );
  });
}

exports.listPump = function(req,res) {
  PumpModel.find({}).sort('code').exec(function(err, results){
    if(err) util.resError( res, err );
    else res.json( results );
  });
}

exports.listTank = function(req,res) {
  TankModel.find({}).sort('code').exec(function(err, results){
    if(err) util.resError( res, err );
    else res.json( results );
  });
}

exports.loadFuncionario = function(req,res) {
  EmployeeModel.remove({}, function (err) {
      if (err) return util.resError(res, err);
  });

  jsonArray = req.body.json_array
  for(i = 0 ; i < jsonArray.length ; i++){
    employee = new EmployeeModel(jsonArray[i]);
    employee.save((err) => {
      if(err) {
        console.log(err);
        util.resError(res, err)
      }
    })
  }
  DocUpdateModel.findOne({}, function (err, doc){
    if(doc == null){
      doc = new DocUpdateModel();
    }
    doc.emmployee_update = new Date();
    doc.save();
  });
  res.json( {"sucesso":"arquivo carregado com sucesso"} );
}


exports.laodFrota = function(req,res) {
  FleetModel.remove({}, function (err) {
    if (err) return util.resError(res, err);
  });
  jsonArray = req.body.json_array
  for(i = 0 ; i < jsonArray.length ; i++){
    fleet = new FleetModel(jsonArray[i]);
    fleet.save((err) => {
      if(err) util.resError(res, err);
    })
  }
  DocUpdateModel.findOne({}, function (err, doc){
    if(doc == null){
      doc = new DocUpdateModel();
    }
    doc.fleet_update = new Date();
    doc.save();
  });
  res.json( {"sucesso":"arquivo carregado com sucesso"} );
}

exports.updateFuncionario = function(req,res) {
  let dateArray = req.param("date").split("-");
  let hourArray = req.param("hora").split(":");
  let date = new Date(Date.UTC(dateArray[0],dateArray[1]-1,dateArray[2],hourArray[0],hourArray[1]));
  DocUpdateModel.findOne({}, function (err, doc){
    if(doc != null){
        if(date < doc.emmployee_update){
          EmployeeModel.find({}, function(err, result) {
            if (!err){
                res.json( {"json_array":result} );
            } else {throw err;}
          });
        }else{
          res.json( {"sucesso":"seu banco se encontra atualizado"} );
        }
    }else{
      res.json( {"sucesso":"não existe a tabela de funcionário no banco."} );
    }
  });
}

exports.updateFrota = function(req, res){
  let dateArray = req.param("date").split("-");
  let hourArray = req.param("hora").split(":");
  let date = new Date(Date.UTC(dateArray[0],dateArray[1]-1,dateArray[2],hourArray[0],hourArray[1]));
  DocUpdateModel.findOne({}, function (err, doc){
    if(doc != null){
      if(date < doc.fleet_update){
        FleetModel.find({}, function(err, result) {
          if (!err){
              res.json( {"json_array":result} );
          } else {throw err;}
        });
      }else{
        res.json( {"sucesso":"seu banco se encontra atualizado"} );
      }
    }else{
      res.json( {"sucesso":"não existe a tabela de frota no banco."} );
    }
  });
}

'use strict';
// workload.controller.js
/**
 * Implementação do controller da jornada
 */
const WorkloadModel = require('../model/workload.model');
const util    = require('../tools/util');
const mailer = require('../tools/mailer');
// Middlewares
exports.jornadaById = function( req, res, next, id) {
  WorkloadModel.findById(id).exec((err, workload) => {
    if(err) util.resError(res, err);
    if( !workload ) {
      let error = new Error(`Failed to find jornada ${id}`);
      util.resError(res, error);
    }
    req.workload = workload;
    next();
  });
};

// Restful methods
exports.list = function( req, res ) {
  let sended = (req.param('sended') === 'true')
  WorkloadModel.find({'sended': sended}).sort('-created').exec((err,workloads) => {
    if(err) util.resError( res, err );
    else res.json( workloads );
  });
}

exports.delete = function (req, res) {
  let workload = req.workload;
  workload.remove((err) => {
    if(err) util.resError(err);
    else res.json({
      success: true,
      message: "Workload removed with success"
    });
  });
};
exports.getOne = function( req, res ) {}

exports.generateFile = function(req, res){
   let text =  __dirname + '/../../public/stylesheets/style.css';
   let refuelList = []
   refuelList.push(1);
   WorkloadModel.find({'sended': false}).sort('-created').exec((err,workloads) => {
    if(err) util.resError( res, err );
    else {
      let fuelString  = _abastecimentoStringify(workloads);
      let today = util.formatDateToBrazilian();
      res.writeHead(200, {'Content-Type': 'application/force-download','Content-disposition':'attachment; filename=abastecimento_'+today+'.txt'});
      res.end( fuelString );
    }
   });
}

exports.create = function (req, res) {
  let workloadJson = req.body;
  _create(workloadJson,res);
};

exports.createStr = function (req, res) {
  let workloadJson = JSON.parse(req.body.json_array);
  _create(workloadJson,res);
};

function _create(workloadJson,res){
  let workload = new WorkloadModel(workloadJson)
  if(workloadJson["refuel"] != undefined && workloadJson["refuel"].length > 0){
    workload.save((err) => {
      if(err) util.resError(res, err);
      else {
        res.json({
          success:true,
          message: "The Jornada was stored with success!"
        });
      }
    });
  } else {
    let err = {
      status: 403,
      success: false,
      message: 'No refuel provided'
    }
    util.resError(res, err);
  }
}

exports.update = function (req, res){
  let workloadJson = req.body;
  _update(workloadJson,res);
};

exports.updateStr = function (req, res){
  let workloadJson = JSON.parse(req.body.json_array);
  _update(workloadJson,res);
};


function _update(workloadJson,res){
  let workload = new WorkloadModel(workloadJson);
  if(workloadJson["refuel"] != undefined && workloadJson["refuel"].length > 0){
    WorkloadModel.findById(workload._id, function (err, workloadDB) {
      workloadDB.open       = workload.open;
      workloadDB.refuel     = workload.refuel;
      workloadDB.oil        = workload.oil;
      workloadDB.close      = workload.close;
      workloadDB.not_sended = workload.not_sended;
      workloadDB.save(function (err) {
          if (err) util.resError(res, err);
          else{
            res.json({
              success:true,
              message: "The Jornada was edited with success!"
            });
          }
        })
    })
  } else {
    let err = {
      status: 403,
      success: false,
      message: 'No refuel provided'
    }
    util.resError(res, err);
  }
}

function _abastecimentoStringify(workloads){
  let refuelList = [];
  let oilList = [];
  for( let i = 0 ;  i < workloads.length; i++){
    refuelList = refuelList.concat(workloads[i].refuel)
    oilList = oilList.concat(workloads[i].oil);
  }

  oilList.sort(util.refuelAscedingBusNumber);
  refuelList.sort(util.refuelAscedingBusNumber);

  for (let j = oilList.length -1 ; j > -1; j--){
    let idx = 0;
    idx = _findRefuelForOilReposition(refuelList, oilList[j]);
    refuelList[idx]['reposition']= oilList[j]['amount'];
  }

  refuelList.sort(util.refuelAscendingOrder);
  let str = "";
  for(let i = 0 ; i < refuelList.length; i++){
    str = str + util.refuel2String(refuelList[i])+'\n';
  }
  return str;
}

function _findRefuelForOilReposition(refuelList, oilReposition){
  for( let  i = 0 ; i <  refuelList.length; i++ ){
    refuelList[i].reposition = 0;
    if(oilReposition.bus_number == refuelList[i].bus_number){
      if((refuelList[i].time.getTime() - oilReposition.time.getTime() < 0) || oilReposition.bus_number != refuelList[i+1].bus_number){
        return i;
      }
    }
  }
}

exports.fileIsOk = function(req, res){
  WorkloadModel.find({'sended': false}).sort('-created').exec((err,workloads) => {
    if(workloads.length > 0){
      workloads.forEach((workload, idx) =>{
      workload.sended = true;
       //save model to MongoDB
      workload.markModified('alter');
      WorkloadModel.findOneAndUpdate({_id:workload._id},{ $set: {sended: true}}, {upsert:true}, function(err, effected, raw){});
      });
      res.json({
        success:true,
        message: "The Jornada was closed with success!"
      });
    }else{
      res.json({
        success:true,
        message: "Don't have Jornada to close!"
      });
    }
  });
};

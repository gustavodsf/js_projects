'use strict';
// user.js

/**
* Imports
*/
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const Const     = require('../../config/const');
const util      = require('../tools/util');
const Float     = require('mongoose-float').loadType(mongoose, 3);

const employeeModel = require('./employee.model');
const fleetModel    = require('./fleet.model');
const garageModel    = require('./garage.model');
const pumpModel    = require('./pump.model');
const tankModel    = require('./tank.model');
const fuelModel    = require('./fuel.model');
const oilModel     = require('./oil.model');

/**
* Jornada Schema definition
*/
let workloadSchema = new Schema({
    open:{
        stick_mesaure:{
            type: Number,
            required: true,
            default: 0
        },
        date:{
            type: Date,
            required: true,
            default: Date
        },
        pump_position:{
            type: Number,
            required: true,
            default: 0
        },
        registration:{
            type: Number,
            required: true,
            default: 0
        },
        motor_oil:{
            type: Number,
            required: true,
            default: 0
        }
    },
    refuel:[{
        bus_number:{
            type:  Number,
            required: true,
            default: 0
        },
        driver_registration:{
            type: Number,
            required: true,
            default: 0
        },
        odometer:{
            type: Number,
            required: true,
            default: 0
        },
        fuel:{
            type: Float,
            required: true,
            default: 0
        },
        time : {
            type : Date,
            default: Date.now
        },
        garage : {
         type: String,
         required: true,
         default: "Não Informado"
        },
        pump : {
            type: String,
            required: true,
            default: "Não Informado"
        },
        tank : {
            type: String,
            required: true,
            default: "Não Informado"
        },
        fuel_type : {
            type: String,
            required: true,
            default: "Não Informado"
        },
        reposition:{
            type: Number,
            required: true,
            default: 0
        },
    }],
    oil:[{
        bus_number:{
            type:  Number,
            required: true,
            default: 0
        },
        amount:{
            type: Float,
            required: true,
            default: 0
        },
        garage : {
         type: String,
         required: true,
         default: "Não Informado"
        },
        pump : {
            type: String,
            required: true,
            default: "Não Informado"
        },
        tank : {
            type: String,
            required: true,
            default: "Não Informado"
        },
        fuel_type : {
            type: String,
            required: true,
            default: "Não Informado"
        },
        time : {
            type : Date,
            default: Date.now
        }
    }],
    close:{
        stick_mesaure:{
            type: Number,
            required: true,
            default: 0
        },
        pump_position:{
            type: Number,
            required: true,
            default: 0
        },
        motor_oil:{
            type: Number,
            required: false,
            default: 0
        },
        date:{
            type: Date,
            required: true,
            default: Date
        },
        fuel_error:{
            type: Boolean,
            required: true,
            default: false
        },
        oil_error:{
            type: Boolean,
            required: true,
            default: false
        }
    },
    sended: {
        type: Boolean,
        required: true,
        default: false
    }
}, { strict: false });

workloadSchema.pre('validate', function(next) {
  if (!this.exportada) {
      this.exportada = false;
  }
  next();

});

workloadSchema.pre('save', function(next) {
  let workload = this;
  let validationPromises = [];

  //Date validation
  if(workload["open"]["date"] > workload["close"]["date"]){
    validationPromises.push(Promise.reject(new Error("A data de encerramento da jornada deve ser posterior a data de abertura")));
  }

  //Pump worker validation
  validationPromises.push(new Promise(function(resolve, reject){
    employeeModel.find({}).where("registration").equals(workload["open"]["registration"]).exec(function(err, employees){
      if(!err){
        if(employees.length > 0){
          resolve();
        }else{
          reject(new Error("Não existe bombeiro com a matrícula " + workload["open"]["registration"]));
        }
      }else{
        reject(next(new Error(workload)));
      }
    });
  }));

  //Refuel
  for(let i=0; i < workload["refuel"].length; i++){
    //Date validation

    if(workload["refuel"][i]["time"] < workload["open"]["date"]
      || workload["refuel"][i]["time"] > workload["close"]["date"]){
      validationPromises.push(Promise.reject(new Error("A data do abastecimento deve ser posterior a data de abertura da jornada e anterior a data de encerramento.")));
    }

    //Bus validation
    validationPromises.push(new Promise(function(resolve, reject){
      fleetModel.find({}).where("bus_number").equals(workload["refuel"][i]["bus_number"]).exec(function(err, fleet){
        if(!err){
          if(fleet.length > 0){
            if(fleet[0].tank_capacity >= workload["refuel"][i]["fuel"]){
              resolve();
            }else{
              reject(new Error("Quantidade de combustível informada supera a capacidade to tanque do ônibus " + workload["refuel"][i]["bus_number"]));
            }
          }else{
            reject(new Error("O ônibus informado não existe"));
          }
        }else{
          reject(new Error(workload["refuel"][i]));
        }
      });
    }));

    //Bus driver validation
    validationPromises.push(new Promise(function(resolve, reject){
      employeeModel.find({}).where("registration").equals(workload["refuel"][i]["driver_registration"]).exec(function(err, employees){
        if(!err){
          if(employees.length > 0){
            resolve();
          }else{
            reject(new Error("Não existe motorista com a matrícula " + workload["refuel"][i]["driver_registration"]));
          }
        }else{
          reject(new Error(workload["refuel"][i]));
        }
      });
    }));

    //Odometer validation
    validationPromises.push(new Promise(function(resolve, reject){
      odometroUltimoAbastecimento(workload, workload["refuel"][i]["bus_number"], function(lastOdometer){
        if(lastOdometer > workload["refuel"][i]["odometer"]){
          reject(new Error("Odomêtro inferior ou igual a um anteriormente informado para o ônibus " + workload["refuel"][i]["bus_number"]));
        }else if(lastOdometer > 0 && workload["refuel"][i]["odometer"] - lastOdometer > 1200){
          console.log(lastOdometer);
          reject(new Error("A diferença entre o odomêtro atual e o último informado não pode ser maior do que 1200 Km"))
        }else{
          resolve();
        }
      });
    }));

    //Garage validation
    validationPromises.push(new Promise(function(resolve, reject){
      garageModel.find({}).where("code").equals(workload["refuel"][i]["garage"]).exec(function(err, garages){
        if(!err){
          if(garages.length > 0){
            resolve();
          }else{
            reject(new Error("Não existe garagem com código " + workload["refuel"][i]["garage"]));
          }
        }else{
          reject(new Error(workload["refuel"][i]));
        }
      });
    }));

    //Pump validation
    validationPromises.push(new Promise(function(resolve, reject){
      pumpModel.find({}).where("code").equals(workload["refuel"][i]["pump"]).exec(function(err, pumps){
        if(!err){
          if(pumps.length > 0){
            resolve();
          }else{
            reject(new Error("Não existe bomba com código " + workload["refuel"][i]["pump"]));
          }
        }else{
          reject(new Error(workload["refuel"][i]));
        }
      });
    }));

    //Tank validation
    validationPromises.push(new Promise(function(resolve, reject){
      tankModel.find({}).where("code").equals(workload["refuel"][i]["tank"]).exec(function(err, tanks){
        if(!err){
          if(tanks.length > 0){
            resolve();
          }else{
            reject(new Error("Não existe tanque com código " + workload["refuel"][i]["tank"]));
          }
        }else{
          reject(new Error(workload["refuel"][i]));
        }
      });
    }));

    //Fuel type validation
    validationPromises.push(new Promise(function(resolve, reject){
      fuelModel.find({}).where("code").equals(workload["refuel"][i]["fuel_type"]).exec(function(err, fuels){
        if(!err){
          if(fuels.length > 0){
            resolve();
          }else{
            reject(new Error("Não existe combustível com código " + workload["refuel"][i]["fuel_type"]));
          }
        }else{
          reject(new Error(workload["refuel"][i]));
        }
      });
    }));
  }

  //Oil
  for(let i=0; i < workload["oil"].length; i++){
    //Date validation
    if(workload["oil"][i]["time"] < workload["open"]["date"]
      || workload["oil"][i]["time"] > workload["close"]["date"]){
      validationPromises.push(Promise.reject(new Error("A data do abastecimento deve ser posterior a data de abertura da jornada e anterior a data de encerramento.")));
    }

    //Bus validation
    validationPromises.push(new Promise(function(resolve, reject){
      fleetModel.find({}).where("bus_number").equals(workload["oil"][i]["bus_number"]).exec(function(err, fleet){
        if(!err){
          if(fleet.length > 0){
            resolve();
          }else{
            reject(new Error("O ônibus informado não existe"));
          }
        }else{
          reject(new Error(workload["oil"][i]));
        }
      });
    }));

    //Garage validation
    validationPromises.push(new Promise(function(resolve, reject){
      garageModel.find({}).where("code").equals(workload["oil"][i]["garage"]).exec(function(err, garages){
        if(!err){
          if(garages.length > 0){
            resolve();
          }else{
            reject(new Error("Não existe garagem com código " + workload["oil"][i]["garage"]));
          }
        }else{
          reject(new Error(workload["oil"][i]));
        }
      });
    }));

    //Pump validation
    validationPromises.push(new Promise(function(resolve, reject){
      pumpModel.find({}).where("code").equals(workload["oil"][i]["pump"]).exec(function(err, pumps){
        if(!err){
          if(pumps.length > 0){
            resolve();
          }else{
            reject(new Error("Não existe bomba com código " + workload["oil"][i]["pump"]));
          }
        }else{
          reject(new Error(workload["oil"][i]));
        }
      });
    }));

    //Tank validation
    validationPromises.push(new Promise(function(resolve, reject){
      tankModel.find({}).where("code").equals(workload["oil"][i]["tank"]).exec(function(err, tanks){
        if(!err){
          if(tanks.length > 0){
            resolve();
          }else{
            reject(new Error("Não existe tanque com código " + workload["oil"][i]["tank"]));
          }
        }else{
          reject(new Error(workload["oil"][i]));
        }
      });
    }));

    //Fuel type validation
    validationPromises.push(new Promise(function(resolve, reject){
      oilModel.find({}).where("code").equals(workload["oil"][i]["fuel_type"]).exec(function(err, fuels){
        if(!err){
          if(fuels.length > 0){
            resolve();
          }else{
            reject(new Error("Não existe óleo com código " + workload["oil"][i]["fuel_type"]));
          }
        }else{
          reject(new Error(workload["oil"][i]));
        }
      });
    }));
  }

  Promise.all(validationPromises).then(function(){
    next();
  }).catch(function(error){
    next(error);
  })
});

function _mountEmployeesMap(employees){
  let employeeMap = {}
  for(let i = 0; i < employees.length; i++){
    employeeMap[employees[i]["registration"]] = employees[i]["registration"];
  }
  return employeeMap;
}

function _mountFleetMap(fleet){
  let fleetMap = {}
  for(let i = 0; i < fleet.length; i++){
    fleetMap[fleet[i]["bus_number"]] = fleet[i];
  }
  return fleetMap;
}

function odometroUltimoAbastecimento(schema, bus_number, callback) {
  schema.constructor.find({"refuel.bus_number": bus_number})
    .sort({"refuel.time": -1})
    .limit(1)
    .exec((err, workloads) => {
      if(err){
        console.error(err);
      }else if(workloads.length > 0) {
        let odometer = 0;
        let time = 0;

        for(let i = 0; i < workloads[0].refuel.length; i++){
          if(workloads[0].refuel[i].bus_number == bus_number &&
             workloads[0].refuel[i].time > time){
            time = workloads[0].refuel[i].time;
            odometer = workloads[0].refuel[i].odometer;
          }
        }
        console.log(workloads[0].open.date);
        console.log(odometer);

        callback(odometer);
      }else {
        callback(0);
      }
    });
}

function refuel2String(workload, refuel) {

  let branch = util.leadingZero(3, refuel.garage );
  let prefix = util.leadingZero(7, refuel.bus_number);
  let date = util.formatDateToBrazilian(refuel.time);
  let hour = util.formatTimeFromDate(refuel.time);
  let liters = _assureThreeDecimalPlaces(refuel.fuel_type.toString() || refuel.fuel.toString() );
  liters = util.leadingZero(11, liters);

  let odometer = _assureThreeDecimalPlaces(refuel.odometer || 1);
  odometer = util.leadingZero(7, odometer);


  let tank = util.leadingZero(3, refuel.tank || 1);
  let pump = util.leadingZero(3, refuel.pump || 1);

  reposition = util.leadingZero(4, refuel.reposition);

  let line = util.leadingZero(10, '0');
  let driver = util.leadingZero(6, refuel.registration || workload.open.registration);

  let fuel_type = util.leadingZero(4, refuel.fuel_type);

  refuelStr = Const.empresa +
              branch+prefix+date+time +
              liters+odometer+tank +
              pump+reposition+line+driver +
              fuel_type;

   return refuelStr;
}

/**
 * Returns a string containing all the abastecimento of this jornada in the
 * export format, which is one line per abastecimento.
 * @method serialize
 * @return {string}  String containing all abastecimento
 */
workloadSchema.methods.serialize = function() {
  let refuelTxt = '';
  this.refuel.sort(_refuelDescendingOrder);
  this.oil.sort(_refuelAscendingOrder);
  for (let refuel of this.refuel) {
    refuelTxt += refuel2String(this, refuel) + '\n';
  }
  return refuelTxt;
}

/**
 * Query for the jornadas ready for exports
 * @method jornadasParaExportacao
 * @param  {Function}             callback callback to be executed after the Query
 */
workloadSchema.statics.workloadsParaExportacao = function(callback) {
  let today = new Date();
  let beforeYesterday = new Date();
  beforeYesterday.setDate( beforeYesterday.getDate() - 2);

  return this
    .where('close.date')
    .lt(today)
    .gt(beforeYesterday)
    .sort('-close.date')
    .exec(callback);
}

/**
 * Query to return all jornadas in the database
 * @method allJornadas
 * @param  {Function}  callback callback to be executed after the query
 */
workloadSchema.statics.allWorkloads = function(callback) {
  return this.find().exec(callback);
}

function _refuelDescendingOrder(ab1, ab2) {
    return util._refuelDescendingOrder(ab1,ab2);
}

function _refuelAscendingOrder(ab1, ab2) {
    return util.refuelAscendingOrder(ab1,ab2)
}

module.exports = mongoose.model('Workload', workloadSchema);

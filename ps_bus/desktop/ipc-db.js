const URL                = 'mongodb://127.0.0.1:27017/totem-vp';
const USER_PASSWORD      = "senhatotemvp123";
const USER_NAME          = "totem-vp";
const SERVER_ADDRESS     = "https://www.prosolutionsbi.com.br";

const ipc                = require('electron').ipcMain;
const mongoose           = require('mongoose');
const Float              = require('mongoose-float').loadType(mongoose, 3);
let   moment             = require('moment-timezone');
const Schema             = mongoose.Schema;
const basicSchema        = new Schema({}, { strict : false });
const request            = require('request');
require('ssl-root-cas').inject();

mongoose.connect(URL);

const configurationModel = require('./app/model/configuration.model');
const fleetModel         = require('./app/model/fleet.model');
const fuelModel          = mongoose.model('Fuel',     basicSchema);
const funcionarioModel   = require('./app/model/employee.model');
const garagensModel      = mongoose.model('Garage',   basicSchema);
const oilModel           = mongoose.model('Oil',      basicSchema);
const pumpModel          = mongoose.model('Pump',     basicSchema);
const tanksModel         = mongoose.model('Tank',     basicSchema);
const userModel          = require('./app/model/user.model');
const workloadModel      = require('./app/model/workload.model');
const DocUpdateModel     = require('./app/model/doc.update.model');

ipc.on('SYNCHRONOUS_GET_PUMP', function (event, arg) {
  pumpModel.find({}, function(err, docs) {
    if (!err){
      event.returnValue = docs
    } else {
      throw err;
    }
  });
});

ipc.on('SYNCHRONOUS_GET_FUEL', function (event, arg) {
  fuelModel.find({}, function(err, docs) {
    if (!err){
      event.returnValue = docs
    } else {
      throw err;
    }
  });
});

ipc.on('SYNCHRONOUS_GET_GARAGE', function (event, arg) {
  garagensModel.find({}, function(err, docs) {
    if (!err){
      event.returnValue = docs
    } else {
      throw err;
    }
  });
});

ipc.on('SYNCHRONOUS_GET_OIL', function (event, arg) {
  oilModel.find({}, function(err, docs) {
    if (!err){
      event.returnValue = docs
    } else {
      throw err;
    }
  });
});

ipc.on('SYNCHRONOUS_GET_TANK', function (event, arg) {
  tanksModel.find({}, function(err, docs) {
    if (!err){
      event.returnValue = docs
    } else {
      throw err;
    }
  });
});

ipc.on('SYNCHRONOUS_VALIDATE_REGISTRATION', function (event, arg) {
  funcionarioModel
    .where('registration').equals(arg)
    .select('full_name')
    .exec(function(err, result) {
        if(result.length == 0){
          event.returnValue = "";
        }else{
          event.returnValue = result[0];
        }
    });
});

ipc.on('SYNCHRONOUS_SAVE_WORKLOAD', function (event, workload) {
  workloadDB = new workloadModel();
  workloadDB.open = {};
  workloadDB.open.date = moment().tz("America/Sao_Paulo")._d;
  workloadDB.open.pump_position = parseFloat(workload["open"]["pumpPosition"]);
  workloadDB.open.motor_oil = workload["open"]["motorOil"];
  workloadDB.open.stick_mesaure = workload["open"]["stickMesaure"];
  workloadDB.open.registration = workload["open"]["registration"];
  workloadDB.save(function(err, workloadDB) {
    if (err){
      event.returnValue = "";
    }else{
      event.returnValue = workloadDB.id;
    }
  });
});

ipc.on('SYNCHRONOUS_VALIDATE_BUS_NUMBER', function (event, arg) {
  fleetModel
    .where('bus_number').equals(arg)
    .exec(function(err, result) {
        if(result.length == 0){
          event.returnValue = "";
        }else{
          event.returnValue = result[0];
        }
    });
});

ipc.on('SYNCHRONOUS_VALIDATE_FUEL', function (event, arg) {
  fleetModel
    .where('bus_number').equals(arg["busNumber"])
    .exec(function(err, result) {
        if(result.length == 0){
          event.returnValue = false;
        }else{
          event.returnValue = (result[0]);
        }
    });
});

ipc.on('SYNCHRONOUS_VALIDATE_ODOMETER', function (event, arg) {
  workloadModel.find({"refuel.bus_number": parseInt(arg.busNumber)}).sort({"refuel.time": -1}).limit(1).exec(function(err, result){
      if(err){
        callback(null);
      }else{
        refuel = null;
        if(result[0] != null){
          refuels = result[0]["refuel"];
          for(i=0; i < refuels.length ; i++){
            if(refuels[i]["bus_number"] == parseInt(arg.busNumber)){
                if(refuel == null){
                  refuel = refuels[i]
                }else{
                  if(refuel["time"] < refuels[i]["time"]){
                      refuel = refuels[i]
                  }
                }
            }
          }
          event.returnValue = refuel
        }else{
          event.returnValue = { odometer: 0};
        }
      }
  });
});

ipc.on('SYNCHRONOUS_SAVE_REFUEL', function (event, arg) {
  configurationModel.findOne({}).exec((err,result) => {
    if (err){
      event.returnValue = false;
    }else{
      refuel = {"bus_number" : parseInt(arg.busNumber),"driver_registration": parseInt(arg.registration),"odometer": parseInt(arg.odometer),"fuel": parseFloat(arg.amountFuel),"time": moment().tz("America/Sao_Paulo")._d,"garage":result.garage,"pump" : result.pump,"tank" : result.tank,"fuel_type" : result.fuel};
      workloadModel.findByIdAndUpdate(arg.idWorkload,{$push: {"refuel": refuel}},{'safe': true, 'upsert': true}, function(err) {
        if (err){
          event.returnValue = false;
        }else{
          event.returnValue = true;
        }
      });
      event.returnValue = true;
    }
  });
});

ipc.on('SYNCHRONOUS_SAVE_OIL', function (event, arg) {
  configurationModel.findOne({}).exec((err,configuration) => {
    if (err){
      event.returnValue = false;
    }else{
      oil = {"bus_number": arg.busNumber, "amount":  parseFloat(arg.amount), "garage": configuration.garage,"pump": configuration.pump,"tank": configuration.tank,"fuel_type": configuration.fuel,"time": moment().tz("America/Sao_Paulo")._d };
      workloadModel.findByIdAndUpdate(arg.idWorkload,{$push: {"oil": oil}},{'safe': true, 'upsert': true}, function(err) {
        if (err){
          event.returnValue = false;
        }else{
          event.returnValue = true;
        }
      });
      event.returnValue = true;
    }
  });
});

ipc.on('SYNCHRONOUS_GET_CONFIGURATION', function (event, arg) {
  configurationModel.findOne({}).exec((err,configuration) => {
     if (err){
      event.returnValue = "";
     }else{
      event.returnValue = configuration;
     }
  });
});

ipc.on('SYNCHRONOUS_END_WORKDAY', function (event, arg) {
  workloadModel.findOne({_id: arg.idWorkload}, function (err, result) {
    amountOil = 0;
    amountFuel = 0;

    if(result.oil.length > 0){
      for( let i=0; i < result.oil.length; i++){
        amountOil += result.oil[i].amount;
      }garagensModel
    }

    if(result.refuel.length > 0){
      for( let i=0; i < result.refuel.length; i++){
        amountFuel += result.refuel[i].fuel;
      }
    }
    let pumpResult =  0;
    if(parseFloat(arg.pumpPosition) >  result.open.pump_position){
        pumpResult = parseFloat(arg.pumpPosition) - result.open.pump_position
    }else{
      aux  = 10000000000 + parseFloat(arg.pumpPosition)
      pumpResult = aux - result.open.pump_position
    }
    
    let oilResult = parseFloat(arg.motorOil) - result.open.motor_oil;
    let pumpError = false;
    let oilError = false;

    if(amountFuel != pumpResult){
      pumpError = true;
    }

    if(amountOil != oilResult){
      oilError = true;
    }

    workloadModel.findByIdAndUpdate(arg.idWorkload,{$set: {"close.date":moment().tz("America/Sao_Paulo")._d,"close.stick_mesaure":parseInt(arg.stickMesaure),"close.pump_position":parseFloat(arg.pumpPosition),"close.motor_oil": parseInt(arg.motorOil),"close.fuel_error":pumpError,     "close.oil_error": oilError}},{'safe': true, 'upsert': true},function(err) {
      if (err){
        event.returnValue =  false;
      }else{
        event.returnValue =  true;
      }
    });

  });
});

ipc.on('SYNCHRONOUS_SIGIN', function (event, arg) {
  configurationModel.findOne({}).exec((err,result) => {
      if (err){
        event.returnValue =  false;
      }else{
        event.returnValue =  result.authenticate(arg);
      }
  });
});

ipc.on('SYNCHRONOUS_GARAGE', function (event, arg) {
   garagensModel.find({}).exec(function(err,garagens){
      if(err){
        event.returnValue = {};
      }else{
        event.returnValue = garagens;
      }
    });
});

ipc.on('SYNCHRONOUS_TANK', function (event, arg) {
  tanksModel.find({}).exec(function(err,tanks){
      if(err){
        event.returnValue = {};
      }else{
        event.returnValue = tanks;
      }
    });
});

ipc.on('SYNCHRONOUS_PUMP', function (event, arg) {
  pumpModel.find({}).exec(function(err,pump){
    if(err){
      event.returnValue = {};
    }else{
      event.returnValue = pump;
    }
  });
});

ipc.on('SYNCHRONOUS_FUEL', function (event, arg) {
  fuelModel.find({}).exec(function(err,fuel){
    if(err){
      event.returnValue = {};
    }else{
      event.returnValue = fuel;
    }
  });
});

ipc.on('SYNCHRONOUS_OIL', function (event, arg) {
  oilModel.find({}).exec(function(err,oil){
    if(err){
      event.returnValue = {};
    }else{
      event.returnValue = oil;
    }
  });
});

ipc.on('SYNCHRONOUS_SAVE_CONFIGURATION', function (event, arg) {
  configurationModel.findOne({}).exec((err,configuration) => {
     if (err){
      event.returnValue = false;
     }else{
      configuration.fuel   = arg.fuel
      configuration.tank   = arg.tank
      configuration.pump   = arg.pump
      configuration.oil    = arg.oil
      configuration.garage = arg.garage
      configuration.save();
      event.returnValue = true;
     }
  });
});

ipc.on('SYNCHRONOUS_CHANGE_PASSWORD', function (event, arg) {
  configurationModel.findOne({}).exec((err,configuration) => {
     if (err){
      event.returnValue = false;
     }else{
       configuration.password = configuration.hashsenha(arg);
       configuration.save();
       event.returnValue = true;
     }
  });
});

ipc.on('SYNCHRONOUS_CHANGE_PASSWORD', function (event, arg) {
  configurationModel.findOne({}).exec((err,configuration) => {
     if (err){
      event.returnValue = false;
     }else{
       configuration.password = configuration.hashsenha(arg);
       configuration.save();
       event.returnValue = true;
     }
  });
});

ipc.on('GET_AUTHENTICATION_TOKEN', function (event, arg) {
  let url = SERVER_ADDRESS+'/users/authenticate';
  let user = {
    name: USER_NAME,
    password: USER_PASSWORD
  };
  let options = {
    url: url,
    method: 'POST',
    json: user,
    Accept: 'application/json',
    rejectUnauthorized: false,
  };
  request(options, function(err, res, body) {
    if(body && body.success) event.returnValue = body.token;
    else if(body && !err) {
      event.returnValue = '';
    }
    else if(err) {
      event.returnValue = '';
    }
    else {
      event.returnValue = '';
    }
  })
});

ipc.on('SEND_WORKLOAD_NOT_SENEDED',function(event, arg){
  token = arg;
  workloadModel.find({sended: false})
  .sort({'_id': -1})
  .exec((err, workloads) => {
    if ( err ) callback(err, null);
    else {
      workloads.forEach((workload) => {
        if (workload) {
          _uploadWorkloadWithToken( token, workload, _jornadaUploadCallback );
        }
        else {
          event.returnValue = false;
        }
      });
    }
  });
  event.returnValue = true;
});

ipc.on('UPDATE_FLEET',function(event, arg){
  DocUpdateModel.findOne({}, function(err, result){
    if(!err){
      _updateCollectionWithToken( token, result.fleet_update, "FLEET", _updateCollectionCallback );
    }else{
      event.returnValue = false;
    }
  });
  event.returnValue = true;
});


ipc.on('UPDATE_EMPLOYEE',function(event, arg){
  DocUpdateModel.findOne({}, function(err, result){
    if(!err){
      _updateCollectionWithToken( token, result.emmployee_update, "EMPLOYEE", _updateCollectionCallback );
    }else{
      event.returnValue = false;
    }
  });
  event.returnValue = true;
});



function _uploadWorkloadWithToken( token, workload, callback ) {
  let url = SERVER_ADDRESS+'/workloads/create';
  let options = {
    url: url,
    method: 'POST',
    headers: {'x-access-token': token},
    json: workload,
    Accept: 'application/json',
    rejectUnauthorized: false,
  };
  request(options, function(err, res, body) {
    callback(err, body, workload);
  });
}

function _jornadaUploadCallback( err, res, workload ) {
  if(err) console.error(`Error: ${err.message}`);
  else if(res) {
    console.log(res);
    workload.sended = true;
    workload.save((err) => {
      if(err) console.error(err);
    });
  }
}

function _updateCollectionWithToken(token, date, type,  callback){
  let stringDate = convertDate(date);
  let stringHour = convertHour(date);
  let url = SERVER_ADDRESS+"/model";
  if(type == 'FLEET'){
    url = url + '/update/frota/';
  }else{
    url = url + '/update/funcionario/';
  }
  url = url + stringDate+'/'+stringHour;

  let options = {
    url: url,
    method: 'GET',
    headers: {'x-access-token': token},
    Accept: 'application/json',
    rejectUnauthorized: false,
  };

  request(options, function(err, res, body) {
    callback(err, body, type);
  });
}

function _updateCollectionCallback(err, res, type){
  if(res.indexOf("json_array") > 0){
    jsonArray = JSON.parse(res)["json_array"];
    if(type == 'FLEET'){
      fleetModel.remove({},function(err){
        if(err) console.log(err);
      })
    }else{
      funcionarioModel.remove({},function(err){
        if(err) console.log(err);
      })
    }

    for(i=0; i < jsonArray.length; i++){
      model = undefined;
      if(type == 'FLEET'){
        model = new fleetModel(jsonArray[i]);
      }else{
        model = new funcionarioModel(jsonArray[i]);
      }
      model.save();
    }

    DocUpdateModel.findOne({},function(err, result){
      if(type == 'FLEET'){
        result.fleet_update = new Date();
      }else{
        result.emmployee_update = new Date();
      }
      result.save();
    });
  }
}


function convertDate(date){
    let day = date.getDate();
    if (day.toString().length == 1)
      day = "0"+day;
    let month = date.getMonth()+1;
    if (month.toString().length == 1)
      month = "0"+month;
    let year = date.getFullYear();  
    return year+"-"+month+"-"+day;
}

function convertHour(date){
  let hour = date.getHours();
  if (hour.toString().length == 1)
    hour = "0"+hour;
  let minutes = date.getMinutes();
  if (minutes.toString().length == 1)
    minutes = "0"+minutes;
  return hour+":"+minutes;
}
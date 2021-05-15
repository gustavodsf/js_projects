'use strict';
// js
// Define Reusable function for the project
const fs = require('fs');
const Const     = require('../../config/const');
/**
 * Exports the methods in the file
 * @type {Object}
 */
module.exports = {
  resError,
  leadingZero,
  formatDateToBrazilian,
  formatTimeFromDate,
  writeTextToFile,
  getYesterdayDate,
  getDatePlusOneHour,
  refuel2String,
  refuelDescendingOrder,
  refuelAscendingOrder
};

/**
 * Used to handle errors when they ocour in the request lifetime
 * @method resError
 * @param  {request} res the request to respond with an error
 * @param  {Error} err The error to be sent in the response
 */
function resError(res, err) {
  res.status(err.status || 500);
  res.format({
    html: function() {
      res.render('error', {
        message: err.message,
        error: err
      });
    },
    json: function() {
      res.json({
        message: err.message,
        error: err
      });
    }
  });
};

/**
 * Add  the amount of leading zeros to the number on the second parameter
 * @method leadingZero
 * @param  {Number}    size   The size required size of the number
 * @param  {Number}    number The number which will follow the zeros
 * @return {String}           A String containing the number and the leading
 *                            zeros required
 */
function leadingZero(size, number) {
  let numberStr = "" + number || 0;
  let pad = "0";
  for(let i=1; i<size; i++) pad += "0";

  return pad.substring(0, pad.length - numberStr.length) + numberStr;
};

/**
 * Format the passed Date to the brazilian form
 * @method formatDateToBrazilian
 * @param  {Date}              date
 * @return {String}                 A string with the formated Date
 */
function formatDateToBrazilian(date=new Date()) {
  let Y = date.toISOString().substring(0,4);
  let M = date.toISOString().substring(5,7);
  let D = date.toISOString().substring(8,10);
  return `${D}/${M}/${Y}`;
};

/**
 * Format the Date to the HH:MM format
 * @method formatTimeFromDate
 * @param  {Date}           date The date from where the time will be extracted
 * @return {String}              A String with the time formated like HH:MM
 */
function formatTimeFromDate(date= new Date()) {
  return date.toTimeString().substring(0,5);
};

/**
 * Returns the yesterday date
 * @method getYesterdayDate
 * @return {Date}         Yesterday
 */
function getYesterdayDate() {
  let d = new Date();
  d.setDate( d.getDate() - 1 );
  return d;
}

  function getDatePlusOneHour(date) {
  date.setHours( date.getHours() + 1 );
  return date;
}

function _writeFileCallback(err) {
  if(err)
    console.error(err);
  else
    console.log('File saved with success');
};

/**
 * Write the text in the parameter to a new file in the /tmp folder named as the
 * second parameter
 * @method writeTextToFile
 * @param  {String}        text     The content of the file
 * @param  {String}        filename The name of the file
 */
function writeTextToFile(text, filename) {
  fs.writeFile("/tmp/"+filename, text, _writeFileCallback);
};

/**
 * Append the text in the parameter to a new file in the /tmp folder named as the
 * second parameter
 * @method writeTextToFile
 * @param  {String}        text     The content of the file
 * @param  {String}        filename The name of the file
 */
function appendTextToFile(text, filename) {
  fs.appendFile('/tmp/'+filename, text, _writeFileCallback);
}

function refuelAscendingOrder(ab1, ab2) {
  return ab1.time.getTime() - ab2.time.getTime();
}

function refuelDescendingOrder(ab1, ab2) {
  return ab2.time.getTime() - ab1.time.getTime();
}

function refuelAscedingBusNumber(ab1,ab2) {
  if (ab1.bus_number !=  ab2.bus_number){
    return ab1.bus_number - ab2.bus_number;
  }else{
    return ab1.time.getTime() - ab2.time.getTime();
  }
}

function refuel2String(refuel) {
  let branch = leadingZero(3, refuel.garage );
  let prefix = leadingZero(7, refuel.bus_number);
  let date = formatDateToBrazilian(refuel.time);
  let hour = formatTimeFromDate(refuel.time);
  let liters = _assureThreeDecimalPlaces(refuel.fuel.toString() );
  liters = leadingZero(11, liters);

  let odometer = leadingZero(7, refuel.odometer);


  let tank = leadingZero(3, refuel.tank || 1);
  let pump = leadingZero(3, refuel.pump || 1);

  let reposition = leadingZero(4, refuel.reposition);

  let line = leadingZero(10, '0');
  let driver = leadingZero(6, refuel.driver_registration);

  let fuel_type = leadingZero(4, refuel.fuel_type);

  return Const.empresa + 
              branch+prefix+date+hour +
              liters+odometer+tank +
              pump+reposition+line+driver+
              fuel_type;

}

function _assureThreeDecimalPlaces(field) {
  let integerPart = /(\d+)\.{0,1}/.exec(field);
  let decimalPart = /\.(\d{1,3})/.exec(field);
  if(decimalPart) {
    let decimal = decimalPart[1];
    let append = 3 - decimalPart[1].length;
    for(let i=0; i<append; i++) decimal = decimal+'0';
    return integerPart[1] + '.' + decimal;
  }
  else {
    return integerPart[1] + '.000';
  }
}
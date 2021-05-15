'use strict';

const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Frota
 */

 var FleetSchema = new Schema({
     car_model : {
         type: String,
         required: true,
         default: "Não Informado"
     },
     chassis_model : {
         type: String,
         required: true,
         default: "Não Informado"
     },
     chassis_brand : {
         type: String,
         required: true,
         default: "Não Informado"
     },
     car_plate : {
         type: String,
         required: true,
         default: "Não Informado"
     },
     bus_number : {
         type: String,
         required: true,
         default: "Não Informado"
     },
     car_brand : {
         type: String,
         required: true,
         default: "Não Informado"
     },
     tank_capacity : {
         type: Number,
         required: true,
         default: 0
     }
});

module.exports = mongoose.model('fleet', FleetSchema);

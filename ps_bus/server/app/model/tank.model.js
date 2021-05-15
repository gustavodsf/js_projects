'use strict';

const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Tanque
 */

 var tankSchema = new Schema({
     name : {
         type: String,
         required: true,
         default: "Não Informado"
     },
     code : {
         type: String,
         required: true,
         default: "Não Informado"
     },
     oil_type : {
         type: String,
         required: true,
         default: "Não Informado"
     },
     tank_capacity : {
         type: String,
         required: true,
         default: "Não Informado"
     },
     type : {
         type: String,
         required: true,
         default: "Não Informado"
     }
});

module.exports = mongoose.model('Tank', tankSchema);

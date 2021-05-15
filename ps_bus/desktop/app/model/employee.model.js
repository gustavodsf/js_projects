'use strict';

const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Frota
 */

 var employeeSchema = new Schema({
     registration : {
         type: String,
         required: true,
         default: "Não Informado"
     },
     full_name : {
         type: String,
         required: true,
         default: "Não Informado"
     },
     admission_date : {
         type: String,
         required: true,
         default: "Não Informado"
     }
});

module.exports = mongoose.model('Employee', employeeSchema);

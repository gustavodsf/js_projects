'use strict';

const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

/**
 * oil
 */

 var oilSchema = new Schema({
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
     company : {
         type: String,
         required: true,
         default: "Não Informado"
     },
     branch : {
         type: String,
         required: true,
         default: "Não Informado"
     },
     material : {
         type: String,
         default: "Não Informado"
     },
     local : {
         type: String,
         default: "Não Informado"
     },
     brand : {
         type: String,
         default: "Não Informado"
     }
});

module.exports = mongoose.model('Oil', oilSchema);

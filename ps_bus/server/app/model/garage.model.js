'use strict';

const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Garage
 */

 var garageSchema = new Schema({
     nome : {
         type: String,
         required: true,
         default: "Não Informado"
     },
     inscription : {
         type: String,
         required: true,
         default: "Não Informado"
     },
     code : {
         type: String,
         required: true,
         default: "Não Informado"
     }
});

garageSchema.statics.nameByCode = function(code, callback) {
  return this.findOne({'code': code}, 'nome', callback);
}

module.exports = mongoose.model('Garage', garageSchema);

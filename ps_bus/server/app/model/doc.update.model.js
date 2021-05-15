'use strict';
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

 var DocUpateSchema = new Schema({
     emmployee_update : {
         type : Date
     },
     fleet_update: {
         type : Date
     }
});

module.exports = mongoose.model('DocUpdate', DocUpateSchema);

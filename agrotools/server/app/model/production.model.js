'use strict';
// cattle.js

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const crypto    = require('crypto');
const msg       = require('../tools/msg.js')
const Float = require('mongoose-float').loadType(mongoose, 3);
/**
 * User Schema definition
 */

let ProductionSchema = new Schema({
  value: {
    type: Float,
    required: true,
    default: 0
  },
  date:{
    type : Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Production', ProductionSchema);
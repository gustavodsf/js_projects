'use strict';
// cattle.js

const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const crypto    = require('crypto');
const msg       = require('../tools/msg.js')

/**
 * User Schema definition
 */

let CattleSchema = new Schema({
  name: {
    type:   String,
    required: true,
    unique:   true
  },
  earring_number: {
    type:   Number,
    required: true,
    unique:   true,
    default:     0
  },
  gender:{
    type: String,
    required: true,
    default: 'Não Informado',
  },
  source: {
    type:   String,
    required: true,
    default: 'Não Informado'
  },
  coat:{
    type: String,
    required: true,
    default: 'Não Informado'
  },
  RGN:{
    type: String,
  },
  RGD:{
    type: String,
  },
  mother_id: {
    type:   String,
    required: true,
    default: 'Não Informado'
  },
  father_id: {
    type:   String,
    required: true,
    default: 'Não Informado'
  },
  note:{
    type: String,
  },
  photos: [],
  birthday:{
    type: Date,
    required: true
  },
  breed: {
    type:   String,
    required: true,
    default: 'Não Informado'
  },
  status: {
    type: String,
    required: true,
    default: 'Não Informado'
  }
});

CattleSchema.pre('save', function(next) {
  try {
    let cattle = this;

    if(cattle.source == msg.CATTLE_SOURCE_INTERNAL && (cattle.mother_id == undefined || cattle.mother_id == '' || cattle.mother_id == 'Não Informado')
                                                   && (cattle.father_id == undefined || cattle.father_id == '' || cattle.mother_id == 'Não Informado')){
      next(new Error(msg.CATTLE_PARENTS_NOT_FILLED_IN));
    }
    next();

  } catch (e) {
    next(e);
  }
});

CattleSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    if(error.message.indexOf("$name") !== -1){
      next(new Error(msg.NAME_ALREADY_STORED));
    }else if(error.message.indexOf("$earring_number") !== -1){
      next(new Error(msg.EARRING_ALREADY_STORED));
    }else{
      next(error);
    }
  } else {
    next(error);
  }
});

let model = mongoose.model('Cattle', CattleSchema);
module.exports = model

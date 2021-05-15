'use strict';
// file.model.js

const mongoose = require('mongoose');
const Schema    = mongoose.Schema;
/**
 * File Exportação Jornada
 */

let FileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  sent: {
    type: Boolean,
    required: true,
    default: false,
  },
  containsFlaws: Boolean,
});

module.exports = mongoose.model('File', FileSchema);

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
});

module.exports = mongoose.model('User', UserSchema);
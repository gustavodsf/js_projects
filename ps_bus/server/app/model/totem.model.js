// totem.model.js
// Implementação do Schema para armazenar o totem
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

let TotemSchema = new Schema({
  identificador: {
    type: Number,
    required: true,
  },
  regional: {
    type: Number,
    required: true,
  },
});

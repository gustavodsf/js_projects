'use strict';
const mongoose = require('mongoose');
const Float    = require('mongoose-float').loadType(mongoose, 3);
const Schema   = mongoose.Schema;

var workloadSchema = new Schema({
    open:{
        stick_mesaure:{
            type: Number,
            required: true,
            default: 0
        },
        date:{
            type: Date,
            required: true,
            default: Date
        },
        pump_position:{
            type: Float,
            required: true,
            default: 0
        },
        registration:{
            type: Number,
            required: true,
            default: 0
        },
        motor_oil:{
            type: Number,
            required: true,
            default: 0
        }
    },
    refuel:[{
        bus_number:{
            type:  Number,
            required: true,
            default: 0
        },
        driver_registration:{
            type: Number,
            required: true,
            default: 0
        },
        odometer:{
            type: Number,
            required: true,
            default: 0
        },
        fuel:{
            type: Float,
            required: true,
            default: 0
        },
        time : {
            type : Date,
            default: Date.now
        },     
        garage : {
         type: String,
         required: true,
         default: "Não Informado"
        },
        pump : {
            type: String,
            required: true,
            default: "Não Informado"
        },
        tank : {
            type: String,
            required: true,
            default: "Não Informado"
        },
        fuel_type : {
            type: String,
            required: true,
            default: "Não Informado"
        }
    }],
    oil:[{
        bus_number:{
            type:  Number,
            required: true,
            default: 0
        },
        amount:{
            type: Float,
            required: true,
            default: 0
        },
        garage : {
         type: String,
         required: true,
         default: "Não Informado"
        },
        pump : {
            type: String,
            required: true,
            default: "Não Informado"
        },
        tank : {
            type: String,
            required: true,
            default: "Não Informado"
        },
        fuel_type : {
            type: String,
            required: true,
            default: "Não Informado"
        }, 
        time : {
            type : Date,
            default: Date.now
        } 
    }],
    close:{
        stick_mesaure:{
            type: Number,
            required: true,
            default: 0
        },
        pump_position:{
            type: Float,
            required: true,
            default: 0
        },
        motor_oil:{
            type: Number,
            required: false,
            default: 0
        },
        date:{
            type: Date,
            required: true,
            default: Date
        },
        fuel_error:{
            type: Boolean,
            required: true,
            default: false
        },
        oil_error:{
            type: Boolean,
            required: true,
            default: false
        }
    },
    sended:{
        type: Boolean,
        required: true,
        default: false
    }
});
module.exports = mongoose.model('Workload', workloadSchema);
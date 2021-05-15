'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const crypto   = require('crypto');
/**
 * Configuração
 */
var configurationSchema = new Schema({
    password : {
        type: String,
        required: true
    },
    salt : {
        type: String
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
    oil : {
        type: String,
        required: true,
        default: "Não Informado"
    },
    fuel : {
        type: String,
        required: true,
        default: "Não Informado"
    }
});

configurationSchema.pre('save', function(next) {
    if (this.password && this.password.length >= 4 && this.password.length <= 8) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.senha = this.hashsenha(this.senha);
    }
    next();
});

configurationSchema.methods.hashsenha = function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
    } else {
        return password;
    }
};

configurationSchema.methods.authenticate = function(password) {
	return this.password === this.hashsenha(password);
};

module.exports = mongoose.model('Configuration', configurationSchema);
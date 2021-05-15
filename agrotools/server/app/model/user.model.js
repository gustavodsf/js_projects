'use strict';
// user.js

/**
 * Imports
 */
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const crypto    = require('crypto');

/**
 * Valida o tamanho da senha fornecida pelo usuário
 * @method validatePasswordLength
 * @param  {String} password a senha fornecida pelo usuáiro
 * @return {Boolean}          verdadeiro ou falso
 */
const validatePasswordLength = function(password) {
  return (password && password.length > 6);
}

/**
 * User Schema definition
 */
let UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    validate: [validatePasswordLength, 'The password should be longer'],
  },
  salt: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});


UserSchema.pre('save', function(next) {

	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Encrypt the given password
 * @method function
 * @param  {String} password
 * @return {String}          The given password encrypted
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

module.exports = mongoose.model('User', UserSchema);

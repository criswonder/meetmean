'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
/**
  * Validations
  */
/* var validatePresenceOf = function(value) {
     // If you are authenticating by any of the oauth strategies, don't validate.
     console.log('validatePresenceOf get called.....'+value);
     return (this.provider && this.provider !== 'local') || (value && value.length);
 };*/

/**
 * Category Schema
 */
var CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: '1'
    },
    create_time: {
        type: String,
        default: new Date()+''
    }
});

/**
 * Virtuals
 */
/*CategorySchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.hashPassword(password);
}).get(function() {
    return this._password;
});*/

/**
 * Pre-save hook
 */
/*CategorySchema.pre('save', function(next) {
    if (this.isNew && this.provider === 'local' && this.password && !this.password.length)
        return next(new Error('Invalid password'));
    next();
});
*/
/**
 * Methods
 */
// CategorySchema.methods = {

//     /**
//      * HasRole - check if the Category has required role
//      *
//      * @param {String} plainText
//      * @return {Boolean}
//      * @api public
//      */
//     hasRole: function(role) {
//         var roles = this.roles;
//         return roles.indexOf('admin') !== -1 || roles.indexOf(role) !== -1;
//     },

//     /**
//      * IsAdmin - check if the Category is an administrator
//      *
//      * @return {Boolean}
//      * @api public
//      */
//     isAdmin: function() {
//         return this.roles.indexOf('admin') !== -1;
//     },

//     *
//      * Authenticate - check if the passwords are the same
//      *
//      * @param {String} plainText
//      * @return {Boolean}
//      * @api public
     
//     authenticate: function(plainText) {
//         return this.hashPassword(plainText) === this.hashed_password;
//     },

//     /**
//      * Make salt
//      *
//      * @return {String}
//      * @api public
//      */
//     makeSalt: function() {
//         return crypto.randomBytes(16).toString('base64');
//     },

//     /**
//      * Hash password
//      *
//      * @param {String} password
//      * @return {String}
//      * @api public
//      */
//     hashPassword: function(password) {
//         if (!password || !this.salt) return '';
//         var salt = new Buffer(this.salt, 'base64');
//         return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
//     }
// };

mongoose.model('Category', CategorySchema);

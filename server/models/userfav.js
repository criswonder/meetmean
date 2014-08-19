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
var User_Ablum = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    image_id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
});

 

mongoose.model('user_fav', User_Ablum);

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
    urls: {
        type: String,
        required: true,
    },
    des: {
        type: String
    },
    category_id: {
        type: String,
        required: true,
    },
    create_time: {
        type: String,
        default: new Date()+''
    }
});

 

mongoose.model('AblumItem', CategorySchema);

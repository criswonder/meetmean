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
    IMEI: {
        type: String,
        required: true
    },
    SERIAL: {
        type: String,
        required: true
    },
    SubscriberId: {
        type: String,
        required: true
    },
    MAC: {
        type: String,
        required: true
    },
    create_time: {
        type: String,
        default: new Date()+''
    }
});

var mongoosePaginate = require('mongoose-paginate');
CategorySchema.plugin(mongoosePaginate);

mongoose.model('Device', CategorySchema);

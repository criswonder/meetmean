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
    content: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        default: '1'
    },
    create_time: {
        type: String,
        default: new Date()+''
    }
});
mongoose.model('Feedback', CategorySchema);

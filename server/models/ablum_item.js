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
    images: {
        type: Array,
        required: true,
    },
    
    des: {
        type: String
    },
    /**此相册需要的积分
    **/
    credit: {
        type: Number,
        default:0
    },
    category_id: {
        type: String,
        required: true
    },
    /**用于用户后续赚取积分
    **/
    creator_id: {
        type: String,
        default: 'sysadmin',
        required: true
    },
    create_time: {
        type: String,
        default: new Date()+''
    }
});

var mongoosePaginate = require('mongoose-paginate');
CategorySchema.plugin(mongoosePaginate);

mongoose.model('AblumItem', CategorySchema);

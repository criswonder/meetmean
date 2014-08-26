'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User_fav = new Schema({
    user_id: {
        type: String,
        required: true
    },
    image_id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
    },
    width: {
        type: Number,
        required: false,
    },
    height: {
        type: Number,
        required: false,
    },
    status: {
        type: Number,
        default:0
    },
    category_id: {
        type: String,
        required: false
    },
    /**所在相册ID
     **/
    ablum_id: {
        type: String,
        required: false
    },
    creator_id: {
        type: String,
        default: 'sysadmin',
        required: true
    },
    create_time: {
        type: String
    }
});

 

mongoose.model('user_fav', User_fav);

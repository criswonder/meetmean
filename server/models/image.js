'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
 
/**
 * Image 的目的是把ablum的urls,分解后存起来，以后加入尺寸信息。
 * status 信息用于删除，等等，以后加入自己的cdn
 * 另外可以通过url判断是否重复
 */
var ImageSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        required: false
    },
    height: {
        type: Number,
        required: false
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
        type: String,
        default:  Date.now()
    }
});

 

mongoose.model('Image', ImageSchema);

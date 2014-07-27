'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    
    Feedback = mongoose.model('Feedback');

 

exports.create = function(req, res, next) {
    var fb = new Feedback(req.body);
    fb.save(function(err) {
        if (err) {
           res.status(200).send({result:false});
        }else{
           res.status(200).send({result:true});
        }
    });
};


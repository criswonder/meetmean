'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    // Category = mongoose.model('Category'),
    AblumItem = mongoose.model('AblumItem');

 

exports.render = function(req, res) {
    console.log('xxxxxxxxxxxxxxxxxxxx-----------222-------------xxxxxxxxxxxxxxxxxxxx');
 
    res.render('categorys/create', { 
    });
};

/*
查询所有album
*/
exports.list = function(req, res) {
    // console.log('xxxxxxxxxxxxxxxxxxxx------------------------xxxxxxxxxxxxxxxxxxxx');
    AblumItem.find().exec( function(error, results){
        if (error){
            console.log('category list have error');
           return res.status(400); 
        } 
        // console.log(results);
        // for(var i=0;i<results.length;i++){
        //     console.log(results[i]);
        // }
        res.status(200);
        res.send({
            result:results
        });
        // res.render('categorys/list',{result:results});
    });
    
};
/**
显示单个album 使用
**/
exports.get = function(req, res) {
    var id = req.params.ablumId;
    console.log(id);
    AblumItem.find({_id:id}).exec( function(error, results){
        if (error){
            console.log('category list have error');
           return res.status(400); 
        } 
        console.log(results);
        // for(var i=0;i<results.length;i++){
        //     console.log(results[i]);
        // }\
        res.status(200);
        res.send({
            result:results
        });
        // res.render('categorys/list',{result:results});
    });
    
};

 


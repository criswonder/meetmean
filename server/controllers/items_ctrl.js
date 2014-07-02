'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    // Category = mongoose.model('Category'),
    AblumItem = mongoose.model('AblumItem'),
    User_Ablum = mongoose.model('user_ablum');

 

exports.render = function(req, res) {
    console.log('xxxxxxxxxxxxxxxxxxxx-----------222-------------xxxxxxxxxxxxxxxxxxxx');
 
    res.render('categorys/create', { 
    });
};
exports.listjson = function(req, res) {
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
exports.fav = function(req, res) {
    var item = new User_Ablum(req.body);
    var u_id= item.user_id;
    var a_id = item.ablum_id;
   
    console.log(u_id);
    console.log(a_id);
    User_Ablum.find({user_id:u_id,ablum_id:a_id}).exec( function(error, results){
        if (error){
            console.log('fav find have error');
           return res.status(400); 
        } 
        console.log(results);
        // var fav_result = false;
        if(results && results.length>0){
            // User_Ablum.find({user_id:u_id,ablum_id:a_id}).remove();
            User_Ablum.remove({user_id:u_id,ablum_id:a_id},function(error, count){});
            res.status(200);
            res.send({
                fav_result:false
            });
        }else{
            
            console.log(item);
            item.save(function(err) {
                if (err) {
                    switch (err.code) {
                    case 11000:
                    case 11001:
                        res.status(400).send('Categoryname already taken');
                        break;
                    default:
                        res.status(400).send('Please fill all the required fields');
                    }   

                    return res.status(400);
                }
                res.status(200);
                res.send({
                        fav_result:true
                        });
            });
        }
        // for(var i=0;i<results.length;i++){
        //     console.log(results[i]);
        // }\
        
        // res.render('categorys/list',{result:results});
    });
    
};
 


'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    AblumItem = mongoose.model('AblumItem');

 
/**
 * Create Category
 */
exports.create = function(req, res, next) {
       var category = new Category(req.body);
 
    console.log('xxxxxxxxxxxxxxxxxxxx-----------4444-------------xxxxxxxxxxxxxxxxxxxx');
    console.log(category);
    Category.find({name:category.name}).exec(
        function(err,results){
            console.log(results);
            if (results && results.length===1){
                console.log('category already have');
                res.render('categorys/create');
                return res.status(400); 
            } 

            category.save(function(err) {
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
                res.render('categorys/create');
                res.status(200);
            });
            // console.log(results);
            // for(var i=0;i<results.length;i++){
            //     console.log(results[i]);
            // }
            // res.status(200);
            // res.send({
            //     result:results
            // });db.ablumitems.remove({"name":"制服诱惑"})
        }
    );
    // category.save(function(err) {
    //     if (err) {
    //         switch (err.code) {
    //             case 11000:
    //             case 11001:
    //                 res.status(400).send('Categoryname already taken');
    //                 break;
    //             default:
    //                 res.status(400).send('Please fill all the required fields');
    //         }

    //         return res.status(400);
    //     }
    //     res.render('categorys/create');
    //     res.status(200);
    // });

    
};

exports.render = function(req, res) {
    console.log('xxxxxxxxxxxxxxxxxxxx-----------222-------------xxxxxxxxxxxxxxxxxxxx');
 
    res.render('categorys/create', { 
    });
};


exports.list = function(req, res) {
    // console.log('xxxxxxxxxxxxxxxxxxxx------------------------xxxxxxxxxxxxxxxxxxxx');
    Category.find().exec( function(error, results){
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

exports.create_ablum_item = function(req, res) {
    console.log('xxxxxxxxxxxxxxxxxxxx------------444------------xxxxxxxxxxxxxxxxxxxx');
    var category = new AblumItem(req.body);
    console.log(category);
    category.save(
        function(err) {
            
        if (err) {
            console.log('err:'+err);
            switch (err.code) {
                case 11000:
                case 11001:
                    res.status(400).send('该册子已经创建了');
                    break;
                default:
                    res.status(400).send('必填项没有哦');
            }

            return res.status(400);
        }
        console.log('xxx');
        res.redirect(200,'create_item');
        
        // res.render('categorys/create',{});
    });
 
    
};


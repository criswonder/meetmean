'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Category = mongoose.model('Category');

 
/**
 * Create Category
 */
exports.create = function(req, res, next) {
    var category = new Category(req.body);
 
    console.log('xxxxxxxxxxxxxxxxxxxx------------------------xxxxxxxxxxxxxxxxxxxx');
    console.log(category);
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
};

exports.render = function(req, res) {
    console.log('xxxxxxxxxxxxxxxxxxxx------------------------xxxxxxxxxxxxxxxxxxxx');
 
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
    });
    
};


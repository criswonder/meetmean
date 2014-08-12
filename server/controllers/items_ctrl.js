'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    User = mongoose.model('User'),
    AblumItem = mongoose.model('AblumItem'),
    // Images = mongoose.model('Image'),
    UserFav = mongoose.model('user_fav');

 

exports.render = function(req, res) {
    console.log('xxxxxxxxxxxxxxxxxxxx-----------222-------------xxxxxxxxxxxxxxxxxxxx');
 
    res.render('categorys/create', { 
    });
};

var fulljson = {
    forceUpdate:false,
    apkDownloadUrl:'',
    appVersion:1
};


// function getImages(req,res){
//     Images.find().exec(function(error,results){
//         if (error){
//             console.log('getImages error');
//             return res.status(400); 
//         }

//         fulljson.images = results;
                
//         res.status(200);
//         res.send(fulljson);
//     });
// }

function getUserInfo(req,res,id){
    User.find({_id:id}).exec(function(error,results){
        if (error){
            console.log('getUserInfo error');
            return res.status(400); 
        }

        fulljson.user = results[0];
        res.status(200);
        res.send(fulljson);
        // getImages(req,res);
    });
}

function getUserFav(req,res){
    var user_id = req.query.user_id;
    if(user_id){
        console.log('user_id found!');
        UserFav.find({'user_id':user_id}).exec( function(error, results){
                if (error){
                    console.log('getUserFav have error');
                   return res.status(400); 
                } 
                
                fulljson.user_fav = results;
                
                // res.status(200);
                // res.send(fulljson);

                getUserInfo(req,res,user_id);
            });
    }else{
        console.log('no user_id found!');
        fulljson.user_fav = [];

        res.status(200);
        res.send(fulljson);
    }
}

function getCategorys(req,res){
    Category.find().exec( function(error, results){
        if (error){
            console.log('getCategorys have error');
           return res.status(400); 
        } 
        
        fulljson.categorys = results;
        
        getUserFav(req,res);
    });
}



exports.fulljson = function(req, res) {
    // console.log('xxxxxxxxxxxxxxxxxxxx------------------------xxxxxxxxxxxxxxxxxxxx');
    AblumItem.find().sort({create_time: -1}).exec( function(error, results){
        if (error){
            console.log('category list have error');
           return res.status(400); 
        } 
        fulljson.albums = results;
        getCategorys(req,res);
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
exports.download = function(req, res) {
    if(req.query.version<1){
        res.status(200).send({hasNewVersion:true,update_url:'http://106.187.99.142:3000/download.apk'});    
    }else{
        res.status(200).send({hasNewVersion:false,update_url:''});    
    }
    
};
exports.download_apk = function(req, res) {
 
    res.download(__dirname+'/360MM.apk', '360MM.apk', function(err){
      if (err) {
        // handle error, keep in mind the response may be partially-sent
        // so check res.headersSent
        console.log('download has error');
      } else {
        // decrement a download credit etc
        console.log('download successful');
      }
    });
    res.status(200);
    
};

exports.fav = function(req, res) {
    var item = new UserFav(req.body);
    var u_id= item.user_id;
    var a_id = item.image_id;
   
    console.log(u_id);
    console.log(a_id);
    UserFav.find({user_id:u_id,image_id:a_id}).exec( function(error, results){
        if (error){
            console.log('fav find have error');
           return res.status(400); 
        } 
        console.log(results);
        // var fav_result = false;
        if(results && results.length>0){
            // UserFav.find({user_id:u_id,ablum_id:a_id}).remove();
            UserFav.remove({user_id:u_id,image_id:a_id},function(error, count){});
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
 


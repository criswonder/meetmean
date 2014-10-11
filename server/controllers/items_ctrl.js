'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Category = mongoose.model('Category'),
    User = mongoose.model('User'),
    AblumItem = mongoose.model('AblumItem'),
    Images = mongoose.model('Image'),
    UserFav = mongoose.model('user_fav');

//var Q = require('q');
//var Promise = require('bluebird');
// var mongoosePages = require('mongoose-pages');
// mongoosePages.anchor(AblumItem);



 

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
//        UserFav.find({'user_id':user_id}).exec( function(error, results){
//                if (error){
//                    console.log('getUserFav have error');
//                   return res.status(400);
//                }
//
//                fulljson.user_fav = results;
//
//                // res.status(200);
//                // res.send(fulljson);
//
//
//            });
        getUserInfo(req,res,user_id);
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
    var pageNum = req.query.pageNum?req.query.pageNum:1;

//    AblumItem.paginate({}, pageNum, 10, function(error, pageCount, paginatedResults, itemCount) {
//       if (error){
//            console.log('fulljson have error:'+error);
//           return res.status(400);
//        }
//        fulljson.albums = paginatedResults;
//        getCategorys(req,res);
//    },{create_time: -1});

    getCategorys(req,res);

    // AblumItem.find().sort({create_time: -1}).exec( function(error, results){
    //     if (error){
    //         console.log('category list have error');
    //        return res.status(400); 
    //     } 
    //     fulljson.albums = results;
    //     getCategorys(req,res);
    // });
};

exports.getAlbums = function(req, res) {
    var pageNum = req.query.pageNum?req.query.pageNum:1;
    var pageSize = req.query.pageSize?req.query.pageSize:10;
    var category_id = req.query.cid;
    var next = req.query.next;
    var ablum_id = req.query.aid;

    //下面的注释是修改ABLUM create_time 从String 到int 的转换
//    AblumItem.find({},'create_time name',function(error,list){
//        if(list && list.length>0){
//            console.log(list);
//            var oneItem;
//            for(var i=0;i<list.length;i++){
//                oneItem = list[i];
//                var d = new Date(Date.parse(oneItem.create_time));
//                AblumItem.update({_id:oneItem._id.toString()}, { $set: { create_time: d.getTime()+'' }},function(error,docs){
//                    console.log(error);
//                    console.log(docs);
//                });
//            }
//        }
//    });
//    return;
    if(ablum_id){
        console.log('ablum_id='+ablum_id);
        if(next){
            AblumItem.findOne({'category_id':category_id,'_id':ablum_id},function(error, obj) {
                if (error) {
                    console.log('getAlbums when next findOne have error'+error);
                    return res.status(400);
                }
                var query = AblumItem.find({'category_id':category_id,'create_time':{$lte:obj.create_time}})
//                'create_time name')
                    .limit(100)
                    .sort({create_time:-1,_id: -1})
                    .exec(function(error, results) {
                        if (error) {
                            console.log('getAlbums have error2'+error);
                            return res.status(400);
                        }
                        var arrayResult = [];
                        if(results && results.length>0){
                            for(var i=0;i<results.length;i++){
                                if(results[i]._id+''===ablum_id && i+1<results.length){
                                    arrayResult.push(results[i+1]);
                                    break;
                                }
                            }
                        }
                        res.status(200).send({
                            albums: arrayResult,
                            itemCount: 1,
                            pageCount: 1
                        });
                    });
            });
        }else{
            AblumItem.findOne({'category_id':category_id,'_id':ablum_id},function(error, obj) {
                if (error) {
                    console.log('getAlbums previous have error'+error);
                    return res.status(400);
                }
                var query = AblumItem.find({'category_id':category_id,'create_time':{$gte:obj.create_time}}
                    )
//                'create_time name')
                    .sort({create_time:-1,_id: -1})
                    .exec(function(error, results) {
                        if (error) {
                            console.log('getAlbums when previous findOne have error'+error);
                            return res.status(400);
                        }
                        var arrayResult = [];
                        if(results && results.length>0){
                            var len = results.length;
                            for(var i=len-1;i>=0;i--){
                                if(results[i]._id+''===ablum_id && i-1>=0){
                                    arrayResult.push(results[i-1]);
                                    break;
                                }
                            }
                        }
                        res.status(200).send({
                            albums: arrayResult,
                            itemCount: 1,
                            pageCount: 1
                        });
                    });
            });

        }

    }else{
        console.log('category_id='+category_id);
        AblumItem.paginate({'category_id':category_id},pageNum, pageSize, function(error, pageCount, paginatedResults, itemCount) {
            if (error){
                console.log('getAlbums have error:'+error);
                return res.status(400).send();
            }
            res.status(200).send({
                albums:paginatedResults,
                itemCount:itemCount,
                pageCount:pageCount
            });
        },{ sortBy : { create_time : -1,_id: -1 }});
//    },{ columns: 'name create_time',sortBy : { create_time : -1,_id: -1 }});
    }
};

/*
查询所有album
*/
exports.list = function(req, res) {
    // console.log('xxxxxxxxxxxxxxxxxxxx------------------------xxxxxxxxxxxxxxxxxxxx');
    AblumItem.find().exec( function(error, results){
        if (error){
            console.log('!!deprecated list have error'+error);
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
            console.log('get single ablum have error'+error);
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
    if(req.query.version<=0){
        res.status(200).send({hasNewVersion:true,update_url:'http://www.365girlsclub.com/download.apk'});
    }else{
        res.status(200).send({hasNewVersion:false,update_url:''});    
    }
    
};
exports.download_apk = function(req, res) {
 
    res.download(__dirname+'/meinv_ruhua.apk', 'meinv_ruhua.apk', function(err){
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
    var img_id = item.image_id;
   
    console.log(u_id);
    console.log(img_id);

    UserFav.findOne({user_id:u_id,image_id:img_id}).exec(
      function(error, results){
          if (error){
              console.log('fav find have error');
              return res.status(400);
          }
          console.log('userfav='+results);
          // var fav_result = false;
          if(results){
              // UserFav.find({user_id:u_id,ablum_id:a_id}).remove();
              UserFav.remove({user_id:u_id,image_id:img_id},function(error, count){});
              res.status(200);
              res.send({
                  fav_result:false
              });
          }else{
              Images.findById(img_id,function(error,results){
                  console.log('2'+results);
                  if(results){
                      item.image_id = results._id;
                      item.url = results.url;
                      item.width = results.width;
                      item.height = results.height;
                      item.status = results.status;

                      item.category_id = results.category_id;
                      item.ablum_id = results.ablum_id;
                      item.creator_id = results.creator_id;
                      item.create_time = new Date();

                      item.save(function(error,fav_result){
                          if (error){
                              console.log('item.save have error'+error);
                              return res.status(400).send();
                          }
                          console.log('save result = '+fav_result);
                          res.status(200);
                          res.send({
                              fav_result:true
                          });
                      });
                  }else{
                      console.error('img not found!!');
                      res.status(400);
                      res.send({fav_result:'xxx'});
                  }
              });

          }
      }
    );
};

exports.getfavs = function(req,res){
    var userid = req.query.uid;
    console.log('get favs userid='+userid);
    UserFav.find({user_id:userid}).exec(function(error,results){
        if (error){
            console.log('getfavs have error');
            return res.status(400);
        }
        res.status(200).send({favs:results});
    });
}
 


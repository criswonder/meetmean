'use strict';

angular.module('ablum_module', [])
    .controller('ItemInputControl', ['$stateParams','$scope', '$rootScope', '$http', '$location',
        function($stateParams,$scope, $rootScope, $http, $location) {
            // This object will be filled by the form
            
            if($stateParams.albumId){
               $http.get('/albums/'+$stateParams.albumId,{itemId: $stateParams.albumId}).success(function(data) {
                 // $scope.albums = data.result;
                 console.log('ItemInputControl update-->'+data.result);
                 var album = data.result[0];
                 var imageUrls = album.urls.split(',');
                 for( var index in imageUrls){
                    console.log(imageUrls[index]);

                 }
                 album.imageUrls = imageUrls;
                 console.log(album);
                 $scope.item = album;

                 $http.get('/category/list').success(function(data) {
                     $scope.categorys = data.result;
                     for(var i in $scope.categorys){
                        if($scope.item.category_id===$scope.categorys[i]._id)
                        {
                            $scope.cat_index = i; 
                            break;
                        }
                     }
                });
            }); 
            }else{
                $scope.item = {};
                $http.get('/category/list').success(function(data) {
                     $scope.categorys = data.result;
                });

            }
            console.log($stateParams.albumId);
            console.log($stateParams.abc);
            // Register the login() function    
            $scope.create_item = function() {
                $http.post('/category/list', {
                    _id:$scope.item._id,
                    name: $scope.item.name,
                    des: $scope.item.des,
                    price: $scope.item.price,
                    urls: $scope.item.urls,
                    category_id: $scope.item.category_id
                })
                    .success(function(response) {
                        console.log('success!!!!!!');
                        alert('success');
                        
                        // // authentication OK
                        // $scope.loginError = 0;
                        // $rootScope.user = response.user;
                        // $rootScope.$emit('loggedin');
                        if (response.redirect) {
                            if (window.location.href === response.redirect) {
                                //This is so an admin user will get full admin page
                                window.location.reload();
                            } else {
                                window.location = response.redirect;
                            }
                        } else {
//                            $location.url('/');
                            console.log('after create album success');
                        }
                    })
                    .error(function() {
                        $scope.loginerror = 'Authentication failed.';
                        alert('create_item failed');
                    });
            };
        }
    ])
    .controller('ItemListControl', ['$state','$scope', '$rootScope', '$http', '$location',
        function($state, $scope, $rootScope, $http, $location) {
            $scope.albums = {};
            console.log('ItemListControl-->');
            $scope.viewDetailPage = function() {};

            $scope.editAlbum = function(album){
                console.log('editAlbum get called');
                $state.go('create_item',{albumId:album._id},{obj: album});
            };
            $scope.remove = function(album){
                console.log('remove get called'+album);
                $http.get('/albums/remove?aid='+album._id).success(function(data) {
                   alert('delete success');
                   window.location.reload();
                });


            };



            $http.get('/albums').success(function(data) {
                 $scope.albums = data.result;
                 
                 var item;
                 for( var index in $scope.albums){
                    item = $scope.albums[index];
                    console.log(item);
//                    var imageUrls = item.urls.split(',');
                    item.imageUrl = item.images[0].url;
                 }
            });

        }
    ])
    .controller('AlbumViewControl', ['$stateParams','$scope','$http',
        function($stateParams,$scope, $http) {
            // $stateParams.albumId = $scope.album._id;
            // alert($stateParams.albumId);
            $scope.album = {};
            var id = $stateParams.albumId;
            console.log('/albums/'+id);
            $http.get('/albums/'+id,{itemId: id}).success(function(data) {
                 // $scope.albums = data.result;
                 console.log('AlbumViewControl-->'+data.result);
                 var album = data.result[0];
//                 var imageUrls = album.urls.split(',');
//                 for( var index in imageUrls){
//                    console.log(imageUrls[index]);
//
//                 }
//                 album.imageUrls = imageUrls;
                 console.log(album);
                 $scope.album = album;
            });

            $scope.favorite = function(img){
                console.log('favorite get called');
//                console.log($rootScope.user);
//                console.log($scope.user);
                console.log(img);
                $http.post('/albums/fav',{user_id:$scope.user._id,image_id:img._id})
                    .success(function(response) {
                        if(response.fav_result){
                            alert('fav success');
                        }else{
                            alert('取消成功!!!');
                        }
                    })
                    .error(function() {

                        alert('create_item failed');
                    });
            };
            // console.log('AlbumViewControl-->'+$stateParams.albumId);
            // console.log('AlbumViewControl-->'+$stateParams.fuck);
        }
    ]);
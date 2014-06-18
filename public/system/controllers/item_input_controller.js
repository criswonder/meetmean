'use strict';

angular.module('ablum_module', [])
    .controller('ItemInputControl', ['$scope', '$rootScope', '$http', '$location',
        function($scope, $rootScope, $http, $location) {
            // This object will be filled by the form
            $scope.item = {};

            // Register the login() function
            $scope.create_item = function() {
                $http.post('/category/list', {
                    name: $scope.item.name,
                    des: $scope.item.des,
                    urls: $scope.item.urls,
                    category_id: $scope.item.parent
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
                            $location.url('/');
                        }
                    })
                    .error(function() {
                        $scope.loginerror = 'Authentication failed.';
                        alert('create_item failed');
                    });
            };
            $http.get('/category/list').success(function(data) {
                 $scope.categorys = data.result;
            });

        }
    ])
    .controller('ItemListControl', ['$scope', '$rootScope', '$http', '$location',
        function($scope, $rootScope, $http, $location) {
            $scope.albums = {};
            console.log('ItemListControl-->');
            $scope.viewDetailPage = function() {};
            $http.get('/albums').success(function(data) {
                 $scope.albums = data.result;
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
                 var imageUrls = album.urls.split(',');
                 for( var index in imageUrls){
                    console.log(imageUrls[index]);

                 }
                 album.imageUrls = imageUrls;
                 console.log(album);
                 $scope.album = album;
            });
            // console.log('AlbumViewControl-->'+$stateParams.albumId);
            // console.log('AlbumViewControl-->'+$stateParams.fuck);
        }
    ]);
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

            // $scope.orderProp = 'age';

        }
    ]);
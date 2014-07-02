'use strict';

//Setting up route
angular.module('mean.system').config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            // For unmatched routes:
            // $urlRouterProvider.otherwise('/');
            // $urlRouterProvider.when('/albums2',{
            //      url: '/',
            //     templateUrl: 'public/system/views/test.html'
            // }).otherwise('/');

            // states for my app
            $stateProvider              
                .state('home', {
                    url: '/',
                    templateUrl: 'public/system/views/test.html'
                })
                .state('auth', {
                    templateUrl: 'public/auth/views/index.html'
                })
                .state('create_item',{
                    url: '/create_item/:albumId',
                    templateUrl: 'public/system/views/item_input.html'
                })
                .state('albums',{
                    url: '/albums',
                    templateUrl: 'public/system/views/item_list.html',
                    controller: 'ItemListControl'
                })
                .state('test',{
                    url: '/test',
                    templateUrl: 'public/system/views/test.html',
                    controller: function(){}
                })
                 .state('detail',{
                    url: '/albums/:albumId',
                    templateUrl: 'public/system/views/album.html',
                    controller: 'AlbumViewControl'
                });
                 // .otherwise('/');

            // $urlRouterProvider.
            //   when('/albums/:albumId', {
            //     templateUrl: 'partials/phone-detail.html',
            //     controller: 'PhoneDetailCtrl'
            //   }).
            //   otherwise({
            //     redirectTo: '/'
            //   });
      
                
        }
    ])
    .config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);

'use strict';

//Setting up route
angular.module('mean.system').config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            // For unmatched routes:
            $urlRouterProvider.otherwise('/');
            // $urlRouterProvider.when('/albums/:albumId',{
            //     templateUrl: 'public/auth/views/index.html',
            //     controller: 'AlbumViewControl'
            // }).otherwise('/');

            // states for my app
            $stateProvider              
                .state('home', {
                    url: '/',
                    templateUrl: 'public/system/views/index.html'
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
                 .state('detail',{
                    url: '/albums/:albumId',
                    templateUrl: 'public/system/views/album.html',
                    controller: 'AlbumViewControl'
                });

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

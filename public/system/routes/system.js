'use strict';

//Setting up route
angular.module('mean.system').config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            // For unmatched routes:
            $urlRouterProvider.otherwise('/');

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
                    url: '/create_item',
                    templateUrl: 'public/system/views/item_input.html'
                }).state('item_list',{
                    url: '/item_list',
                    templateUrl: 'public/system/views/item_list.html',
                    controller: 'ItemListControl'
                });
                
        }
    ])
    .config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);

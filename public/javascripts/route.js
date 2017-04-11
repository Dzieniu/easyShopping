angular.module('easyshopping').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
                // For any unmatched url, send to /business
                $urlRouterProvider.otherwise("/login")
                 
                $stateProvider
                        .state('main', {
                            url: "/main",
                            templateUrl: "main",
                            controller: "mainCtrl"
                        })
                        .state('main.meals', {
                            url: "/meals",
                            templateUrl: "meals",
                            controller: "mealsCtrl"
                        })
                        .state('main.newMeal', {
                            url: "/newmeal",
                            templateUrl: "newMeal",
                            controller: "newMealCtrl"
                        })
                        .state('login', {
                          url: '/login',
                          templateUrl: 'landingPage',
                          controller: 'AuthCtrl',
                          onEnter: ['$state', 'auth', function($state, auth){
                            if(auth.isLoggedIn()){
                              $state.go('main');
                            }
                          }]
                        })
                        .state('register', {
                          url: '/register',
                          templateUrl: 'register',
                          controller: 'AuthCtrl',
                          onEnter: ['$state', 'auth', function($state, auth){
                            if(auth.isLoggedIn()){
                              $state.go('main');
                            }
                          }]
                        });

            }]);
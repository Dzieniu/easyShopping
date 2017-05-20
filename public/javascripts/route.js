angular.module('easyshopping').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
                // For any unmatched url, send to /business
                $urlRouterProvider.otherwise("/welcome")
                 
                $stateProvider
                        .state('main', {
                            url: "/main",
                            templateUrl: "main",
                            controller: "mainCtrl",
                            onEnter: ['$state', 'auth', function($state, auth){
                            if(!auth.isLoggedIn()){
                              $state.go('landingPage');
                            }
                          }]
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
                        .state('main.editMeals', {
                            url: "/editmeals",
                            templateUrl: "editMeals",
                            controller: "editMealsCtrl"
                        })

                        .state('login', {
                          url: '/welcome',
                          templateUrl: 'landingPage',
                          controller: 'AuthCtrl',
                          onEnter: ['$state', 'auth', function($state, auth){
                            if(auth.isLoggedIn()){
                              $state.go('main.meals');
                            }
                          }]
                        })
            }]);
angular.module('easyshopping').controller('AuthCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
    $scope.user = {};
    $scope.userRegister = {};

  $scope.selected = function(x){
    if(x=="login"){
      $scope.login = true;
      $scope.registerr = false;
    }else if(x=="register"){
      $scope.login = false;
      $scope.registerr = true;
    }
  };

  $scope.register = function(){
    auth.register($scope.userRegister).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('main');
    });
  };

  $scope.logIn = function(){

    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('main');
    });

  };
  
}])
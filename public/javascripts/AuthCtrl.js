angular.module('easyshopping').controller('AuthCtrl', [
'$scope',
'$state',
'auth',
function($scope, $state, auth){
    $scope.showRegister = false;
    $scope.user = {};
    $scope.userRegister = {};
    $scope.images=["/images/howitworks/addmeal.png","/images/howitworks/chooseday.png","/images/howitworks/choosemeal.png","/images/howitworks/plane.png","/images/howitworks/list.png"];
    $scope.currentImage = $scope.images[0];

    $scope.texts=[
    "Dodaj posiłki, które na codzień przyrządzasz, wpisując nazwę posiłku i produkty, które potrzebujesz do jego wykonania",
    "Ułóż tygodniowy plan. Zacznij od wybrania dnia.",
    "Po wybraniu dnia, z listy posiłków wybierz te, które chcesz w danym dniu przyrządzić",
    "Ułóż cały plan",
    "Po stworzeniu tygodniowego planu, wygeneruje się lista zakupów"
    ];
    $scope.currentText=$scope.texts[0];
    $scope.animationIndex=0;
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
      $state.go('main.meals');
    });
  };

  $scope.logIn = function(){

    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('main.meals');
    });

  };

  $scope.chooseStep = function(index){
    $scope.currentImage = $scope.images[index];
    $scope.currentText = $scope.texts[index];
    $scope.animationIndex=index;
  }
  
}])
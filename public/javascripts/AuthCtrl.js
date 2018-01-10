angular.module('easyshopping').controller('AuthCtrl', [
'$scope',
'$state',
'auth',
'$interval',
function($scope, $state, auth,$interval){


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
      $interval.cancel(run);
    });
  };

  $scope.logIn = function(){

    auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('main.meals');
      $interval.cancel(run);
    });

  };
  var currentIteration=1
  $scope.chooseStep = function(index){
    $scope.currentImage = $scope.images[index];
    $scope.currentText = $scope.texts[index];
    $scope.animationIndex=index;
    currentIteration=index;
  }

  var run = $interval(function(){
    console.log("xd")
    $scope.chooseStep(currentIteration)
    currentIteration++;
    if(currentIteration==$scope.images.length){
      currentIteration=0;
    }
  },4000)


  
}])
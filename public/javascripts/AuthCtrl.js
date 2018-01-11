angular.module('easyshopping').controller('AuthCtrl', [
'$scope',
'$state',
'auth',
'$interval',
'$location',
'$anchorScroll',
function($scope, $state, auth,$interval,$location,$anchorScroll,){


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

  //historyjka
  $scope.storySize=7;
  $scope.currentStory=0;
  $scope.storyStructure = [
  {img:"/images/make.png",text:"Robisz zakupy raz w tygodniu?"},
  {img:"/images/think.png",text:"Co tydzień musisz planować co zjeść i robić listę zakupów?"},
  {img:"/images/angry.png",text:"Nie lubisz tego robić?"},
  {img:"/images/end.png",text:"Koniec z tym! Dzięki tej aplikacji ułatwisz sobie ten proces!"},
  {img:"/images/end.png",text:"Nie wszystkie odpowiedzi były twierdzące? Nic straconego! Zobacz, do czego służy EasyShopping!"}
  ]
  $scope.yesAnswer = function(){
    $scope.currentStory++
    if($scope.currentStory==3){
      $scope.storySize=12
      setTimeout(function(){
        $scope.gotoDiv("#howitworks")
      },1500);
    }
  }
  $scope.noAnswer = function(){
    $scope.currentStory=4
    $scope.storySize=12
    setTimeout(function(){
      $scope.gotoDiv("#howitworks")
    },1500);
  }


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


  $scope.gotoDiv = function(x) {
    var divPosition = angular.element(document.querySelector(x)).prop('offsetTop');
    var currentPosition = self.pageYOffset;
    var n = currentPosition;
    currentIteration=0;
    (function smoothScroll(){
      if(n<=divPosition){
        window.scrollTo(0,n+=4);
        setTimeout(function(){
          smoothScroll();
        },0.2)
      }
    })()
  };

}])
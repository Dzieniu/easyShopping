angular.module('easyshopping').factory('auth', ['$http', '$window','$state', function($http, $window,$state){
   var auth = {};

auth.saveToken = function (token){
  $window.localStorage['flapper-news-token'] = token;
};

auth.getToken = function (){
  return $window.localStorage['flapper-news-token'];
};
auth.isLoggedIn = function(){
  var token = auth.getToken();

  if(token){
    var payload = JSON.parse($window.atob(token.split('.')[1]));

    return payload.exp > Date.now() / 1000;
  } else {
    return false;
  }
};

auth.currentUser = function(){
  if(auth.isLoggedIn()){
    var token = auth.getToken();
    var payload = JSON.parse($window.atob(token.split('.')[1]));

    return payload.username;
  }
};

auth.register = function(userr){

    return $http.post('/register', userr).success(function(data){
      auth.saveToken(data.token);
    })
    .error(function(err){
      swal({
        title: "Taki użytkownik już istnieje",
        type: "error",
        confirmButtonColor: "red"
      });
    });

};
auth.logIn = function(user){

    return $http.post('/login', user).success(function(data){
      auth.saveToken(data.token);
    })
    .error(function(err){
      swal({
        title: "Zła nazwa użytkownika lub hasło",
        type: "error",
        confirmButtonColor: "red"
      });
    });

};
auth.logOut = function(){
  $window.localStorage.removeItem('flapper-news-token');
  $state.go('login');
};

  return auth;
}])
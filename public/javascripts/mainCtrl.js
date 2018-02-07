angular.module('easyshopping').controller('mainCtrl', [
'$scope','$location','auth', 

function($scope,$location,auth){


	$scope.list=true;
	$scope.meals=false;
	
	$scope.currentUser=auth.currentUser();
	$scope.logout = auth.logOut;

}]);
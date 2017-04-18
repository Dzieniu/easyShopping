angular.module('easyshopping').controller('mainCtrl', [
'$scope','$location','auth', 

function($scope,$location,auth){


	$scope.test="siema"

	$scope.list=true;
	$scope.meals=false;
	
	$scope.currentUser=auth.currentUser();
	$scope.logout = auth.logOut;

	$scope.setActive = function(){
		$scope.list= !$scope.meals;
		$scope.meals= !$scope.list;

	}
}]);
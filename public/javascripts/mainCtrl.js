angular.module('easyshopping').controller('mainCtrl', [
'$scope','$location','auth', 

function($scope,$location,auth){


	$scope.test="siema"

	$scope.currentUser=auth.currentUser();
	$scope.logout = auth.logOut;
}]);
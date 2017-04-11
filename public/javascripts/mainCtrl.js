angular.module('easyshopping').controller('mainCtrl', [
'$scope','$location','auth', 

function($scope,$location,auth){


	$scope.test="siema"

	$scope.logout = auth.logOut;
}]);
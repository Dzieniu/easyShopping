angular.module('easyshopping').controller('newMealCtrl', [
'$scope','$location','auth', '$http',

function($scope,$location,auth,$http){



	$scope.ingredients = [{name: "",count: 0,unit: "" }];

	$scope.addMeal = function(){
		postData = { name:$scope.newMealName,username:auth.currentUser(),products:$scope.ingredients};
			$http.post("/mealslist", postData).success(function(data2,status) {
			});
	}
	$scope.addIngredient = function(){
		var newItem = $scope.ingredients.length+1;
   		$scope.ingredients.push({name: "", value: 0, unit:""});
   	}

	$scope.showNewMealForm=false
	
	$scope.showForm = function(){
		if($scope.showNewMealForm==false){
			$scope.showNewMealForm=true;
		}
		else{
			$scope.showNewMealForm=false;
		}
	}


}]);
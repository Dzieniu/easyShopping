angular.module('easyshopping').controller('newMealCtrl', [
'$scope','$location','auth', '$http',

function($scope,$location,auth,$http){


	$scope.newMealName = "Nazwa posiłku"
	$scope.ingredients = [{name: "",count: 1,unit: "" }];

	$scope.addMeal = function(){
		postData = { name:$scope.newMealName,username:auth.currentUser(),products:$scope.ingredients};
			$http.post("/mealslist", postData).success(function(data2,status) {
				console.log(status);
				// swal(
				// 	  'Dodałeś posiłek',
				// 	  'Dodaj kolejny, lub przejdź do układania planu',
				// 	  'success'
				// 	)
				// $scope.ingredients = [{name: "",count: 1,unit: "" }];
				// $scope.newMealName = "Nazwa posiłku"
			});

	}
	$scope.addIngredient = function(){
		var newItem = $scope.ingredients.length+1;
   		$scope.ingredients.push({name: "", count: 0, unit:""});
   	}

	$scope.showNewMealForm=false
	
	$scope.showForm = function(){
		if($scope.showNewMealForm==false){
			$scope.showNewMealForm=true;
		}
		else{
			$scope.showNewMealForm=false;
		}
	};

}]);
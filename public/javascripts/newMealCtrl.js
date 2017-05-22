angular.module('easyshopping').controller('newMealCtrl', [
'$scope','$location','auth', '$http',

function($scope,$location,auth,$http){



	$scope.ingredients = [{name: "",count: 0,unit: "" }];

	$scope.addMeal = function(){
		postData = { name:$scope.newMealName,username:auth.currentUser(),products:$scope.ingredients};
			if($scope.checkIngredients()==false){
				swal(
					  'Coś pominąłeś',
					  'Sprawdź jeszcze raz formularz dodawania posiłków',
					  'error'
					)
				return;
			}
			$http.post("/mealslist", postData).success(function(data2,status) {
				swal(
					  'Dodałeś posiłek',
					  'Dodaj kolejny, lub przejdź do układania planu',
					  'success'
					)
			});
		$scope.ingredients = [{name: "",count: 0,unit: "" }];
		$scope.newMealName = ""
	};
	$scope.addIngredient = function(){
		var newItem = $scope.ingredients.length+1;
   		$scope.ingredients.push({name: "", count: 0, unit:""});
   	};
   	$scope.checkIngredients= function(){
   		var status=true
   		$scope.ingredients.forEach( function(element, index) {
   			if(element.name=="" || !element.count>0 || element.unit==""){
   				status=false;
   			}
   		});
   		return status;
   	};

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
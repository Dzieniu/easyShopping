angular.module('easyshopping').controller('editMealsCtrl', [
'$scope','auth', '$http',

function($scope,auth,$http){
	
	$scope.currentUser=auth.currentUser();
	$scope.logout = auth.logOut;
	$scope.meals = new Array();

	$http.get("/mealslist/" + auth.currentUser() ).success(function(data) {
			$scope.meals=data;
			console.log($scope.meals);
	});

	$scope.arrowClicked = function(index){
		$scope.dupa=true;
		const mealItems = document.querySelectorAll("#showContent");
		const item = mealItems[index];
		if(item.style.transform=="rotate(180deg)"){
			item.style.transform = `rotate(360deg)`;
			return;	
		}
		item.style.transform = `rotate(180deg)`;
	};

	$scope.removeMeal = function(index){
		console.log(index);
		swal({
			title: 'Na pewno chcesz usunąć posiłek ' + '<i>' + $scope.meals[index].name +'?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#ff4d4d',
			confirmButtonText: 'Tak',
			cancelButtonText: 'Nie'
		}).then(function (){
			swal(
				'Zrobione!',
				'Posiłek został usunięty.',
				'success'
			)
		})
	}

}]);
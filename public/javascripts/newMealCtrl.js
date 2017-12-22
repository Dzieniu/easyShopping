angular.module('easyshopping').controller('newMealCtrl', [
'$scope','$location','auth', '$http',

function($scope,$location,auth,$http){

	var currentEditedID;
	$scope.currentChoice;
	$scope.choiceButton="Dodaj posiłek"
	$scope.newMealName = "Nazwa posiłku"
	$scope.ingredients = [{name: "",count: 1,unit: "" }];

	$scope.addMeal = function(){
		postData = { name:$scope.newMealName,username:auth.currentUser(),products:$scope.ingredients};
		if($scope.currentChoice=="add"){
			$http.post("/mealslist", postData).success(function(data2,status) {
				succesModalonEdit('Dodałeś posiłek','Dodaj kolejny, lub przejdź do układania planu');
				$scope.ingredients = [{name: "",count: 1,unit: "" }];
				$scope.newMealName = "Nazwa posiłku"
			});
		}else{
			$http.put("/mealslist/"+currentEditedID, postData).success(function() {
				succesModalonEdit('Posiłek został zedytowany','');
				$scope.refresh();
			});
		}
		


function succesModalonEdit(message1,message2){
	swal(
	  message1,
	  message2,
	  'success'
	)
}

	}
	$scope.addIngredient = function(){
		var newItem = $scope.ingredients.length+1;
   		$scope.ingredients.push({name: "", count: 1, unit:""});
   	}
   	$scope.removeIngredient = function(){
		var lastItem = $scope.ingredients.length;
   		$scope.ingredients.splice(-1,1);
   	}
   	var choiceElement=angular.element( document.querySelector( '#addChoices' ) );
   	$scope.editChoice = function($event,choice){
   		$scope.currentChoice=choice;
   		choiceElement.removeClass('green');
   		choiceElement=angular.element( $event.currentTarget );
   		choiceElement.addClass('green');
   		var myEl = angular.element( document.querySelector( '#allMeals' ) );

   		if(choice=='add'){
   			$scope.choiceButton="Dodaj posiłek"
   			myEl.removeClass('showDivv');
   			$scope.newMealName = "Nazwa posiłku"
			$scope.ingredients = [{name: "",count: 1,unit: "" }];
   		}
   		if(choice=='edit'){
   			$scope.choiceButton="Edytuj posiłek"
   			$scope.newMealName = 'Wybierz posiłek';
			$scope.ingredients = [];
   			myEl.addClass('showDivv');
   		}
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

//edytowanie posiłku

	$scope.refresh=function(){
		$http.get("/mealslist/"+auth.currentUser()).success(function(data){
			$scope.meals=data;
		});
	};
	$scope.refresh();

	$scope.arrowClicked = function(index){
		$scope.clicked=true;
		const mealItems = document.querySelectorAll("#showContent");
		const item = mealItems[index];
		if(item.style.transform=="rotate(180deg)"){
			item.style.transform = `rotate(360deg)`;
			return;	
		}
		item.style.transform = `rotate(180deg)`;
	};

	$scope.editMeal = function(mealObj){
		currentEditedID=mealObj._id;
		$scope.newMealName = mealObj.name;
		$scope.ingredients = mealObj.products;
	}	
	$scope.removeMeal = function(mealobj){

		swal({
			title: 'Na pewno chcesz usunąć posiłek ' + '<i>' + mealobj.name +'?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#ff4d4d',
			confirmButtonText: 'Tak',
			cancelButtonText: 'Nie'
		}).then(function (){
			$http.delete("/mealslist/"+mealobj._id).then(function(response){
				$scope.refresh();
			});
			swal(
				'Zrobione!',
				'Posiłek został usunięty.',
				'success'
			)
		})
	}

}]);
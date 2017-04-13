angular.module('easyshopping').controller('mealsCtrl', [
'$scope','$location','auth', '$http',

function($scope,$location,auth,$http){

	$http.get("/mealslist/" + auth.currentUser() ).success(function(data) {
			$scope.meals=data;
	});
	$scope.dayIndex=0;
	$scope.picked = [];
	$scope.list=[]
	var compareType=1;
	$scope.days=[{name:"Poniedziałek",meals:[] },
	{name:"Wtorek",meals:[] },
	{name:"Środa",meals:[] },
	{name:"Czwartek",meals:[] },
	{name:"Piątek",meals:[] },
	{name:"Sobota",meals:[] },
	{name:"Niedziela",meals:[] }]

	$scope.ingredients = [{name: "", count: 0, unit:""}];

	$scope.setDay = function(index){
		$scope.dayIndex=index;
	}
	$scope.addToMealsList = function(index){
		$scope.days[$scope.dayIndex].meals.push($scope.meals[index]);
		tabs = $scope.listCompare($scope.meals[index]);
		for(i=0;i<=tabs.length-1;i++){
			$scope.list.push(tabs[i]);
		}
	}
	$scope.addMeal = function(){
		$scope.meals.push({name: $scope.newMealName, products: $scope.ingredients});
		console.log($scope.meals);
		$scope.ingredients=[{name: "", value: 0, unit:""}];
		$scope.newMealName=""
	}
	$scope.addIngredient = function(){
		var newItem = $scope.ingredients.length+1;
   		$scope.ingredients.push({name: "", value: 0, unit:""});
	}
	$scope.addToList = function(tab){
		var temp = tab.products;
		var dupa=temp.length;
	}				

	$scope.listCompare = function(meal){
		var arr=[];
		var finalArr = [];
		for(i=0;i<=$scope.list.length-1;i++){
			for(j=0;j<=meal.products.length-1;j++){
				if($scope.list[i].name==meal.products[j].name && $scope.list[i].unit==meal.products[j].unit){
					if(compareType==1){
					$scope.list[i].count+=meal.products[j].count;
					}
					else{
					$scope.list[i].count-=meal.products[j].count;
					if($scope.list[i].count==0){
						$scope.list.splice(i, 1);
					}
					}
					arr.push(meal.products[j])
				}
			}
		}
		outerloop:
		for(i=0;i<=meal.products.length-1;i++){
			for(j=0;j<=arr.length-1;j++){
				if(arr[j].name==meal.products[i].name){
					continue outerloop;
				}
			}
			finalArr.push({name: meal.products[i].name,count: meal.products[i].count,unit: meal.products[i].unit });
		}
		return finalArr;
	}	
	$scope.showForm = function(){
		if($scope.showNewMealForm==false){
			$scope.showNewMealForm=true;
		}
		else{
			$scope.showNewMealForm=false;
		}
	}

	$scope.randomMealColor = function(){
		var tab = ["#ffff4d", "#88ff4d", "#66ccff","#00ffcc"]
		var number = Math.floor((Math.random() * 3) + 0);

		return tab[number];
	}

	$scope.removeItem = function(dayindex,mealindex){
		compareType=0;

		$scope.listCompare($scope.days[dayindex].meals[mealindex]);
		$scope.days[dayindex].meals.splice(mealindex, 1);
		compareType=1;
 
	}
	$scope.addSeparate = function(x,y,z){
		console.log(y)
		$scope.list.push({name: x, count: y, unit:z});
	}
}]);
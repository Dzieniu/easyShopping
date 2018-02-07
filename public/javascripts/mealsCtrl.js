angular.module('easyshopping').controller('mealsCtrl', [
'$scope','$location','auth', '$http','$q','dates','$document',

function($scope,$location,auth,$http,$q,dates,$document){

	$scope.meallistopen=false;
	$scope.week=dates.getWeekBeginning();
	$scope.currentDay = dates.getCurrentDay();
	$scope.begin=0;
	$http.get("/mealslist/"+auth.currentUser()).success(function(data){
		$scope.meals=data;
		$scope.begin=0-$scope.meals.length;
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

	$http.get("/plan/"+auth.currentUserID()).success(function(data){
		$scope.days=data.days;
		updateMealsList($scope.days)
	});
	

	$scope.ingredients = [{name: "", count: 0, unit:""}];

	var updateMealsList = function(array){
		array.forEach(function(elem,i){
			elem.meals.forEach(function(mealElem,i){
				var tabs = $scope.listCompare(mealElem);
				for(i=0;i<=tabs.length-1;i++){
					$scope.list.push(tabs[i]);
				}
			})
		})
	}
	$scope.setDay = function(index){
		$scope.dayIndex=index;
	}
	$scope.addToMealsList = function(meal){
		$scope.days[$scope.dayIndex].meals.push(meal);
		var tabs = $scope.listCompare(meal);
		for(i=0;i<=tabs.length-1;i++){
			$scope.list.push(tabs[i]);
		}
	}
	$scope.addMeal = function(){
		$scope.meals.push({name: $scope.newMealName, products: $scope.ingredients});
		$scope.ingredients=[{name: "", value: 0, unit:""}];
		$scope.newMealName=""
	}
	$scope.addIngredient = function(){
		var newItem = $scope.ingredients.length+1;
   		$scope.ingredients.push({name: "", value: 0, unit:""});
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

	$scope.moveCounter=0;
	
	$scope.moveList = function(direction){

		$scope.listEnd=Math.floor($scope.meals.length/6);
		if(direction==='left' && $scope.begin!=(0-$scope.meals.length)) {$scope.begin-=6;$scope.moveCounter--;}
		else if(direction==='right' && $scope.moveCounter!=$scope.listEnd) {$scope.begin+=6; $scope.moveCounter++;}
	}

	$scope.removeItem = function(dayindex,mealindex){
		compareType=0;

		$scope.listCompare($scope.days[dayindex].meals[mealindex]);
		$scope.days[dayindex].meals.splice(mealindex, 1);
		compareType=1;
 
	}
	$scope.addSeparate = function(x,y,z){
		$scope.list.push({name: x, count: y, unit:z});
	}

	$scope.setX = function(){
		return 0;
	}
	$scope.setY = function(){
		return 6;
	}	

	$scope.sendMail = function(){
		var sendData = {
			HTMLString :"",
			startDate:$scope.week.start,
			endDate:$scope.week.end,
			email: auth.userEmail()
		}
		$scope.days.forEach(function(elem){
			sendData.HTMLString += "<div><b>"+elem.name+"</b></div>"
			elem.meals.forEach(function(mealElem){
				sendData.HTMLString += "<div>"+mealElem.name+"</div>"
			})
			if(elem.meals.length==0){
				sendData.HTMLString += "<div>"+"Na ten dzień nie zaplanowałeś żadnych posiłków"+"</div>"
			}
		})
		sendData.HTMLString += "<br><br><div><b>"+"Lista zakupów:"+"</b></div>"
		$scope.list.forEach(function(elem){
			sendData.HTMLString += "<div>"+elem.name+" : "+elem.count+elem.unit+"</div>"
		})
		swal({
		  title: 'Trwa wysyłanie email\'a',
		  html:
		    '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>',
		  showConfirmButton:false
		});
		$http.post("/mail/plan", sendData).success(function(data2,status) {
			swal(
			  'Wysłano maila z planem',
			  '',
			  'success'
			)
		});
	}


	$scope.savePlan = function(){
		var sendData={
			startDate:$scope.week.start,
			endDate:$scope.week.end,
			days:$scope.days,
			user:auth.currentUserID()
		}

		$http.post("/plan", sendData).success(function(data2,status) {
			swal(
			  'Zapisano plan',
			  '',
			  'success'
			)
		});
	}
	$scope.removePlan = function(){
		var cleanPlan = $scope.days;
		cleanPlan.forEach(function(elem,i){
			elem.meals=[];
		})
		var sendData={
			startDate:"",
			endDate:"",
			days:$scope.days,
			user:auth.currentUserID()
		}
		$scope.list=[];
		$http.post("/plan", sendData).success(function(data2,status) {
			$http.get("/plan/"+auth.currentUserID()).success(function(data){
				$scope.days=data.days;
				swal(
					'Usunięto plan',
					'',
					'success'
				  )
				updateMealsList($scope.days)
			});
		});
	}

	$scope.openMealList = function(){
		$scope.meallistopen=true;
	}
	$scope.closeMealList = function(){
		$scope.meallistopen=false;
	}
	$scope.consolelog=function(value){
		console.log(value)
	}

	$scope.$on('$viewContentLoaded', function(){
		//animations
		var mealsList = document.getElementById("mealList")
		var showingbutton = document.getElementById("showingPanel")
		var isShow=false;
		showingbutton.addEventListener("click",function(){
			if(isShow){
				mealsList.style.animationName="slideRight";
			}else{
				mealsList.style.animationName="slideLeft";
			}
			isShow=!isShow;
		})
		//currentDaysStyle
	  });
	  
	
}]);
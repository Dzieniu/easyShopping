angular.module('easyshopping').factory('dates', ['$http', function($http){
  
var dateInfo = {};

var getToday=function(){
  return new Date();
}

dateInfo.getCurrentDay = function (){
  return getToday().getDay()
};

dateInfo.getWeekBeginning = function(){
  var tempDate = new Date();
  tempDate.setDate(tempDate.getDate()-this.getCurrentDay()+1)
  var month = tempDate.getUTCMonth() + 1; //months from 1-12
  var day = tempDate.getUTCDate();
  var year = tempDate.getUTCFullYear();

  tempDate.setDate(tempDate.getDate()+7)

  endDay=tempDate.getDate();
  endMonth=tempDate.getUTCMonth()+1;
  endYear=tempDate.getUTCFullYear();

  return {start:day+'/'+month+'/'+year, end:endDay+'/'+endMonth+'/'+endYear}
}


console.log(dateInfo.getWeekBeginning());

return dateInfo;
}])
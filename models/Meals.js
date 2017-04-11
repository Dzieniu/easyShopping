var mongoose = require('mongoose');
var MealSchema = new mongoose.Schema({
  name: String,
  username: String,
  products: [
  			{name:String,count:Number,unit:String}
  			]
});

mongoose.model('Meal', MealSchema);
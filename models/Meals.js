var mongoose = require('mongoose');
var MealSchema = new mongoose.Schema({
  name: String,
  username: String,
  products: [
  			{name:String,count:Number,unit:String}
  			],
  color: {type:String, default: function(){var tab = ["#ffff4d", "#88ff4d", "#66ccff","#00ffcc","#ff6666","#c175ec","#989898","#ffffff","#1aff45"];
	var number = Math.floor((Math.random() * 9) + 0);
	return tab[number];}} 
});

MealSchema.methods.updateMeal = function(name,products,cb){
	this.name=name;
	this.products=products;
	this.save(cb)
}


mongoose.model('Meal', MealSchema);
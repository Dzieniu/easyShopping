var mongoose = require('mongoose');

var PlanSchema = new mongoose.Schema({
  startDate:String,
  endDate:String,
  days: [
        {
          name:String,
          meals:[{type: mongoose.Schema.Types.ObjectId,ref:'Meal'}]
        }
        ],
  user:{ type: mongoose.Schema.Types.ObjectId,ref:'User' }
});

PlanSchema.methods.updatePlan = function(days,sd,ed,cb){
  this.days=days;
  this.startDate=sd;
  this.endDate=ed;
  this.save(cb)
}

mongoose.model('Plan', PlanSchema);
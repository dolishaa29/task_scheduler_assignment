let mongo=require("mongoose");
let taskmodel=mongo.Schema({
    userId:{type:String},
    title:{type:String},
    dueDate:{type:Date},
    category:{type:String},
    taskType:{type:String,enum:["completed","upcoming","planned"]},
})
module.exports=mongo.model('task',taskmodel);
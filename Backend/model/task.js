let mongo=require("mongoose");
let taskmodel=mongo.Schema({
    title:{type:String},
    dueDate:{type:Date},
    tags:{type:String},
    taskType:{type:String,enum:["completed","upcoming","planned"]},
})
let mongo=require("mongoose");
let usermodel=mongo.Schema({
    name:{type:String},
    email:{type:String},
    contact:{type:String},
    password:{type:String},
    address:{type:String},
    gender:{type:String},
    dob:{type:String}

})
module.exports=mongo.model('user','usermodel');
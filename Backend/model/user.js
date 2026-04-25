let mongo=require("mongoose");
let usermodel=mongo.Schema({
    name:{type:String},
    email:{type:String},
    contact:{type:String},
    password:{type:String},
    address:{type:String, default:null},
    gender:{type:String, default:null},
    dob:{type:String,default:null},
    bio:{type:String, default:null}

})
module.exports=mongo.model('user','usermodel');
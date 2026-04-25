let rec=require('./model/user');
let jwt=require('jsonwebtoken');
let bct=require('bcryptjs');

exports.register=async(req,res)=>
{
    try{
    let name=req.body.name;
    let email=req.body.email;
    let contact=req.body.contact;
    let password=req.body.password;
    let address=req.body.address;
    let bio=req.body.bio;
    let gender=req.body.gender;
    let dob=req.body.dob;
    let user=await rec.findOne({email:email});
    if(user)
    {        res.status(400).json({msg:"user already exists"});
    }
    else{
        let hash=await bcrypt.hash(password,10);
        let newuser=new rec({ email:email,password:hash,name:name,contact:contact,address:address,bio:bio,gender:gender,dob:dob});
        await newuser.save();
        res.status(200).json({msg:"user registered successfully"});
    }
}
catch(err)
{
    console.log(err);
    res.status(500).json({msg:"internal server error"});
}
    
}

exports.login=async(req,res)=>
{
    try{
    let email=req.body.email;
    let password=req.body.password;
    let data=await rec.findOne({email:email});
    if(!data)
    {
        res.status(400).json({msg:"user not found"});
    }
    lpass=data.password;
    let pass=await bcrypt.compare(password,lpass);
    if(pass)
    {
    let token=jwt.sign({token:data.email},process.env.JWT_SECRET,{expiresIn:"1h"});
    
    res.cookie("token",token ,
        {
        httpOnly: true,
        secure: true,
        sameSite: "none",   
    });
    console.log("token:",token);
    res.status(200).json({msg:"user logged in successfully",token:token});
    }
    else{
        res.status(400).json({msg:"invalid password"});
    }

}
catch(err)
{
    console.log(err);
    res.status(500).json({msg:"internal server error"});
}
}
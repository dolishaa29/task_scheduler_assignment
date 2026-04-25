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

exports.userprofile=async(req,res)=>
{
    const user = req.user;
    return res.status(200).json({success: true,user})
}

exports.updateuser=async(req,res)=>
{
    const user=req.user;
    let updatedData={
        name:req.body.name,
        contact:req.body.contact,
        address:req.body.address,
        gender:req.body.gender,
        dob:req.body.dob,
        bio:req.body.bio,
    }
    let updateduser= await rec.findOneAndUpdate({_id:user._id},updatedData,{new:true});
    return res.status(200).json({ success: true, msg: "User profile updated successfully", user:updateduser });
}

exports.changepassword=async(req,res)=>
{
    try{
    const user=req.user;
    let oldpassword=req.body.oldpassword;
    let newpassword=req.body.newpassword;
    let data=await rec.findById(user._id);
    let existing=data.password;
    let pass=await bcrypt.compare(oldpassword,existing);
    if(!pass)
    {
        return res.status(400).json({msg:"invalid old password"});
    }
    newpassword=await bcrypt.hash(newpassword,10);
    await rec.findByIdAndUpdate(user._id,{password:newpassword});
    return res.status(200).json({success:true, msg:"password updated successfully"});
}
catch(err)
{
    console.log(err);
    res.status(500).json({msg:"internal server error"});
}
}
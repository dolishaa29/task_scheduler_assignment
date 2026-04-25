let rec=require('./model/user');
let rec2=require('./model/task');
let jwt=require('jsonwebtoken');
let bct=require('bcryptjs');

exports.register=async(req,res)=>
{
    try{
        console.log("hi")
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
        let hash=await bct.hash(password,10);
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
    let pass=await bct.compare(password,lpass);
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

exports.taskadd=async(req,res)=>
{
  let user=req.user._id;
  let title=req.body.title;
  let dueDate=req.body.dueDate;
  let tags=req.body.tags;
  let taskType=req.body.taskType;
  

  let task=new rec2({userId:user,title:title,dueDate:dueDate,tags:tags,taskType:taskType});
  await task.save();
  res.status(201).json({success:true , msg:"task added successfully"});
}

exports.deletetask=async(req,res)=>
{
  try {
        console.log("hi")
        const id = req.body.id;
        console.log(id);
        const user = await rec2.findByIdAndDelete(id);
        console.log(user)

        res.status(200).json({
            success: true,
            message: "user deleted successfully",
            
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "some err",
            error: error.message
        });
    }
}

exports.viewtask = async (req, res) => {
    try {
        const userId = req.user._id;

        const tasks = await rec2.find({ userId: userId });

        res.status(200).json({
            success: true,
            tasks: tasks
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "internal server error" });
    }
};

exports.updatestatus = async (req, res) => {
    try {
        const taskId = req.body.id;

        const updatedTask = await rec2.findByIdAndUpdate(
            taskId,
            { status: "completed" },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ msg: "task not found" });
        }

        res.status(200).json({
            success: true,
            msg: "task marked as completed",
            task: updatedTask
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "internal server error" });
    }
};


exports.guestlogin=async(req,res)=>
{
    try{
    let email="guest@gmail.com";
    let password="guest123";
    let data=await rec.findOne({email:email});
    if(!data)
    {
        res.status(400).json({msg:"user not found"});
    }
    lpass=data.password;
    let pass=await bct.compare(password,lpass);
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
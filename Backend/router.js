let express=require("express");
const { register, login, guestlogin, userprofile, updateuser, changepassword, taskadd, viewtask, updatestatus, deletetask } = require("./service");
let router=express.Router();
let auth=require('./middleware/user');
router.post("/regiter",register);
router.post("/login",login);
router.post("/guestlogin",guestlogin);
router.get("/userprofile",auth,userprofile);
router.put("/updateuser",auth,updateuser);
router.post("/changepassword",auth,changepassword);
router.post("/addtask",auth,taskadd);
router.get("/viewtask",auth,viewtask);
router.put("/updatestatus",updatestatus);
router.post("/deletetask",deletetask);


module.exports=router;
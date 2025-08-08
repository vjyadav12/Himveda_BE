import jwt from "jsonwebtoken";
import User from "../DBSchema/UserSchema.js";


const UserAuthentication = async(req,res,next)=>{
    const {tokennn} = req.cookies;

    const user_id = await jwt.verify(tokennn,"Vijay@123");
    console.log(user_id._id)
    const ID =user_id._id;

    const user = User.findOne({ID});
    if(!user){
        return res.status(400).json({
            success:false,
            message:"Token is expire"
        })
    }

    res.user = user;
    next()

    // next 

}

export default UserAuthentication;
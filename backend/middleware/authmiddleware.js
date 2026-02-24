import jwt from "jsonwebtoken";
import userModel  from "../models/userModel.js";


const protect=async(req,res,next)=>{
    let token;
    if(req.cookies && req.cookies.token) { 
        token=req.cookies.token;
    } else if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if(token){
    try {
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await userModel.findById(decoded.id).select('-password');
            if(!req.user){
                res.status(401);
                throw new Error('Not authorized, user not found');
            }
            if (process.env.REQUIRE_EMAIL_VERIFICATION === "true" && req.user.emailVerified === false) {
                res.status(403);
                throw new Error('Email not verified');
            }
            return next();
    }catch(error)
            {    console.error(error);

                // Handle expired token
if(error.name==='TokenExpiredError'){
    res.status(401);
    throw new Error ('Token expired,please login again')
}
// Handle other JWT errors (invalid token)
 res.status(401);
throw new Error('Not authorized, token failed');


            } 
}else

{
    res.status(401);
    throw new Error('Not authorized, no token');

}}
const admin =(req,res,next)=>{

    if(req.user && (req.user.isAdmin || req.user.role === "admin")){
        return next();
    }
    res.status(403);
    throw new Error('Not authorized as admin');
}
export { protect, admin }

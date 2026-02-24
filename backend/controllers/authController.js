import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import crypto from "crypto";
import userModel  from "../models/userModel.js";
import asyncHandler from 'express-async-handler'
import { sendEmail } from "../utils/sendEmail.js";

const generateToken=(id)=>{
   return jwt.sign({id},process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRE||'1h'
   }) ;
};

const generateRefreshToken=(id)=>{
   return jwt.sign({id},process.env.JWT_REFRESH_SECRET,{
      expiresIn:process.env.JWT_REFRESH_EXPIRE||'2h'
   });
};

const setTokenCookie=(res,token,isRefresh=false)=>{
   const CookieName=isRefresh
   ?'refreshToken':'token'
   const maxAge=isRefresh 
   ? 30 * 24 * 60 * 60 * 1000 // 30 days
    : 7 * 24 * 60 * 60 * 1000; // 7 days
   //  sending 3 things to the client (2variables and 1 object)
    res.cookie(CookieName,token,{httpOnly: true,
                              secure: process.env.NODE_ENV === 'production',
                               sameSite: process.env.COOKIE_SAMESITE || 'strict', 
                             //  sameSite: 'none',   for third party authentication
                              maxAge: maxAge,
                               path: '/'
   })

}

const clearTokenCookie = (res, isRefresh=false) => {
  const CookieName=isRefresh ? 'refreshToken' : 'token';
  res.clearCookie(CookieName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.COOKIE_SAMESITE || 'strict',
    path: '/',
  });
};

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const buildAppUrl = (path) => {
  const base = process.env.FRONTEND_URL || "http://localhost:5173";
  return `${base}${path}`;
};

const shouldLock = (user) => {
  if (!user.lockUntil) return false;
  return user.lockUntil.getTime() > Date.now();
};



export const login=asyncHandler(async(req,res)=>{
const {email,password}=req.body;

if(!email||!password){
   res.status(400);
   throw new Error('please provide email and password')
}
  // Find user and include password field 
// const user=await userModel.findOne({email:email.toLowerCase()}).select('+password');
const user=await userModel.findOne({email:email.toLowerCase()}).select('+password');
 if (user && shouldLock(user)) {
   res.status(423);
   throw new Error('Account locked. Try again later.');
 }
 if (user && (await user.matchPassword(password))) { 
   if (!user.emailVerified) {
     res.status(403);
     throw new Error('Please verify your email before logging in.');
   }

   const accessToken = generateToken(user._id);
   const refreshToken = generateRefreshToken(user._id);
   
   user.refreshToken = refreshToken;
   user.failedLoginAttempts = 0;
   user.lockUntil = null;
   await user.save();

  setTokenCookie(res, accessToken);
  setTokenCookie(res, refreshToken, true);
   

  res.status(200).json({
    success: true,
    message: 'Login successful',
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar
    }
  });


} else { 
   if (user) {
     user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
     const maxAttempts = Number(process.env.MAX_LOGIN_ATTEMPTS || 5);
     const lockMinutes = Number(process.env.LOCKOUT_MINUTES || 15);
     if (user.failedLoginAttempts >= maxAttempts) {
       user.lockUntil = new Date(Date.now() + lockMinutes * 60 * 1000);
     }
     await user.save();
   }
   res.status(400);
   throw new Error('Invalid email or password')

  }
});


export const logoutUser = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies || {};
  if (refreshToken) {
    await userModel.findOneAndUpdate({ refreshToken }, { refreshToken: "" });
  }
  clearTokenCookie(res);
  clearTokenCookie(res, true);
  res.status(200).json({ message: 'Logged out successfully' });
});




















export const register=asyncHandler(async(req,res)=>{
   const {name,email,password}=req.body;
   if(!email||!name||!password){
      res.status(400);
      throw new Error('Please provide all required fields')
   };
    const userExists = await userModel.findOne({ email: email.toLowerCase() });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists with this email');
  };

   const verifyToken = crypto.randomBytes(32).toString("hex");
   const verifyTokenHash = hashToken(verifyToken);
   const user = await userModel.create({
    name,
    email: email.toLowerCase(),
    password,
    emailVerified: false,
    emailVerifyToken: verifyTokenHash,
    emailVerifyExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
  if(user){
   // Generate tokens
    const accessToken = generateToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    // Save refresh token to database
    user.refreshToken = refreshToken;
    await user.save();

    // Set cookies
    setTokenCookie(res, accessToken);
    setTokenCookie(res, refreshToken, true);

    const verifyUrl = buildAppUrl(`/verify-email?token=${verifyToken}`);
    await sendEmail({
      to: user.email,
      subject: "Verify your email",
      text: `Verify your email: ${verifyUrl}`,
    });

      res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar
      }
    });


  }else{
    res.status(400);
    throw new Error('Invalid user data');
  }

}); // end of register

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;
  if (!token) {
    res.status(400);
    throw new Error("Token is required");
  }
  const tokenHash = hashToken(token);
  const user = await userModel.findOne({
    emailVerifyToken: tokenHash,
    emailVerifyExpires: { $gt: new Date() },
  });
  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired token");
  }

  user.emailVerified = true;
  user.emailVerifyToken = "";
  user.emailVerifyExpires = null;
  await user.save();
  res.json({ message: "Email verified successfully" });
});

export const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const user = await userModel.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.json({ message: "If the email exists, a reset link was sent." });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = hashToken(resetToken);
  user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();

  const resetUrl = buildAppUrl(`/reset-password?token=${resetToken}`);
  await sendEmail({
    to: user.email,
    subject: "Reset your password",
    text: `Reset your password: ${resetUrl}`,
  });

  res.json({ message: "If the email exists, a reset link was sent." });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) {
    res.status(400);
    throw new Error("Token and password are required");
  }

  const user = await userModel.findOne({
    resetPasswordToken: hashToken(token),
    resetPasswordExpires: { $gt: new Date() },
  });
  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired token");
  }

  user.password = password;
  user.resetPasswordToken = "";
  user.resetPasswordExpires = null;
  user.failedLoginAttempts = 0;
  user.lockUntil = null;
  await user.save();

  res.json({ message: "Password reset successfully" });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(user);
});

export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error("Current and new password are required");
  }

  const user = await userModel.findById(req.user._id).select("+password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const match = await user.matchPassword(currentPassword);
  if (!match) {
    res.status(400);
    throw new Error("Current password is incorrect");
  }

  user.password = newPassword;
  await user.save();
  res.json({ message: "Password updated successfully" });
});


export const refreshToken=asyncHandler(async(req,res)=>{

const {refreshToken}=req.cookies;
if(!refreshToken){
   res.status(401);
    throw new Error('Refresh token not found');
};
try{ 
const decoded=jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);
const user=await userModel.findById(decoded.id);
if(!user || !user.refreshToken || user.refreshToken !== refreshToken){
  res.status(401);
  throw new Error('Invalid refresh token');
}
const newAccessToken = generateToken(user._id);
const newRefreshToken = generateRefreshToken(user._id);
user.refreshToken = newRefreshToken;
await user.save();
setTokenCookie(res, newAccessToken);
setTokenCookie(res, newRefreshToken, true);

 res.status(200).json({
      success: true,
      message: 'Token refreshed successfully'
    });
  } catch (error) {
    res.status(401);
    throw new Error('Invalid or expired refresh token');
  }
});






























 


// export const profile=async(req,res)=>{
//    try{
//    const user=await userModel.findById(req.user).select("-password");
//    if(!user) return res.status(404).json({message:"user not found here"});
//  res.json(user);
// }catch(error){
// res.status(500).json({message:"server error"})
// }
// }





















// 
            
// export const register = (req, res) => {
//   const { email, password } = req.body;

//   // Check if user already exists
//   userModel.findOne({ email })
//     .then(existingUser => {
//       if (existingUser) {
//         return res.json("User already exists");
//       }

//       // Hash password
//       bcrypt.hash(password, 10)
//         .then(hashedPassword => {
//           const newUser = new userModel({ email, password: hashedPassword });
//           newUser.save()
//             .then(() => res.json("User registered successfully"))
//             .catch(err => {
//               console.error(err);
//               res.status(500).json("Error saving user");
//             });
//         })
//         .catch(err => {
//           console.error(err);
//           res.status(500).json("Error hashing password");
//         });
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json("Database error");
//     });
// };








// export const login = (req, res) => {
//   const { email, password } = req.body;

//   console.log("Request received:", req.body);

//   // FAKE USER for testing
//   const fakeUser = {
//     email: "test@example.com",
//     password: "123456",
//     name: "Test User",
//     id: 1
//   };

//   if (email === fakeUser.email && password === fakeUser.password) {
//     return res.json({
//       success: true,
//       message: "Login successful",
//       user: {
//         id: fakeUser.id,
//         name: fakeUser.name,
//         email: fakeUser.email,
//       }
//     });
//   }

//   return res.status(400).json({
//     success: false,
//     message: "Invalid email or password"
//   });
// };

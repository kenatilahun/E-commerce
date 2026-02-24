import mongoose from "mongoose";
import bcrypt from "bcryptjs";
  
const userSchema=new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  phone: { type: String, default: "" },
  avatar: { type: String, default: "" },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  isAdmin: { type: Boolean, default: false },
  refreshToken: { type: String, default: "" },
}, { timestamps: true });

userSchema.methods.matchPassword=async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save',async function(next) {
  if (!this.isModified('password')) return next();
  const salt=await bcrypt.genSalt(10);
  this.password=await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre('save',function(next) {
  if (this.isModified('role') && !this.isModified('isAdmin')) {
    this.isAdmin = this.role === 'admin';
  }
  if (this.isModified('isAdmin') && !this.isModified('role')) {
    this.role = this.isAdmin ? 'admin' : 'user';
  }
  next();
});

const userModel=mongoose.model("users",userSchema)
export default userModel

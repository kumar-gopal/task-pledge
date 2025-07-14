import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email address"],
    unique: true,
  },
  password : {
    type : String,
    required : true
  },
  isVerified : {
    type : Boolean,
  }
},{timestamps:true});

const User = mongoose.model("User", userSchema);
export default User;

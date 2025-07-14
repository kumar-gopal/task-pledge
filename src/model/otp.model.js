import { required } from "joi";
import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email address"],
        unique: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiredAt:{
        type : Date(),
        required : true
    }
},{timestamps:true});

otpSchema.index({expiredAt : 1},{expreAfterSeconds:0});
const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
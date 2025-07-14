import { required } from "joi";
import mongoose from "mongoose";


const refreshTokenSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User
    },
    token:{
        type:String,
        required:true
    },
    expiredAt : {
        type : Date(),
        required : true
    }
},{timestamps:true});

refreshTokenSchema.index({expiredAt : 1},{expireAfterSeconds:0});

const RefreshToken = mongoose.model("RefreshToken",refreshTokenSchema);
export default RefreshToken;
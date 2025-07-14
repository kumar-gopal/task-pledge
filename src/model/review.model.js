import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  taskId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task", 
    required: true,
  },
  comment: {
    type: String,
    required: true,
    minlength: 10, 
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 4,
  },
}, { timestamps: true });


const Review = mongoose.model("Review", reviewSchema);

export default Review;

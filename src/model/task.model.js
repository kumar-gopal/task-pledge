// models/Task.js
import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  proofUrls: {
    type: [String],
    required: true,
  },
  comment: String,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  feedback: {
    type: String,
  },
});

const PaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  schedule: {
    type: String,
    enum: ['on-submission', 'on-approval', 'upfront'],
    default: 'on-approval',
  },
  status: {
    type: String,
    enum: ['scheduled', 'paid', 'refunded', 'sent-to-charity'],
    default: 'scheduled',
  },
  charityFund: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CharityFund',
  },
});

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['tech', 'education', 'social', 'design', 'health', 'other'],
      default: 'other',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    deadline: Date,
    proofMode: {
      type: [String],
      enum: ['pdf', 'screenshot', 'link', 'text', 'video'],
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'in-review', 'completed', 'failed', 'closed'],
      default: 'open',
    },
    submission: SubmissionSchema, // Embedded because 1:1
    payment: PaymentSchema,       // Embedded for simplicity
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);
export default Task;

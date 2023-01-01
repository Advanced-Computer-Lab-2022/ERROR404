const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const refundRequests = new Schema(
  {
    status: {
      type: String,
      enum: ["unseen", "approved", "rejected"],
      default: "unseen",
    },
    
    username: {
      type: String,
      required: true,
    },

    userType: {
      type: String,
      required: true,
    },

    courseId: {
      type: String,
      required: true, 
    },
   
  issueDate: {
    type: Date,
    default: Date.now(),
  },
  },
  { timestamps: true }
);

const RefundRequests = mongoose.model("refundRequests", refundRequests);
module.exports = RefundRequests;

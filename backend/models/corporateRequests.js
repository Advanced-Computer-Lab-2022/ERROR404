const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const corporateRequests = new Schema(
  {
    status: {
      type: String,
      enum: ["unseen","approved", "pending", "rejected"],
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

    courseTitle: {
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

const CorporateRequests = mongoose.model("corporateRequests", corporateRequests);
module.exports = CorporateRequests;

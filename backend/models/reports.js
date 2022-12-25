const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reports = new Schema(
  {
    problemType: {
        type: String,
        enum: ["technical", "financial", "other"],
        required: true,
    },
    problem: {
      type: String,
      minLength: 5,
      required: true,
  },
    issueDate: {
      type: Date,
      default: Date.now(),
    },
    status: {
        type: String,
        enum: ["pending","resolved"],
        default: "unseen",
    }    
  },
  { timestamps: true }
);

const Reports = mongoose.model("Reports", reports);
module.exports = Reports;

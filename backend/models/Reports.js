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
    },
    issueDate: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: ["unseen", "pending", "resolved"],
      default: "unseen",
    },
    description: {
      type: String,
      required: [true, "Description Required"],
      minLength: 10,
      maxLength: 100,
    },
    user: {
      type: String,
      required: true,
    },
    usertype: {
      type: String,
      required: true,
      enum: ["instructor", "individual", "corporate", "admin"],
    },
  },
  { timestamps: true }
);

const Reports = mongoose.model("Reports", reports);
module.exports = Reports;

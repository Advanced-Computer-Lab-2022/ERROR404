const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reports = new Schema(
  {
    status: {
      type: String,
      enum: ["unseen", "pending", "finished"],
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

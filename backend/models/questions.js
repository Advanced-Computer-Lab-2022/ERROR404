const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questions = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      enum: ["a", "b", "c", "d"],
      required: true,
    },
    options: {
      type: Map,
      of: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Questions = mongoose.model("Questions", questions);
module.exports = Questions;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizzes = new Schema(
  {
    questions: [{ type: Schema.Types.ObjectId, default: [] }],
  },
  { timestamps: true }
);

const Quizzes = mongoose.model("Quizzes", quizzes);
module.exports = Quizzes;



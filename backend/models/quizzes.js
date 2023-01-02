const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizzes = new Schema(
  {
    subtitle: {
      type: String,
      required: true,
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        answerA: {
          type: String,
          required: true,
        },
        answerB: {
          type: String,
          required: true,
        },
        answerC: {
          type: String,
          required: true,
        },
        answerD: {
          type: String,
          required: true,
        },
        correctAnswer: {
          type: String,
          enum: ["a", "b", "c", "d"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Quizzes = mongoose.model("Quizzes", quizzes);
module.exports = Quizzes;

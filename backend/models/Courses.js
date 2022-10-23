const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const courses = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    totalHours: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    summary: {
      type: String,
      required: [true, "Summary Required"],
      minLength: 5,
      maxLength: 100,
    },
    discount: {
      type: Number,
    },
    image: {
      type: String,
      required: [true, "Image Required"],
    },
    video: {
      required: [true, "Video Required"],
      type: String,
    },
    prerequisite: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Courses = mongoose.model("courses", courses);
module.exports = Courses;

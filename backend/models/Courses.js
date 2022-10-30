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
    },
    rating: {
      type: Number,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },

    subtitles:{
      type: String,
      required: true,
      minLength:5,
      maxLength:200,
    },

    exercises:{
      type: String,
      required: false,

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
    },
    video: {
      type: String,
    },
    prerequisite: {
      type: String,
    },
  },
  { timestamps: true }
);

const Courses = mongoose.model("courses", courses);
module.exports = Courses;

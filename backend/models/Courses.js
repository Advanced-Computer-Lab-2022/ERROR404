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
      default: 0,
    },
    rating: {
      type: Number,
      default: 5,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },

    subtitles: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 200,
      default: "",
    },

    exercises: {
      type: Array,
      default: [],
    },

    summary: {
      type: String,
      required: [true, "Summary Required"],
      minLength: 5,
      maxLength: 100,
    },
    discount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    video: {
      type: Array,
      default: [],
    },
    prerequisite: {
      type: String,
      default: "",
    },
    views: {
      type: Number,
      default: 0,
    },
    review: {
      type: Array,
      default: [],
    },
    numberOfSubscribers: {
      type: Number,
      default: 0,
    },
    preview: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Courses = mongoose.model("courses", courses);
module.exports = Courses;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instructor = new Schema(
  {
    firstname: {
      type: String,
      minLength: 3,
      validate: {
        validator: (value) => /^[A-Za-z]+$/.test(value),
        message: "firstname is not a valid name!",
      },
      default: "UnNamed",
    },
    lastname: {
      type: String,
      minLength: 3,
      validate: {
        validator: (value) => /^[A-Za-z]+$/.test(value),
        message: "lastname not a valid name!",
      },
      default: "UnNamed",
    },
    age: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Not Defined"],
      default: "Not Defined",
    },
    password: { type: String, required: true },

    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      //unique: true,
      // required: true
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "Instructor",
    },
    courses: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
    },
    wallet: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 5,
    },
    biography: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Instructor = mongoose.model("instructor", instructor);
module.exports = Instructor;

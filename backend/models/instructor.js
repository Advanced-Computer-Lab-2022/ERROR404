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
      required: [true, "Name is required"],
    },
    lastname: {
      type: String,
      minLength: 3,
      validate: {
        validator: (value) => /^[A-Za-z]+$/.test(value),
        message: "lastname not a valid name!",
      },
      required: [true, "Name is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Not Defined"],
      default: "Not Defined",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Vaild email is required"],
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
    review: {
      type: Array,
      default: [],
    },
    biography: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: Number,
      default: 0,
      maxLength: 15,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Instructor = mongoose.model("instructor", instructor);
module.exports = Instructor;

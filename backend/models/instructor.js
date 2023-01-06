const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const instructor = new Schema(
  {
    firstname: {
      type: String,
      minLength: 3,
      validate: {
        validator: (value) => /^[A-Za-z]+$/.test(value),
        message: "firstname is not a valid name!",
      },
    },
    lastname: {
      type: String,
      minLength: 3,
      validate: {
        validator: (value) => /^[A-Za-z]+$/.test(value),
        message: "lastname not a valid name!",
      },
    },
    age: {
      type: Number,
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
      // unique: true,
    },
    country: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "instructor",
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
      default: 0,
    },
    review: [
      {
        username: {
          type: String,
          default: "",
        },
        review: {
          type: String,
          default: "",
        },
      },
    ],
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
    chats: {
      type: ObjectId,
      ref: "chats",
    },
  },
  { timestamps: true }
);

const Instructor = mongoose.model("instructor", instructor);
module.exports = Instructor;

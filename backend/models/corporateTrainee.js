const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const corporateTrainee = new Schema(
  {
    firstname: {
      type: String,
      minLength: 3,
      validate: {
        validator: (value) => /^[A-Za-z]+$/.test(value),
        message: "firstname is not a valid name!",
      },
      default: "UnNamed",
      //required: [true, "Name is required"],
    },
    lastname: {
      type: String,
      minLength: 3,
      validate: {
        validator: (value) => /^[A-Za-z]+$/.test(value),
        message: "lastname not a valid name!",
      },
      //required: [true, "Name is required"],
      default: "UnNamed",
    },
    age: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Not Defined"],
      default: "Not Defined Yet",
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
      default: "Corporate-trainee",
    },
  },

  { timestamps: true }
);

const CorporateTrainee = mongoose.model("corporateTrainee", corporateTrainee);
module.exports = CorporateTrainee;

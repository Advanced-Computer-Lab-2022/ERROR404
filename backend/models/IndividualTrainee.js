const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const individualTrainee = new Schema(
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
      enum: ["male", "female", "Not Defined"],
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
      default: "Individual-trainee",
    },
    creditCardInfo: [
      {
        holderName: {
          type: String,
          default: "",
        },
        cardNumber: {
          type: String,
          default: "000000000000",
          minlength: 14,
          maxlength: 14,
        },
        cvv: {
          type: Number,
          minlength: 3,
          maxlength: 3,
          default: 000,
        },
        expirationDate: {
          type: Date,
          validator: (value) => {
            value >= Date.now();
          },
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

const IndividualTrainee = mongoose.model(
  "IndividualTrainee",
  individualTrainee
);
module.exports = IndividualTrainee;

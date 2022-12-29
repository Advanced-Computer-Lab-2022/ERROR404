const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const individualTrainee = new Schema(
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
      enum: ["male", "female", "Not Defined"],
      default: "Not Defined",
    },

    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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
      default: "individual",
    },
    Regcourses: {
      type: Array,
      default: [],
    },
    grades: {
      type: Map,
      default: "",
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

    progress: [
      {
        course: {
          type: String,
        },
        progress: {
          type: Number,
        },
      },
    ],
    chats: {
      type: ObjectId,
      ref: "Chats",
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const IndividualTrainee = mongoose.model(
  "IndividualTrainee",
  individualTrainee
);
module.exports = IndividualTrainee;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema(
  {
    firstName: {
      type: String,
      minLength: 3,
      validate: {
        validator: (value) => /^[A-Za-z]+$/.test(value),
        message: "firstname is not a valid name!",
      },
      required: [true, "Name is required"],
    },
    lastName: {
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
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    password: { type: String, required: true },

    userName: {
      type: String,
      unique: true,
      required: true,
    },
    email: { type: String, unique: true, required: true },
    country: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Instructor", "Individual-trainee", "Admin", "Corporate-trainee"],
      required: [true, "role is required"],
    },
    instructorAttributes: [
      {
        courses: { type: Schema.Types.ObjectId, ref: "Courses" },
        wallet: {
          type: Number,
        },
        rating: {
          type: Number,
        },
        biography: {
          type: String,
        },
      },
    ],
    indivisualTraineeAttributes: {
      creditCardInfo: [
        {
          holderName: {
            type: String,
          },
          cardNumber: {
            type: String,
          },
          cvv: {
            type: Number,
            validator: (value) => {
              value.toString().length == 3;
            },
          },
          expirationDate: {
            type: Date,
            validator: (value) => {
              value > Date.now();
            },
          },
        },
      ],
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", user);
module.exports = User;

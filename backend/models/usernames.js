const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usernames = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Usernames = mongoose.model("Usernames", usernames);
module.exports = Usernames;

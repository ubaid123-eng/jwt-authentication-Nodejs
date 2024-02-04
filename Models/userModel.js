const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: String,
  MobileNum: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("user", Userschema);

module.exports = User;

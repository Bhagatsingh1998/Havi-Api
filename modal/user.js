const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    // unique: true,
    // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  id: {type: String, required: true},
  password: { type: String, required: true },
  name: { type: String, required: true },
  dob: { type: String, required: true },
  avtarNumber: { type: String, required: true },
  gender: { type: String, required: true },
  userName: { type: String, required: true},
  signupTime: { type: String, required: true },
  phone: { type: String, required: true },
  userType: {type: String, require: true},
  loggedIn: [],
  toDoList: []
});

module.exports = mongoose.model("User", userSchema);

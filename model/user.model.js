const mongoose = require("mongoose");
const moment = require("moment");

let newUserSchema = mongoose.Schema({
  userName: { type: String },
  password: { type: String },
});

module.exports = new mongoose.model("Users", newUserSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    viewers_ip: {
      type: String,
      required: true,
    },
    refresh: {
      type: Number,
      required: true,
    },
    visit: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

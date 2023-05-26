const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    viewers_ip: {
      type: String,
      default: null,
    },
    refresh: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

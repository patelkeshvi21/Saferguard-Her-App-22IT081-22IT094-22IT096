const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true, unique: true },
  password: { type: String },
  otp: { type: String },
  name: { type: String },
  gender: { type: String },
  image: { type: String },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
  sosFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  sharedLocationWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  sosHistory: [{ type: Date }],
  blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  requestedFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  onboarded: {
    type: Boolean,
    default: false,
  },
});

userSchema.index({ location: "2dsphere" });
const User = mongoose.model("User", userSchema);

module.exports = User;

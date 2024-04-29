const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const generateOTP = require("../helpers/generateOTP");

exports.signup = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    let user = await User.findOne({ mobileNumber });
    let otp = generateOTP(); // Use the generateOTP function

    if (!user) {
      // Save user and OTP to database
      user = new User({ mobileNumber, otp });
      await user.save();
    } else {
      // Update OTP in the database
      user.otp = otp;
      await user.save();
    }

    // Implement logic to send OTP to user (e.g., send OTP via email)

    // Generate JWT token
    const token = jwt.sign(
      { mobileNumber: user.mobileNumber },
      "mysecretkey123"
    );

    res
      .status(201)
      .json({ message: "User created successfully", mobileNumber, otp, token });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    let user = await User.findOne({ mobileNumber });
    let otp;

    if (!user) {
      // Generate OTP if user doesn't exist
      otp = generateOTP();
      // Create a new user with the generated OTP
      user = new User({ mobileNumber, otp });
      await user.save();
    } else {
      // Generate a new OTP for existing user
      otp = generateOTP();
      // Update OTP in the database
      user.otp = otp;
      await user.save();
    }

    // Implement logic to send OTP to user (e.g., send OTP via email)

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "mysecretkey123");
    res.status(200).json({ token, userId: user._id, otp });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.otp === otp) {
      // OTP is correct
      return res.status(200).json({ message: "OTP is valid" });
    } else {
      // OTP is incorrect
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error in OTP verification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.checkOnboarded = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ onboarded: user.onboarded });
  } catch (error) {
    console.error("Error in checking onboarded status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createPassword = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(201).json({ message: "Password created successfully" });
  } catch (error) {
    console.error("Error in creating password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.completeProfile = async (req, res) => {
  try {
    const { mobileNumber, name, gender } = req.body;
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user profile with name and gender
    user.name = name;
    user.gender = gender;
    user.onboarded = true;

    await user.save();

    res.status(201).json({ message: "Profile completed successfully" });
  } catch (error) {
    console.error("Error in completing profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const Friend = require("../models/friend.model");

exports.getAllUsers = async (req, res) => {
  try {
    // Get the mobile number from the URL params
    const mobileNumber = req.params.mobileNumber;

    // Ensure mobileNumber is provided
    if (!mobileNumber) {
      return res.status(400).json({ error: "Mobile number is missing" });
    }

    // Find the user based on the mobile number
    const user = await User.findOne({ mobileNumber });

    // Ensure user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get all users
    const users = await User.find();

    // Get current user's friends and friend requests
    const userFriends = await Friend.find({
      user: user._id,
      status: "accepted",
    }).select("friend");
    const userFriendRequests = await Friend.find({
      user: user._id,
      status: "pending",
    }).select("friend");

    // Map over all users to include friendship and friend request status
    const usersWithStatus = users.map((user) => {
      // Check if the current user is a friend of this user
      const isFriend = userFriends.some((friend) =>
        friend.friend.equals(user._id)
      );

      // Check if the current user has sent a friend request to this user
      const hasSentRequest = userFriendRequests.some((request) =>
        request.friend.equals(user._id)
      );

      // Check if this user has sent a friend request to the current user
      const hasReceivedRequest = userFriends.some((friend) =>
        friend.friend.equals(user._id)
      );

      return {
        ...user.toObject(),
        isFriend,
        hasSentRequest,
        hasReceivedRequest,
      };
    });

    res.status(200).json(usersWithStatus);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

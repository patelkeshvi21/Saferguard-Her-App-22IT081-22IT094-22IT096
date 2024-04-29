const Friend = require("../models/friend.model");
const User = require("../models/user.model");

exports.getFriendRequests = async (req, res) => {
  try {
    const { userId } = req.params;

    const friendRequests = await Friend.find({
      friend: userId,
      status: "pending",
    }).populate("user", "name");

    res.status(200).json(friendRequests);
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    const existingFriendship = await Friend.findOne({
      user: userId,
      friend: friendId,
    });

    if (existingFriendship) {
      return res.status(400).json({ message: "Friendship already exists" });
    }

    const friend = new Friend({ user: userId, friend: friendId });
    await friend.save();

    // Fetch the updated friendship with user details
    const updatedFriendship = await Friend.findById(friend._id).populate(
      "friend",
      "name image"
    );

    res.status(201).json({
      message: "Friend added successfully",
      friend: updatedFriendship,
    });
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addFriendsByContacts = async (req, res) => {
  try {
    const { userId, contactNumbers } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchingUsers = await User.find({
      mobileNumber: { $in: contactNumbers },
    });

    const newFriends = await Promise.all(
      matchingUsers.map(async (matchingUser) => {
        const existingFriendship = await Friend.findOne({
          user: userId,
          friend: matchingUser._id,
        });

        if (existingFriendship) {
          return null;
        }

        const friend = new Friend({ user: userId, friend: matchingUser._id });
        await friend.save();

        return matchingUser;
      })
    );

    const addedFriends = newFriends.filter((friend) => friend !== null);

    res
      .status(201)
      .json({ message: "Friends added successfully", addedFriends });
  } catch (error) {
    console.error("Error adding friends by contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.acceptFriend = async (req, res) => {
  try {
    const { id } = req.params;

    const friendship = await Friend.findById(id);

    if (!friendship) {
      return res.status(404).json({ message: "Friendship not found" });
    }

    friendship.status = "accepted";
    await friendship.save();

    res.status(200).json({ message: "Friend request accepted", friendship });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.rejectFriend = async (req, res) => {
  try {
    const { id } = req.params;

    const friendship = await Friend.findById(id);

    if (!friendship) {
      return res.status(404).json({ message: "Friendship not found" });
    }

    friendship.status = "rejected";
    await friendship.save();

    res.status(200).json({ message: "Friend request rejected", friendship });
  } catch (error) {
    console.error("Error rejecting friend request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const { id } = req.params;

    const friendship = await Friend.findById(id);

    if (!friendship) {
      return res.status(404).json({ message: "Friendship not found" });
    }

    await friendship.remove();

    res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    console.error("Error removing friend:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

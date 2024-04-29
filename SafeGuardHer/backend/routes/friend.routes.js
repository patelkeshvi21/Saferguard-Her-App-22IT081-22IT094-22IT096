const express = require("express");
const router = express.Router();
const friendController = require("../controller/friendController");

// Define routes for managing friends
router.post("/add", friendController.addFriend);
router.post("/add-by-contacts", friendController.addFriendsByContacts);
router.put("/accept/:id", friendController.acceptFriend);
router.put("/reject/:id", friendController.rejectFriend);
router.delete("/remove/:id", friendController.removeFriend);
router.get("/requests/:userId", friendController.getFriendRequests);

module.exports = router;

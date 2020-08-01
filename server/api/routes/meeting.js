const express = require("express");
const router = express.Router();
const meetingController = require("../controller/meetingController");
router.get("/", meetingController.getAllMeetings);
module.exports = router;
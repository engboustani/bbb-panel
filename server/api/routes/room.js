const express = require("express");
const router = express.Router();
const roomController = require("../controller/roomController");
router.get("/", roomController.getAllRooms);
router.get("/meeting/:meetingID", roomController.getRoom);
router.get("/meeting/:meetingID/meetings", roomController.getRoomMeetings);
router.post("/", roomController.addNewRoom)
router.put("/:roomId", roomController.updateRoom);
router.delete("/:roomId", roomController.deleteRoom);
router.post("/join", roomController.joinGuest);
module.exports = router;
const express = require("express");
const router = express.Router();
const roomController = require("../controller/roomController");
router.get("/", roomController.getAllRooms);
router.get("/meeting/:meetingID", roomController.getRoom);
router.post("/", roomController.addNewRoom)
router.delete("/:roomId", roomController.deleteRoom);
router.post("/join", roomController.joinPersentor);
module.exports = router;
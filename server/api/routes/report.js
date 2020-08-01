const express = require("express");
const router = express.Router();
const reportController = require("../controller/reportController");
router.get("/", reportController.getReport);
module.exports = router;
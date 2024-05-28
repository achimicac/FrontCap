const express = require("express");
const router = express.Router();
const timeWeightController = require("../controllers/TimeWeightController");

router.post("/getTimeWeight", timeWeightController.getTimeWeight);

module.exports = router;

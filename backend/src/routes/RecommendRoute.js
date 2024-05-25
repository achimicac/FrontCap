const express = require("express");
const router = express.Router();
const recommendController = require("../controllers/RecommendController");
const { auth } = require("../middleware/auth");

router.post(
  "/giveRecommendation",
  auth,
  recommendController.giveRecommendation
);

module.exports = router;

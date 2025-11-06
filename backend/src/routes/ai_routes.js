const express = require("express");
const router = express.Router();
const { getReview } = require("../controller/ai_controller");

// ✅ POST route
router.post("/getReview", getReview);

module.exports = router;



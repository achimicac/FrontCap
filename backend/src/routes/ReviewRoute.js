const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/ReviewController');


// router.post('/getReviewByID', reviewController.getReviewById);
router.post("/getReview", reviewController.getReview);
router.post("/addReview", reviewController.addReview);
router.put('/reviews/:review_id', reviewController.updateReview);
router.delete('/reviews/:review_id', reviewController.deleteReview);

module.exports = router;

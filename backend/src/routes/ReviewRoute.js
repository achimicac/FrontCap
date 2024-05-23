const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/ReviewController');


router.get('/reviews', reviewController.getReviews);
router.get('/reviews/:review_id', reviewController.getReviewById);
router.post('/reviews', reviewController.addReview);
router.put('/reviews/:review_id', reviewController.updateReview);
router.delete('/reviews/:review_id', reviewController.deleteReview);

module.exports = router;

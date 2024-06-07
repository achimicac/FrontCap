const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/RatingController');

router.get('/ratings', ratingController.getRatings);
router.get('/ratings/:maid_id', ratingController.getRatingById);
router.post('/addRatings', ratingController.addRating);
router.put("/updateRating", ratingController.updateRating);
router.delete('/ratings/:maid_id', ratingController.deleteRating);

module.exports = router;

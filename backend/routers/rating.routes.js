const express = require('express');
const router = express.Router();
const RatingController = require('../controllers/Rating.controller'); 


router.post('/',RatingController.createRating);
router.get('/',RatingController.getRating);
router.get('/:id',RatingController.getAverageRating);

module.exports = router;

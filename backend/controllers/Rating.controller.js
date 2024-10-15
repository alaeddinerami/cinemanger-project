const RatingService = require('../services/rating.service'); 

class RatingController {
  async getRating(req,res){
    try {
      const Ratings = await RatingService.getRating()
      res.status(200).json(Ratings)
    } catch (error) {
      res.status(500).json({ error: error.message }); 
    }
  }
     async createRating(req, res) {
    const { userId, filmId, ratingValue } = req.body;  
    try {
      const newRating = await RatingService.createRating(userId, filmId, ratingValue);
      res.status(201).json(newRating);  
    } catch (error) {
      res.status(500).json({ error: error.message });  
    }
  }
}

module.exports = new  RatingController();

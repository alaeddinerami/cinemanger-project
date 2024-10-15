const Rating = require('../models/Rating.model'); // Adjust the path as necessary

class RatingService {
  async getRating(){
    try{
      return await Rating.find();

    }catch(error){
      throw new Error(`Error geting rating: ${error.message}`);
    }
  }
   async createRating(userId, filmId, ratingValue) {
    try {
      const newRating = new Rating({
        user: userId,
        film: filmId,
        rating: ratingValue
      });
      await newRating.save();
      return newRating;
    } catch (error) {
      throw new Error(`Error creating rating: ${error.message}`);
    }
  }
  
}

module.exports = new RatingService();  

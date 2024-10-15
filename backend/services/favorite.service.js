const Favorite = require("../models/Favorite.model");
const FilmModel = require("../models/Film.model");

class FavoriteService {
    
    async getFavorite(){
        try {
            return await Favorite.find()
        } catch (error) {
            throw new Error(`Error adding favorite in serveces: ${error.message}`);
        }
    }
  async addFavorite(userId, filmId) {
    try {

        //   console.log(userId,filmId);

        const film = await FilmModel.findById(filmId); 
        if (!film) {
            return res.status(404).json({ error: 'Film not found' });
        }
        // console.log(film);
        
      const newFavorite = new Favorite({
        user: userId,
        film: filmId,
      });
      await newFavorite.save();
      return newFavorite;
    } catch (error) {
      throw new Error(`Error adding favorite in serveces: ${error.message}`);
    }
  }

  async removeFavorite(id){
    try {
        const removeFavorite = await Favorite.findByIdAndDelete(id);
        if(!removeFavorite){
           throw new error(`fovorite not found`);
        }
        
         return removeFavorite;
    } catch (error) {
        throw new error(`Error removing favorite: ${error.message}`)
    }
  }
}
module.exports = new FavoriteService();

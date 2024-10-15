const favoriteService = require('../services/favorite.service');

class FavoriteController{

    async getFavorite(req,res){
        try {
            const favorites = await favoriteService.getFavorite()
            res.status(200).json(favorites)    
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async addFavorite(req,res){
        const {filmId} = req.body
        const userId = req.user
        // console.log(req.body);
        
        try {
            const addFavorite = await favoriteService.addFavorite(userId,filmId)
            res.status(200).json(addFavorite)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async removeFavorite(req,res){
        try {

            const {id} = req.params
            // console.log(id);
            
            if(!id){
                return res.status(400).json({error:'favorite id is require'});
            } 
           const removeFavorite = await favoriteService.removeFavorite(id)
           res.status(200).json({
            message: "Favorite removed successufully",
            removeFavorite
           })
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}


module.exports = new FavoriteController();
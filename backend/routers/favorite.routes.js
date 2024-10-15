const express = require('express');
const router = express.Router();
const FavoriteController = require('../controllers/Favorite.controller')

router.get('/',FavoriteController.getFavorite)
router.post('/',FavoriteController.addFavorite)
router.delete('/:id',FavoriteController.removeFavorite)



module.exports = router
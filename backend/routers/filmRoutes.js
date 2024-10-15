const express = require('express');
const router = express.Router();
const filmController = require('../controllers/Film.controller');
const upload = require('../middlewares/upload')

router.post('/', upload,filmController.createFilm);
router.get('/', filmController.getAllFilms);
router.get('/:id', filmController.getFilmById);
router.put('/:id',upload, filmController.updateFilm);
router.delete('/:id', filmController.deleteFilm);

module.exports = router;

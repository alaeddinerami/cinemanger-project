const express = require("express");
const router = express.Router();
const FilmController = require("../controllers/Film.controller");

router.post('/', FilmController.create);
router.get('/', FilmController.getAll);
router.get('/:id', FilmController.getFilmById);
router.get('/filmSeanse/:id', FilmController.getFilmByIdWithSeance);
router.put('/:id', FilmController.update);
router.delete('/:id', FilmController.delete);

module.exports = router;

const filmService = require('../services/film.service');

class FilmController {
    async createFilm(req, res) {
        try {
           console.log(req.body); 
            
            const film = await filmService.createFilm(req.body, req.files);  
            res.status(201).json(film);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getFilmById(req, res) {
        try {
            const film = await filmService.getFilmById(req.params.id);
            if (!film) {
                return res.status(404).json({ error: "Film not found" });
            }
            res.status(200).json(film);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllFilms(req, res) {
        try {
            const films = await filmService.getAllFilms(req.query);
            res.status(200).json(films);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateFilm(req, res) {
        try {
            const updatedFilm = await filmService.updateFilm(req.params.id, req.body);
            if (!updatedFilm) {
                return res.status(404).json({ error: "Film not found" });
            }
            res.status(200).json(updatedFilm);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteFilm(req, res) {
        try {
            const deletedFilm = await filmService.deleteFilm(req.params.id);
            if (!deletedFilm) {
                return res.status(404).json({ error: "Film not found" });
            }
            res.status(200).json({ message: "Film deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new FilmController();

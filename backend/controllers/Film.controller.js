const Film = require('../models/Film.model');
const Seance = require('../models/seance.model');
const filmService = require('../services/film.service');

class FilmController {
    async getFilmByIdWithSeance(req, res) {
        try {
            const filmId = req.params.id;
    
            const film = await Film.findById(filmId);
            if (!film) {
                return res.status(404).json({ message: "Film not found" });
            }
    
            const seances = await Seance.find({ film: filmId }).populate('salle'); 
            if (!seances || seances.length === 0) {
                return res.status(404).json({ message: "No seances found for this film" });
            }
    
            const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
            film.image = `${baseUrl}${film.image}`;
    
            res.status(200).json({ film, seances });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
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

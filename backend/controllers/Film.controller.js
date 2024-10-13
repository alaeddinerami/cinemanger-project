const Film = require("../models/film");
const { createFilmValidation, updateFilmValidation } = require("../helpers/validation_schema");
const upload = require('../middlewares/upload'); 
const path = require('path');
const fs = require('fs');
const Seance = require("../models/seance.model");

class FilmController {
  async getAll(req, res) {
    try {
      const films = await Film.find();

      const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

      const filmsWithImages = films.map(film => ({
        ...film._doc,
        image: `${baseUrl}${film.image}` 
      }));

      return res.status(200).json(filmsWithImages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getFilmById(req, res) {
    try {
      const filmId = req.params.id;
      const film = await Film.findById(filmId);
      if (!film) {
        return res.status(404).json({ message: "Film not found" });
      }

      
      const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
      film.image = `${baseUrl}${film.image}`; 

      res.status(200).json(film);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

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


  async create(req, res) {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }

      try {
        const { title, genre, description, duration } = req.body;
        const reqValidation = await createFilmValidation.validateAsync(req.body);
        console.log(reqValidation);

        const image = req.file ? req.file.filename : null;

        const existingFilm = await Film.findOne({ title });
        if (existingFilm) {
          return res.status(400).json({ message: "Film already exists" });
        }

        const film = new Film({
          title,
          genre,
          description,
          duration,
          image: image || "default_image.jpg", 
        });

        await film.save();
        res.status(201).json({ message: "Film created successfully", film });
      } catch (error) {
        if (error.isJoi) {
          return res.status(422).json({ message: "Validation error", details: error.details[0].message });
        }
        res.status(500).json({ message: error.message });
      }
    });
  }

  async update(req, res) {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }

      try {
        const filmId = req.params.id;
        const { title, genre, description, duration } = req.body;

        let film = await Film.findById(filmId);
        if (!film) {
          return res.status(404).json({ message: "Film not found" });
        }

        const reqValidation = await updateFilmValidation.validateAsync(req.body);
        console.log(reqValidation);

        const updatedData = {
          title: title || film.title,
          genre: genre || film.genre,
          description: description || film.description,
          duration: duration || film.duration,
          image: req.file ? req.file.filename : film.image, 
        };

        if (req.file && film.image !== 'default_image.jpg') {
          fs.unlinkSync(path.join(__dirname, '../uploads/', film.image));
        }

        film = await Film.findByIdAndUpdate(filmId, updatedData, { new: true });

        res.status(200).json({ message: "Film updated successfully", film });
      } catch (error) {
        if (error.isJoi) {
          return res.status(422).json({ message: "Validation error", details: error.details[0].message });
        }
        res.status(500).json({ message: error.message });
      }
    });
  }





  async delete(req, res) {
    try {
      const filmId = req.params.id;

      const film = await Film.findById(filmId);
      if (!film) {
        return res.status(404).json({ message: "Film not found" });
      }

      if (film.image !== 'default_image.jpg') {
        fs.unlinkSync(path.join(__dirname, '../uploads/', film.image));
      }

      await Film.findByIdAndDelete(filmId);

      res.status(200).json({ message: "Film deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new FilmController();

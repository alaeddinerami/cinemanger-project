const Seance = require("../models/seance.model");

class SeanceController {

    async getAll(req, res) {
        try {
            const seances = await Seance.find().populate('film').populate('salle');
            res.status(200).json(seances);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getSeanceById(req, res) {
        try {
            const seanceId = req.params.id;
            const seance = await Seance.findById(seanceId).populate('film').populate('salle');
            if (!seance) {
                return res.status(404).json({ message: "Seance not found" });
            }
            res.status(200).json(seance);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async create(req, res) {
        try {
            const { film, salle, date, price } = req.body;

            if (!film || !salle || !date || !price) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const newSeance = new Seance({
                film,
                salle,
                date,
                price,
            });

            await newSeance.save();
            res.status(201).json(newSeance);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const seanceId = req.params.id;
            const { film, salle, date, price } = req.body;

            let seance = await Seance.findById(seanceId);
            if (!seance) {
                return res.status(404).json({ message: "Seance not found" });
            }

            seance.film = film || seance.film;
            seance.salle = salle || seance.salle;
            seance.date = date || seance.date;
            seance.price = price || seance.price;

            await seance.save();
            res.status(200).json({ message: "Seance updated successfully", seance });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const seanceId = req.params.id;
            const seance = await Seance.findById(seanceId);
            if (!seance) {
                return res.status(404).json({ message: "Seance not found" });
            }

            await Seance.findByIdAndDelete(seanceId);
            res.status(200).json({ message: "Seance deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new SeanceController();

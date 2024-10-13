const Salle = require('../models/salle.model');

class SalleController {

    async getAll(req, res) {
        try {
            const salles = await Salle.find();
            res.status(200).json({ salles });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getSalleById(req, res) {
        try {
            const salleId = req.params.id;
            const salle = await Salle.findById(salleId);

            if (!salle) {
                return res.status(404).json({ message: "Salle not found" });
            }

            return res.status(200).json(salle);  
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async create(req, res) {
        try {
            const { name, capacity } = req.body;
            if (!name || !capacity) {
                return res.status(400).json({ message: 'Name and capacity are required' });
            }

            const salle = new Salle({
                name,
                capacity
            });

            await salle.save();
            return res.status(201).json(salle);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const salleId = req.params.id;
            const { name, capacity } = req.body;

            let salle = await Salle.findById(salleId);
            if (!salle) {
                return res.status(404).json({ message: 'Salle not found' });
            }

            const updateData = {
                name: name || salle.name,
                capacity: capacity || salle.capacity,
            };

            salle = await Salle.findByIdAndUpdate(salleId, updateData, { new: true });

            return res.status(200).json({ message: "Salle updated successfully", salle });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const salleId = req.params.id;
            const salle = await Salle.findById(salleId);

            if (!salle) {
                return res.status(404).json({ message: "Salle not found" });
            }

            await Salle.findByIdAndDelete(salleId);
            return res.status(200).json({ message: 'Salle deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new SalleController();

const Seance = require("../models/seance.model");
const Reservation = require("../models/reservation.model");
const Salle = require("../models/salle.model");
const mailer = require('../helpers/mailer');

class ReservationController {
  async reservePlace(req, res) {
    try {
      const { seanceId, placeNumber } = req.body;

      console.log(`Request body: seanceId=${seanceId}, placeNumber=${placeNumber}`);

      const seance = await Seance.findById(seanceId).populate("salle").populate('film');
      console.log(seance);

      if (!seance) {
        return res.status(404).json({ message: "Seance not found" });
      }

      if (placeNumber < 1 || placeNumber > seance.salle.capacity) {
        return res
          .status(400)
          .json({
            message: `Invalid place number. Salle capacity is ${seance.salle.capacity}`,
          });
      }

      const existingReservation = await Reservation.findOne({
        seance: seanceId,
        placeNumber,
      });

      if (existingReservation) {
        return res
          .status(400)
          .json({ message: `Place number ${placeNumber} is already reserved` });
      }

      const newReservation = new Reservation({
        seance: seanceId,
        placeNumber: placeNumber,
        client: req.user._id, 
      });

      await newReservation.save();

      await mailer.sendTiketMail(
        req.user, 
        { seats: placeNumber }, 
        { date: seance.date, price: seance.price }, 
        seance.salle, 
        seance.film 
      );

      return res.status(200).json({
        message: `Place number ${placeNumber} reserved successfully`,
        reservation: newReservation,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Operation failed", error: error.message });
    }
  }

  async getAllReservations(req, res) {
    try {
      const reservations = await Reservation.find({ client: req.user._id }) 
        .populate({
          path: "seance",
          populate: {
            path: "salle",
            model: "Salle",
          },
        });

      if (reservations.length === 0) {
        return res.status(404).json({ message: "No reservations found for this client" });
      }

      return res.status(200).json({ reservations });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Operation failed", error: error.message });
    }
  }

  async cancelReservation(req, res) {
    try {
      const { id } = req.params; 
      console.log(`reservationId: ${id}`); 

      const reservation = await Reservation.findOne({ _id: id, client: req.user._id });

      console.log(`reservation: ${reservation}`);

      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found or does not belong to this client" });
      }

      await Reservation.deleteOne({ _id: id });

      return res.status(200).json({ message: "Reservation canceled successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Operation failed", error: error.message });
    }
  }
}

module.exports = new ReservationController();

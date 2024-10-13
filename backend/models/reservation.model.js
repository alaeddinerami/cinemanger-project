const mongoose = require("mongoose");
const schema = mongoose.Schema;
const schemaRaservation = mongoose.Schema(
  {
    seance: {
      type: schema.Types.ObjectId,
      ref: "Seance",
      required: true,
    },
    placeNumber: {
      type: Number,
      required: true,
    },
    client: {
      type: schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model("reservation", schemaRaservation);
module.exports = Reservation;

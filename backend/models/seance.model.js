const mongoose = require("mongoose");
const schema = mongoose.Schema;
const seanceSchema = new mongoose.Schema(
  {
    film: {
      type: schema.Types.ObjectId,
      ref: "Film",
      required: true,
    },
    salle: {
      type: schema.Types.ObjectId,
      ref: "Salle",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Seance = mongoose.model("Seance", seanceSchema);
module.exports = Seance;

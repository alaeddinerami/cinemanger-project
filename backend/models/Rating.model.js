const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  film: { type: mongoose.Types.ObjectId, ref: 'film', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;

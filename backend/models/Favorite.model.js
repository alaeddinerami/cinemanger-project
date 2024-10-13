const mongoose = require("mongoose");
const schema = mongoose.Schema;
const favoriteSchema = new mongoose.Schema({
  user: { type: schema.Types.ObjectId, ref: 'User', required: true },
  film: { type: schema.Types.ObjectId, ref: 'Film', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;

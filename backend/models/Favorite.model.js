const mongoose = require("mongoose");
const schema = mongoose.Schema;
const favoriteSchema = new mongoose.Schema({
  user: { type: schema.Types.ObjectId, ref: 'User', required: true },
  film: { type: schema.Types.ObjectId, ref: 'Film', required: true },
},
{
  timestamps:true
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;

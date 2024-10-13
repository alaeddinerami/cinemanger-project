const mongoose = require('mongoose')

const salleSchema = new mongoose.Schema({
    name: {type: String, required:true},
    capacity:{type: Number, required:true}
},
{
  timestamps: true,

})
const Salle = mongoose.model('Salle',salleSchema)
module.exports= Salle;
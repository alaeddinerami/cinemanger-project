const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration:   {
        type: Number,
        required:true
    },
    image: {
        type: String,
        required: true,
    },
},
{
  timestamps: true,
});

module.exports = mongoose.model('Film', filmSchema);
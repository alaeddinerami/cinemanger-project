const mongoose = require('mongoose');
const schema = mongoose.Schema;
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
    duration: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    visibility: {
        type: String,
        enum: ["public", "private", "scheduled"], 
        default: "public",
    },
    releaseDate: {
        type: Date,
        required: true,
    },
  
}, {
    timestamps: true, 
});

module.exports = mongoose.model('Film', filmSchema);

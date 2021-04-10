const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
}); 

module.exports = mongoose.model('Ratings', ratingSchema);
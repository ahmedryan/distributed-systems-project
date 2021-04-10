const express = require('express');
const router = express.Router();
const Rating = require('../models/rating');

// Get All Ratings
router.get('/', async (req, res) => {
    try {
        const ratings = await Rating.find();
        res.json(ratings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get One Rating

// Create Rating
router.post('/', async (req, res) => {
    const rating = new Rating({
        name: req.body.name,
        rating: req.body.rating
    });

    try {
        const newRating = await rating.save();
        res.status(201).json(newRating);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
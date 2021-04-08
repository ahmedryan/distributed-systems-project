const express = require('express');
const Rider = require('../models/rider');
const server = require('../server/server');

const router = express.Router();

router.post('/', (req, res) => {
    const rider = new Rider(
        req.body.name, 
        req.body.coOrdinateX, 
        req.body.coOrdinateY, 
        req.body.destinationX,
        req.body.destinationY
    );

    server.riders.push(rider);

    res.status(200).send(server.riders);
});

module.exports = router;
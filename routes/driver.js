const express = require('express');
const Driver = require('../models/driver');
const server = require('../server/server');

const router = express.Router();

router.post('/', (req, res) => {
    const driver = new Driver(
        req.body.name, 
        req.body.coOrdinateX, 
        req.body.coOrdinateY, 
        req.body.carNumber);

    server.drivers.push(driver);

    return res.status(200).send(server.drivers);
});

module.exports = router;
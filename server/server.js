const express = require('express');
const socket = require('socket.io');
const calculate = require('../services/calculate');

const app = express();

var drivers = [];
var riders = [];
var pairs_rider_driver = [];
var completed_pairs_right_now = [];

app.use(express.json());

app.use('/api/rider', require('../routes/rider'));
app.use('/api/driver', require('../routes/driver'));

setInterval(function() {
    console.log(`Drivers Available: ${drivers.length}`);
    console.log(`Riders Available: ${riders.length}`);
    calculate.makePair();
    console.log(`Drivers Left To Pair: ${drivers.length}`);
    console.log(`Riders Left To Pair: ${drivers.length}`);
    console.log(`Total Pairs: ${pairs_rider_driver.length}`);
    //console.log(`Pair Details:`);
    //console.log(pairs_rider_driver);
    console.log('-----------------------------------------------');
}, 5000);

const PORT = 5000;

//starting server
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log('-----------------------------------------------');
});

//establishing connection
const io = socket(server);
io.on('connection', (socket) => {
    console.log('Socket Connected', socket.id);
    console.log('-----------------------------------------------');

    setInterval(function(){
        
        socket.emit('send-fare', completed_pairs_right_now.reverse());
        completed_pairs_right_now.splice(0, completed_pairs_right_now.length);

    }, 5000);
    
});

module.exports.drivers = drivers;
module.exports.riders = riders;
module.exports.pairs = pairs_rider_driver;
module.exports.completed_pairs_right_now = completed_pairs_right_now;
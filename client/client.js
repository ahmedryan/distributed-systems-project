
const io = require('socket.io-client');
const axios = require('axios');
const socket = io.connect('http://localhost:5000');


socket.on('send-fare', (data) => {
    console.log(data);
    console.log('-----------------------------------------------');
});

var loop = 1;

setInterval(function() {
    var dcx = Math.floor((Math.random() * 100) + 1);
    var dcy = Math.floor((Math.random() * 100) + 1);
    var cn = Math.floor((Math.random() * 10000) + 1000);
    var nd = 'driver-' + loop;

    axios.post('http://localhost:5000/api/driver/', {
        name: nd,
        coOrdinateX: dcx, 
        coOrdinateY: dcy,
        carNumber: cn
    }).then((res) => {
        //console.log('Driver:');
        //console.log(res.data);
    }).catch((error) => {
        console.log(error.errno);
    });

    var rcx = Math.floor((Math.random() * 100) + 1);
    var rcy = Math.floor((Math.random() * 100) + 1);
    var rdx = Math.floor((Math.random() * 100) + 1);
    var rdy = Math.floor((Math.random() * 100) + 1);
    var nr = 'rider-' + loop;

    axios.post('http://localhost:5000/api/rider/', {
        name: nr,
        coOrdinateX: rcx,
        coOrdinateY: rcy,
        destinationX: rdx,
        destinationY: rdy,
    }).then((res) => {
        //console.log('Rider: ');
        //console.log(res.data);
    }).catch((error) => {
        console.log(error.errno);
    });

    loop += 1;
}, 1000);


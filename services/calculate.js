const server = require('../server/server');

function makePair() {
    
    //console.log(server.riders.length);

    for (var i=server.riders.length-1; i>=0; i--) {
        
        //console.log(`Entered Loop with ${i}`);

        var temp = [];

        for (var j=server.drivers.length-1; j>=0; j--) {
            
            temp.push(
                distanceCalculator(
                    server.riders[i].coOrdinateX,
                    server.riders[i].coOrdinateY,
                    server.drivers[j].coOrdinateX,
                    server.drivers[j].coOrdinateY,
                ) 
            ); 

        }
        
        //console.log('Index of driver: ' + temp.indexOf(Math.min(...temp)));

        var pairedRiderIndex = i;
        var pairedDriverIndex = temp.indexOf(Math.min(...temp));

        var pairedRiderName = server.riders[pairedRiderIndex].name;
        var pairedDriverName = server.drivers[pairedDriverIndex].name;

        var tempRider = server.riders[pairedRiderIndex];
        var tempDriver = server.drivers[pairedDriverIndex];

        //console.log(tempRider);
        //console.log(tempDriver);

        var tempPairFare = calculateFare(tempRider, tempDriver);

        var tempPairDetails = [];
        tempPairDetails.push(pairedRiderName); //riders - pair[0]
        tempPairDetails.push(pairedDriverName); //drivers - pair[1]
        tempPairDetails.push(tempPairFare);

        //console.log(`Pair Details: ${tempPairDetails}`);

        server.pairs.push(tempPairDetails); //push na kore socket ae pathay dibo
        server.completed_pairs_right_now.push(tempPairDetails);

        server.riders.splice(pairedRiderIndex, 1);
        server.drivers.splice(pairedDriverIndex, 1);
    }

    //console.log(server.pairs);
    //console.log('Pair Made');
    
}

function distanceCalculator(rx, ry, dx, dy) {
    //console.log(Math.sqrt(Math.pow(rx-dx, 2) + Math.pow(ry-dy, 2)));
    return Math.sqrt(Math.pow(rx-dx, 2) + Math.pow(ry-dy, 2)); 
}

function calculateFare(rider, driver) {

    // console.log('--------------');
    // console.log(rider);
    // console.log(driver);
    // console.log('--------------');

    var tempFare = distanceCalculator(
        rider.coOrdinateX,
        rider.coOrdinateY,
        driver.coOrdinateX,
        driver.coOrdinateY
    ); 
    tempFare *= 2;

    //console.log(`Fare: ${tempFare}`);
    return tempFare;
}

module.exports.makePair = makePair;
module.exports.calculateFare = calculateFare;
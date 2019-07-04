const { fetchMyIp, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  // console.log(passTimes);
  passTimes.forEach(d => {
    let date = new Date(d.risetime * 1000);
    console.log('Next pass at ' + date.toString() + ' for ' + d.duration + ' seconds');
  });
});

// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log(`It didn't work ${error}`);
//     return;
//   }
//   console.log(`It worked! Returned IP: ${ip}`);
// });
// fetchCoordsByIP('67.71.216.6', (error, output) => {
//   if (error) {
//     console.log(`It didn't work ${error}`);
//     return;
//   }
//   console.log(`It worked! Returned coordiante: latitude: ${output.latitude}, longitudu: ${output.longitude}`);
// });
// fetchISSFlyOverTimes({ latitude: '43.63190', longitude: '-79.37160' }, (error, output) => {
//   if (error) {
//     console.log(`It didn't work ${error}`);
//     return;
//   }
//   console.log(`It worked! Returned: `, output);
// });
const { fetchMyIp, fetchCoordsByIP } = require('./iss');

// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log(`It didn't work ${error}`);
//     return;
//   }
//   console.log(`It worked! Returned IP: ${ip}`);
// });
fetchCoordsByIP('67.71.216.6', (error, output) => {
  if (error) {
    console.log(`It didn't work ${error}`);
    return;
  }
  console.log(`It worked! Returned coordiante: latitude: ${output.latitude}, longitudu: ${output.longitude}`);
});
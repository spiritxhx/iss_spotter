const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};
const fetchCoordsByIP = body => {
  let ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/${ip}`);
};
const fetchISSFlyOverTimes = body => {
  let latitude = JSON.parse(body).data.latitude;
  let longitude = JSON.parse(body).data.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      let passTime = JSON.parse(body).response;
      passTime.forEach(d => {
        let date = new Date(d.risetime * 1000);
        console.log('Next pass at ' + date.toString() + ' for ' + d.duration + ' seconds');
      });
    })
    .catch(error=>{
      console.log("It didn't work: ", error.message);
    });
};

module.exports = { nextISSTimesForMyLocation };
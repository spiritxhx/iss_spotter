const request = require('request');

const fetchMyIp = callback => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      console.log(error);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  // ip = '67.71.216.6';
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      console.log(error);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let output = {};
    output.latitude = JSON.parse(body).data.latitude;
    output.longitude = JSON.parse(body).data.longitude;

    callback(null, output);
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  // coords = { latitude: '43.63190', longitude: '-79.37160' };
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      console.log(error);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyOverTime for coords: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, JSON.parse(body).response);
  });
};



const nextISSTimesForMyLocation = callback => {
  fetchMyIp((errorIP, ip) => {
    if (errorIP) {
      console.log(`IP fetch didn't work ${errorIP}`);
      return;
    }
    fetchCoordsByIP(ip, (errorCoords, coords) => {
      if (errorCoords) {
        console.log(`Coordinates fetch didn't work ${errorCoords}`);
        return;
      }
      fetchISSFlyOverTimes(coords, (errorTime, time) => {
        if (errorCoords) {
          console.log(`Fly-over time fetch didn't work ${errorTime}`);
          return;
        }
        callback(null, time);
      });
    });
  });
};

module.exports = { fetchMyIp, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
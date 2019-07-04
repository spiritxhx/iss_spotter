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
    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  ip = '67.71.216.20050552555555.6';
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

module.exports = { fetchMyIp, fetchCoordsByIP };
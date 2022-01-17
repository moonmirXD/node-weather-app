const request = require('request');
const forecast = (longtitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=680aaeb7e0d951e8beb962e0bd765712&query=${encodeURIComponent(
    longtitude
  )},${encodeURIComponent(latitude)}`;
  console.log(url);
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to track the forecast.', undefined);
    } else if (error === 615) {
      callback('Coordiante errors.', undefined);
    } else {
      callback(undefined, response.body.current);
    }
  });
};

module.exports = forecast;

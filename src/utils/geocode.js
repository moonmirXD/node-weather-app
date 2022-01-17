const request = require('request');

const geocode = (address, callback) => {
  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoia2FrcXdlenhjIiwiYSI6ImNreWR6eG90dDA3ZGUycXBocGt3dDU3N3AifQ.TEtNnQm_q3Zmy_imhwuJiQ&limit=1`;

  request({ url: mapboxUrl, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect in location service!', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find the location!', undefined);
    } else {
      const { center, place_name } = response.body.features[0];
      callback(undefined, {
        longtitude: center[0],
        latitude: center[1],
        location: place_name,
      });
    }
  });
};

module.exports = geocode;

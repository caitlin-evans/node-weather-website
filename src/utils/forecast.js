const request = require('request');

const forecast = (lat, long, callback) => {
  const url = 'https://api.darksky.net/forecast/f1fd996904800a0adbe585043d56dda7/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '?units=uk2';
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Error: Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Error: Unable to find location!', undefined);
    } else {
      const data = body.currently;
      const degrees = data.temperature;
      const rain = data.precipProbability;

      const returnVal = body.daily.data[0].summary + ' It is currently ' + degrees + ' degrees. There is a ' + rain + '% chance of rain.';

      callback(undefined, returnVal);
    }
  });
};

module.exports = forecast;

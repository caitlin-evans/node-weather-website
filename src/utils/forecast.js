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
      const rain = data.precipProbability*100;
      const dailyData = body.daily.data[0];
      const tempHigh = dailyData.temperatureHigh;
      const tempLow = dailyData.temperatureLow;

      const returnVal = dailyData.summary + ' It is currently ' + degrees + ' degrees. There is a ' + rain + '% chance of rain.\nExpect highs of ' + tempHigh + ' degrees and lows of ' + tempLow + ' degrees.';

      callback(undefined, returnVal);
    }
  });
};

module.exports = forecast;

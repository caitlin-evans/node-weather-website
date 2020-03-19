const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Cait\'s Funky Forecast',
    name: 'Caitlin Evans'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Need Help?',
    name: 'Caitlin Evans',
    message: 'Email me at cevans@merkleinc.com to get help.'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Cait\'s Funky Forecast',
    name: 'Caitlin Evans'
  });
});

app.get('/weather', (req, res) => {
  const searchLocation = req.query.location;
  if (!searchLocation) {
    return res.send({
      error: 'Remember to provide a search location!'
    });
  }

  geocode(searchLocation, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }
      return res.send({
        location,
        forecast: forecastData,
        searchLocation
      });
    });
  });
});

// app.get('/products', (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: 'You must provide a search term'
//     });
//   }

//   console.log(req.query.search);
//   res.send({
//     products: []
//   });
// });

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Error',
    errorMessage: '404: Help article not found!',
    name: 'Caitlin Evans'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error',
    errorMessage: '404: Page not found!',
    name: 'Caitlin Evans'
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port + '!');
});


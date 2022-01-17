const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const { response } = require('express');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
app.use(express.static(publicDirectoryPath));

hbs.registerPartials(partialsDirectory);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Ryan Arqueza',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Ryan Arqueza',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: "Don't hesistate to ask questions",
    name: 'Ryan Arqueza',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longtitude, (error, response) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          response,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    message: 'Help article not found',
    name: 'Ryan Arqueza',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    message: 'Page not found',
    name: 'Ryan Arqueza',
  });
});

app.listen(8000, () => {
  console.log('Currently connected on port 8000');
});

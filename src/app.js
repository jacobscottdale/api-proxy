require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV, CLIENT_ORIGIN } = require('./config')
const cocktailRouter = require('./cocktail-db/cocktail-router')

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors({
  origin: CLIENT_ORIGIN
}));

// Route for cocktail-app endpoint
app.use('/api/cocktail', cocktailRouter)

app.get('/api', (req, res) => {
  res.json({ ok: true });
});

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error'}}
  } else {
    console.log(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app;
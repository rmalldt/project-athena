const express = require('express');
const cors = require('cors');

const api = express();

api.use(cors());
api.use(express.json());

api.get('/', (req, res) => {
  res.json({
    name: 'Athena - Educational App',
    description: 'Educational application for Non-STEM subjects.',
  });
});

module.exports = api;

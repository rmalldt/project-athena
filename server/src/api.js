const express = require('express');
const cors = require('cors');

const logRouter = require('./middlewares/logger');
const userRouter = require('./routers/user');
const dashBoardRouter = require('./routers/dashboard');
const topicRouter = require('.routers/topic');

const api = express();

api.use(cors());
api.use(express.json());
api.use(logRouter);


api.get('/', (req, res) => {
  res.json({
    name: 'Athena - Educational App',
    description: 'Educational application for Non-STEM subjects.',
  });
});

api.use('/users', userRouter);
api.use('/dashboard', dashBoardRouter);
api.use('/topics', topicRouter);

module.exports = api;

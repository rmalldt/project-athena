const express = require('express');
const cors = require('cors');
const logRouter = require('./middlewares/logger');
const userRouter = require('./routers/user');
const dashBoardRouter = require('./routers/dashboard');
const topicRouter = require('./routers/topic');
const scoreRouter = require('./routers/score');
const questionRouter = require('./routers/question');

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
api.use('/scores', scoreRouter);
api.use('/questions', questionRouter);

api.use((req, res) => {
  res.status(404).json({ error: 'Not Found'});
});

api.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = api;

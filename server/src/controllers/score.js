const { validationResult } = require('express-validator');
const Score = require('../models/Score');

async function getById(req, res, next) {
  try {
    const scoreId = Number(req.params.id);
    const score   = await Score.getById(scoreId);
    if (!score) {
      return res.status(404).json({ error: 'Score not found' });
    }
    res.json({ success: true, data: score });
  } catch (err) {
    next(err);
  }
}

async function getAll(req, res, next) {
  try {
    const list = await Score.getAll();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
}

async function getAllByUser(req, res, next) {
  try {
    const userId = Number(req.params.userId);
    const list   = await Score.getAllByUser(userId);
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
}


async function getAllByTopic(req, res, next) {
  try {
    const topicId = Number(req.params.topicId);
    const list    = await Score.getAllByTopic(topicId);
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
}


async function create(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array().map(error => error.msg) });
  }

  const { userId, topicId, score } = req.body;
  
  try {
    const newScore = await Score.create({ userId, topicId, score });
    res.status(201).json({ success: true, data: newScore });
  } catch (err) {
    next(err);
  }
}

module.exports = { getById, getAll, getAllByUser, getAllByTopic, create };

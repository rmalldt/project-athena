const { validationResult } = require('express-validator');
const Question = require('../models/Question');
const Score = require('../models/Score');


async function getAll(req, res, next) {
  try {
    const list = await Question.getAll();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
}


async function getById(req, res, next) {
  try {
    const questionId = Number(req.params.id);
    const question = await Question.getById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ success: true, data: question });
  } catch (err) {
    next(err);
  }
}


async function create(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array().map(error => error.msg) });
  }

  const { topicId, question, answer, option } = req.body;
  try {
    const q = await Question.create({ topicId, question, answer, option });
    res.status(201).json({ success: true, data: q });
  } catch (err) {
    next(err);
  }
}


async function attempt(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array().map(error => error.msg) });
  }

  try {
    const questionId = Number(req.params.id);
    const { answer: guess } = req.body;

    const correct = await Question.checkAnswer(questionId, guess);

    if (correct) {              
      const question = await Question.getById(questionId);
      await Score.create({
        userId: req.user.student_id,
        topicId: question.topicId,
        score: 1
      });
    }

    res.json({ success: true, correct });
  } catch (err) {
    next(err);
  }
}


async function reveal(req, res, next) {
  try {
    const questionId = Number(req.params.id);
    const answer     = await Question.revealAnswer(questionId);
    if (answer == null) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({ success: true, answer });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, create, attempt, reveal };

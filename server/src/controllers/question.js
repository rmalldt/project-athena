const Question = require('../models/Question');
const Score = require('../models/Score');



// List every question
async function getAll(req, res, next) {
  try {
    const list = await Question.getAll();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
}


// Fetch one question by its ID
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

// Fetch all questions for a given topic
async function getAllByTopic(req, res, next) {
  try {
      const topicId = Number(req.params.topicId);
      const list = await Question.getAllByTopic(topicId);
      res.json({ success: true, data: list });
    } catch (err) {
      next(err);
    }


}


module.exports = { getAll, getById, getAllByTopic };

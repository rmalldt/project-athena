const Topic = require('../models/Topic');

// Return one topic or 404
async function getById(req, res, next) {
  const topicId = Number(req.params.id);

  try {
    const topic = await Topic.getById(topicId);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    res.json({ success: true, data: topic });
  } catch (err) {
    next(err);
  }
}

// Return list of all topics
async function getAll(req, res, next) {
  try {
    const list = await Topic.getAll();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
}

module.exports = { getById, getAll };

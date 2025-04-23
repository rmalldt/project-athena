const { validationResult } =   require('express-validator');
const Topic               =   require('../models/Topic');

async function getById(req, res) {
  const topicId = Number(req.params.id);

  try {
    const topic = await Topic.getById(topicId);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    res.json({ success: true, data: topic });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAll(req, res) {
  try {
    const list = await Topic.getAll();
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function create(req, res) {  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array().map(e => e.msg) });
  }

  const { title, description, videoUrl } = req.body;
  if (!title || !videoUrl) {
    return res.status(400).json({ error: 'title and videoUrl are required' });
  }

  try {
    const topic = await Topic.create({ title, description, videoUrl });
    res.status(201).json({ success: true, data: topic });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getById,
  getAll,
  create,
};

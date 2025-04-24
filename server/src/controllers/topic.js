const { validationResult } =  require('express-validator');
const Topic = require('../models/Topic');


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


async function getAll(req, res, next) {
  try {
    const list = await Topic.getAll();
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

  const { title, description, videoUrl } = req.body;
  
  try {
    const topic = await Topic.create({ title, description, videoUrl });
    res.status(201).json({ success: true, data: topic });
  } catch (err) {
    next(err);
  }
}


async function searchByTitle(req, res, next) {
  const searchTerm = req.query.title || '';
  try {
    const list = await Topic.getByTitle(searchTerm);
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
}


async function searchByDescription(req, res, next) {
  const searchTerm = req.query.description || '';
  try {
    const list = await Topic.getByDescription(searchTerm);
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
}

module.exports = { getById, getAll, create, searchByTitle, searchByDescription };

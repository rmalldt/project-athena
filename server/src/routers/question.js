const express = require('express');
const questionController = require('../controllers/question');

const router = express.Router();

// List all questions
router.get('/', questionController.getAll);

// Get a question by ID
router.get('/:id', questionController.getById);

// List all question for a given topic
router.get('/topic/ :topicId', questionController.getAllByTopic)

module.exports = router;

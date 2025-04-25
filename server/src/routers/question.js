const express = require('express');
const questionController = require('../controllers/question');

const router = express.Router();

// List all questions
router.get('/', questionController.getAll);

// Get a question by ID
router.get('/:id', questionController.getByTopicId);

<<<<<<< HEAD
// List all question for a given topic
router.get('/topic/ :topicId', questionController.getAllByTopic)
=======
// Create new question (any authenticated user)
router.post(
  '/',
  authenticateJWT,
  [
    body('topicId', 'topicId required').isInt(),
    body('question', 'question required').notEmpty(),
    body('answer', 'answer required').notEmpty(),
    body('options', 'options required').notEmpty(),
  ],
  questionController.create
);

// Student submits an answer attempt
router.post(
  '/:id/attempt',
  authenticateJWT,
  [body('answer', 'answer required').notEmpty()],
  questionController.attempt
);

// Student reveals the correct answer
router.get('/:id/reveal', authenticateJWT, questionController.reveal);
>>>>>>> aea5d3c4759e3529f0b0bbbbccfa95ca72caa923

module.exports = router;

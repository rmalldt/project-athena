const express = require('express');
const { body } = require('express-validator');
const authenticateJWT = require('../middlewares/auth');
const questionController = require('../controllers/question');
const router = express.Router();


router.get('/', questionController.getAll);
router.get('/:id', questionController.getById);

// Create new question (teacher only)
router.post('/', authenticateJWT,
  [
    body('topicId','topicId required').isInt(),
    body('question','question required').notEmpty(),
    body('answer','answer required').notEmpty(),
    body('option','option required').notEmpty(),
  ],
  questionController.create
);

// Student gives an answer
router.post('/:id/attempt', authenticateJWT,
  [ body('answer','answer required').notEmpty() ],
  questionController.attempt
);

// Student reveals the answer
router.get('/:id/reveal', authenticateJWT,
  questionController.reveal
);

module.exports = router;

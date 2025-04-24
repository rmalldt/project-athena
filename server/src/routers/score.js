const express = require('express');
const { body } = require('express-validator');
const scoreController = require('../controllers/score');
const router = express.Router();

router.get('/user/:userId', authenticateJWT, scoreController.getAllByUser); // Get all scores for a specific user

router.get('/topic/:topicId', authenticateJWT, scoreController.getAllByTopic); // Get all scores for a specific topic

router.get('/', authenticateJWT, scoreController.getAll); // Get all scores 

router.get('/:id', authenticateJWT, scoreController.getById); // Get onescore by its ID

// Create a new score
router.post('/', authenticateJWT,
    [
        body('userId',  'userId is required').isInt(),
        body('topicId', 'topicId is required').isInt(),
        body('score',   'score is required').isInt()
    ],
    scoreController.create

);

module.exports = router;

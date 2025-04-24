const express = require('express');
const { body } = require('express-validator');
const scoreController = require('../controllers/score');
const router = express.Router();

router.get('/user/:userId', scoreController.getAllByUser);

router.get('/topic/:topicId', scoreController.getAllByTopic);

router.get('/', scoreController.getAll);

router.get('/:id', scoreController.getById);

router.post('/',
    [
        body('userId',  'userId is required').isInt(),
        body('topicId', 'topicId is required').isInt(),
        body('score',   'score is required').isInt()
    ],
    scoreController.create

);

module.exports = router;

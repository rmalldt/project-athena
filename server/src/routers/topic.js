const express = require('express');
const topicController = require('../controllers/topic')
const router = express.Router();


// List all topics
router.get('/', topicController.getAll);  

// Get a topic by ID
router.get('/:id', topicController.getById); 
                

module.exports = router;

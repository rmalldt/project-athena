const express = require('express');
const { body, query } = require('express-validator');
const topicController = require('../controllers/topic')
const router = express.Router();

router.get('/search/title',
    [
        query('title', 'title query parameter is required').notEmpty()
    ],
     topicController.searchByTitle);

router.get('/search/description', 
    [
        query('description', 'description query parameter is required').notEmpty()
    ],
    topicController.searchByDescription);

router.get('/', topicController.getAll);  

router.get('/:id', topicController.getById); 
        
router.post('/',
    [
        body('title', 'Title is required').notEmpty(),
        body('videoUrl', 'videoUrl is required').notEmpty(),
        body('videoUrl', 'videoUrl must be a valid URL').isURL(),
        body('description').optional()
    ],
    topicController.create);           

module.exports = router;

const express = require('express');
const { getById, getAll, create } = require('../controllers/topic');
const router = express.Router();

router.get('/',        getAll);           
router.get('/:id',     getById);          
router.post('/',       create);           

module.exports = router;

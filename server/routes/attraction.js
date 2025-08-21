const express = require('express');
const router = express.Router();
const attractions = require('../controllers/attractions');

// Get all attractions
router.get('/', attractions.getAll);

// Get one attraction by ID
router.get('/:id', attractions.getOne);

// Add a new attraction
router.post('/', attractions.addNew);

// Update an attraction
router.put('/:id', attractions.updateDetails);

// Delete an attraction
router.delete('/:id', attractions.deleteOne);

module.exports = router;
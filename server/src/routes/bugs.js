const express = require('express');
const router = express.Router();
const {
  getBugs,
  getBugById,
  createBug,
  updateBug,
  deleteBug
} = require('../controllers/bugController');

// GET /api/bugs - Get all bugs
// POST /api/bugs - Create new bug
router.route('/')
  .get(getBugs)
  .post(createBug);

// GET /api/bugs/:id - Get single bug
// PUT /api/bugs/:id - Update bug
// DELETE /api/bugs/:id - Delete bug
router.route('/:id')
  .get(getBugById)
  .put(updateBug)
  .delete(deleteBug);

module.exports = router;
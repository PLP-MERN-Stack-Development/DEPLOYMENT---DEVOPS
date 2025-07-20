const Bug = require('../models/Bug');

// @desc    Get all bugs
// @route   GET /api/bugs
// @access  Public
const getBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.status(200).json(bugs);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single bug
// @route   GET /api/bugs/:id
// @access  Public
const getBugById = async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id);
    
    if (!bug) {
      return res.status(404).json({ 
        error: 'Not Found',
        message: `Bug not found with id of ${req.params.id}`
      });
    }
    
    res.status(200).json(bug);
  } catch (err) {
    next(err);
  }
};

// @desc    Create new bug
// @route   POST /api/bugs
// @access  Public
const createBug = async (req, res, next) => {
  try {
    const bug = new Bug(req.body);
    await bug.save();
    res.status(201).json(bug);
  } catch (err) {
    next(err);
  }
};

// @desc    Update bug
// @route   PUT /api/bugs/:id
// @access  Public
const updateBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!bug) {
      return res.status(404).json({ 
        error: 'Not Found',
        message: `Bug not found with id of ${req.params.id}`
      });
    }
    
    res.status(200).json(bug);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete bug
// @route   DELETE /api/bugs/:id
// @access  Public
const deleteBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    
    if (!bug) {
      return res.status(404).json({ 
        error: 'Not Found',
        message: `Bug not found with id of ${req.params.id}`
      });
    }
    
    res.status(200).json({ 
      success: true,
      message: 'Bug deleted successfully',
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBugs,
  getBugById,
  createBug,
  updateBug,
  deleteBug
};
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // MongoDB validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(el => el.message);
    return res.status(400).json({
      error: 'Validation Error',
      messages: errors
    });
  }
  
  // MongoDB cast errors (invalid ID format)
  if (err.name === 'CastError') {
    return res.status(400).json({ 
      error: 'Invalid ID format',
      message: `Resource not found with id of ${err.value}`
    });
  }
  
  // Custom errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message
    });
  }
  
  // Default to 500 server error
  res.status(500).json({ 
    error: 'Server Error',
    message: 'Something went wrong on the server' 
  });
};

module.exports = errorHandler;
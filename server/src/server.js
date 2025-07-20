const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Load env from root .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');

const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));
app.use(express.json());
app.use(compression());

// API Routes
app.use('/api/bugs', require('./routes/bugs'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const __dirnameGlobal = path.resolve();
  app.use(express.static(path.join(__dirnameGlobal, 'client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirnameGlobal, 'client', 'dist', 'index.html'));
  });
}

// Error handler middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () =>
    console.log(`🚀 Server running in ${process.env.NODE_ENV} on port ${PORT}`)
  );
}

module.exports = app;

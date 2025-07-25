const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// --- Sentry Setup ---
const { Sentry, requestHandler, tracingHandler, errorHandler: sentryErrorHandler } = require('./config/sentry');

const app = express();

// Inject the Express app into Sentry's Express integration
const client = Sentry.getClient();
if (client) {
  const expressIntegration = client.getIntegrationByName && client.getIntegrationByName('Express');
  if (expressIntegration && expressIntegration.setupOnce) {
    // Modern Sentry handles this automatically, but we can ensure the app is available
    expressIntegration._app = app;
  }
}

// --- Connect Database ---
connectDB();

// --- Sentry Request/Tracing Handlers (MUST BE FIRST) ---
app.use(requestHandler);
app.use(tracingHandler);

// --- Core Middlewares ---
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));
app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));

// --- Your Routes ---
app.use('/api/bugs', require('./routes/bugs'));

// --- Health Check ---
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// --- Sentry Error Handler ---
app.use(sentryErrorHandler);

// --- Custom Error Handler ---
app.use(errorHandler);

// --- Serve Frontend (Production Only) ---
if (process.env.NODE_ENV === 'production') {
  const __dirnameGlobal = path.resolve();
  app.use(express.static(path.join(__dirnameGlobal, 'client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirnameGlobal, 'client', 'dist', 'index.html'));
  });
}

// --- Start Server ---
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () =>
    console.log(`🚀 Server running in ${process.env.NODE_ENV} on port ${PORT}`)
  );
}

module.exports = app;
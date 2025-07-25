const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  tracesSampleRate: 1.0,
  integrations: [
    Sentry.httpIntegration(),
    Sentry.expressIntegration(),
  ],
});

module.exports = {
  Sentry,
  requestHandler: Sentry.Handlers?.requestHandler() || ((req, res, next) => next()),
  tracingHandler: Sentry.Handlers?.tracingHandler() || ((req, res, next) => next()),
  errorHandler: Sentry.Handlers?.errorHandler() || ((error, req, res, next) => next(error)),
};
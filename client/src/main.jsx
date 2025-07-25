import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import BugProvider from './providers/BugProvider'
import { BrowserRouter } from 'react-router-dom'
import * as Sentry from '@sentry/react'

// Initialize Sentry as early as possible
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE, // 'development' or 'production'
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <BugProvider>
        <App />
      </BugProvider>
    </BrowserRouter>
  </React.StrictMode>
)

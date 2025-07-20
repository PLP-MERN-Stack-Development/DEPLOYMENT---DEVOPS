import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import BugProvider from './providers/BugProvider' // ✅ correct now
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <BugProvider>
        <App />
      </BugProvider>
    </BrowserRouter>
  </React.StrictMode>
)

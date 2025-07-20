// src/routes/AppRouter.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import BugList from '../components/BugList'
import BugDetails from '../components/BugDetails'
import ReportBugPage from '../pages/ReportBugPage'
import BugEditPage from '../pages/BugEditPage' // ✅ import

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<BugList />} />
      <Route path="/report" element={<ReportBugPage />} />
      <Route path="/bugs/:id" element={<BugDetails />} />
      <Route path="/bugs/:id/edit" element={<BugEditPage />} /> {/* ✅ added */}
    </Routes>
  )
}

export default AppRouter

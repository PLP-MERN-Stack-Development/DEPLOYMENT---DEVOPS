// src/App.jsx
import React, { useState } from 'react'
import BugForm from './components/BugForm'
import Header from './components/Header'
import Footer from './components/Footer'
import Alert from './components/Alert'
import AppRouter from './routes/AppRouter'
import useBugContext from './hooks/useBugContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [showForm, setShowForm] = useState(false)
  const { error, clearError, addBug } = useBugContext()

  const handleSubmitFromModal = async (formData) => {
    try {
      await addBug(formData)
      setShowForm(false)
      toast.success('Bug reported successfully!')
    } catch (err) {
      toast.error('Failed to report bug.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onAddClick={() => setShowForm(true)} />

      <main className="container mx-auto px-4 pt-20 pb-8 flex-grow">
        {error && (
          <Alert 
            message={error} 
            type="error" 
            onClose={clearError} 
            className="mb-6"
          />
        )}

        {showForm && (
          <div className="mb-8 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Report New Bug</h2>
            <BugForm 
              onCancel={() => setShowForm(false)} 
              onSubmit={handleSubmitFromModal}
            />
          </div>
        )}

        <AppRouter />
      </main>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App

// src/context/BugProvider.jsx
import { useState, useEffect, useCallback } from 'react'
import BugContext from '../contexts/BugContext'
import {
  getBugs,
  getBugById,
  createBug,
  updateBug,
  deleteBug
} from '../services/bugService'

const BugProvider = ({ children }) => {
  const [bugs, setBugs] = useState([])
  const [currentBug, setCurrentBug] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleError = (message, err) => {
    console.error(message, err)
    const errorMessage = err.message || 'An unexpected error occurred'
    setError(`${message}: ${errorMessage}`)
  }

  const fetchBugs = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getBugs()
      setBugs(data)
      setError(null)
    } catch (err) {
      handleError('Failed to fetch bugs', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBugs()
  }, [fetchBugs])

  const fetchBugById = async (id) => {
    setLoading(true)
    try {
      const bug = await getBugById(id)
      setCurrentBug(bug)
      setError(null)
    } catch (err) {
      handleError('Failed to fetch bug details', err)
    } finally {
      setLoading(false)
    }
  }

  const addBug = async (bugData) => {
    setLoading(true)
    try {
      const newBug = await createBug(bugData)
      setBugs(prev => [newBug, ...prev])
      setError(null)
      return newBug
    } catch (err) {
      handleError('Failed to create bug', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const editBug = async (id, bugData) => {
    setLoading(true)
    try {
      const updatedBug = await updateBug(id, bugData)
      setBugs(prev =>
        prev.map(bug => (bug._id === id ? updatedBug : bug))
      )
      setCurrentBug(updatedBug)
      setError(null)
      return updatedBug
    } catch (err) {
      handleError('Failed to update bug', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const removeBug = async (id) => {
    setLoading(true)
    try {
      await deleteBug(id)
      setBugs(prev => prev.filter(bug => bug._id !== id))
      setCurrentBug(null)
      setError(null)
    } catch (err) {
      handleError('Failed to delete bug', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => setError(null)

  return (
    <BugContext.Provider
      value={{
        bugs,
        currentBug,
        loading,
        error,
        fetchBugs, // exposed for manual retry
        fetchBugById,
        addBug,
        editBug,
        removeBug,
        clearError
      }}
    >
      {children}
    </BugContext.Provider>
  )
}

export default BugProvider

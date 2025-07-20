// src/pages/BugEditPage.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useBugs from '../hooks/useBugContext'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'

const BugEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { bugs, editBug, fetchBugs } = useBugs()
  const [form, setForm] = useState({ title: '', description: '', status: 'open' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBug = async () => {
      const existingBug = bugs.find(b => b._id === id)
      if (existingBug) {
        setForm({
          title: existingBug.title,
          description: existingBug.description,
          status: existingBug.status
        })
        setLoading(false)
      } else {
        try {
          await fetchBugs()
          const updatedBugList = await bugs.find(b => b._id === id)
          if (updatedBugList) {
            setForm({
              title: updatedBugList.title,
              description: updatedBugList.description,
              status: updatedBugList.status
            })
          } else {
            toast.error('Bug not found')
            navigate('/bugs')
          }
        } catch (err) {
          toast.error('Failed to fetch bug data')
        } finally {
          setLoading(false)
        }
      }
    }

    loadBug()
  }, [id, bugs, fetchBugs, navigate])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await editBug(id, form)
      toast.success('Bug updated successfully')
      navigate(`/bugs/${id}`)
    } catch (error) {
      toast.error('Failed to update bug')
    }
  }

  if (loading) return <Loader />

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Edit Bug</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded text-white font-semibold transition-all 
            bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 
            ring-2 ring-white/50 shadow-md shadow-yellow-500/30"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default BugEditPage

// src/components/BugForm.jsx
import { useState, useEffect } from 'react'
import useBugContext from '../hooks/useBugContext'
import StatusBadge from './StatusBadge'
import PriorityBadge from './PriorityBadge'
import Loader from './Loader'

const BugForm = ({ bug, onCancel, onSubmit }) => {
  const { loading } = useBugContext()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  })

  useEffect(() => {
    if (bug) {
      setFormData({
        title: bug.title,
        description: bug.description,
        status: bug.status,
        priority: bug.priority
      })
    }
  }, [bug])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const isSubmitting = loading === 'create' || loading === 'update'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter bug title"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Describe the bug in detail..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <div className="flex space-x-2">
            {['open', 'in-progress', 'resolved'].map(status => (
              <button
                key={status}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, status }))}
                className={`flex-1 py-2 px-3 rounded-md border text-sm ${
                  formData.status === status
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <StatusBadge status={status} showText />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <div className="flex space-x-2">
            {['low', 'medium', 'high'].map(priority => (
              <button
                key={priority}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, priority }))}
                className={`flex-1 py-2 px-3 rounded-md border text-sm ${
                  formData.priority === priority
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <PriorityBadge priority={priority} showText />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm bg-gradient-to-r from-amber-500 to-orange-500 ring-2 ring-white/50 shadow-amber-500/30 hover:from-amber-400 hover:to-orange-400"
        >
          {isSubmitting ? (
            <Loader size="small" text={bug ? 'Updating...' : 'Creating...'} />
          ) : bug ? (
            'Update Bug'
          ) : (
            'Create Bug'
          )}
        </button>
      </div>
    </form>
  )
}

export default BugForm

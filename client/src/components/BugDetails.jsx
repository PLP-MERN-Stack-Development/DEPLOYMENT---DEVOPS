import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useBugs from '../hooks/useBugContext'  // ✅ Fixed import
import StatusBadge from './StatusBadge'
import PriorityBadge from './PriorityBadge'
import Loader from './Loader'
import BugForm from './BugForm'

const BugDetails = () => {
  const { id } = useParams()
  const { currentBug, loading, fetchBugById, editBug } = useBugs()
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (id) {
      fetchBugById(id)
    }
  }, [id, fetchBugById])

  const handleEditSubmit = async (formData) => {
    await editBug(id, formData)
    setIsEditing(false)
  }

  if (loading === 'fetch') {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="large" />
      </div>
    )
  }

  if (!currentBug) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Bug Not Found</h3>
          <p className="text-gray-500">The requested bug could not be found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Bug Details</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          {isEditing ? 'Cancel Edit' : 'Edit Bug'}
        </button>
      </div>

      {isEditing ? (
        <div className="p-6">
          <BugForm
            bug={currentBug}
            onSubmit={handleEditSubmit}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      ) : (
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-medium text-gray-900 mr-2">
                {currentBug.title}
              </h3>
              <StatusBadge status={currentBug.status} />
              <PriorityBadge priority={currentBug.priority} className="ml-2" />
            </div>

            <p className="text-gray-600 whitespace-pre-line">
              {currentBug.description}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Timestamps</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Created: </span>
                <span className="text-gray-900">
                  {new Date(currentBug.createdAt).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Last Updated: </span>
                <span className="text-gray-900">
                  {new Date(currentBug.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <Link
              to="/"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              &larr; Back to all bugs
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default BugDetails

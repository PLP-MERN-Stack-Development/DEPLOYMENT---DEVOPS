// src/pages/ReportBugPage.jsx
import { useNavigate } from 'react-router-dom'
import BugForm from '../components/BugForm'
import useBugContext from '../hooks/useBugContext'
import { toast } from 'react-toastify'

const ReportBugPage = () => {
  const { addBug } = useBugContext()
  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
    try {
      await addBug(formData)
      toast.success('Bug reported successfully!')
      setTimeout(() => navigate('/'), 1500)
    } catch (error) {
      console.error('Error submitting bug:', error)
      toast.error('Failed to report bug.')
    }
  }

  const handleCancel = () => {
    navigate('/')
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Report a New Bug</h2>
      <BugForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  )
}

export default ReportBugPage

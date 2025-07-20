// src/components/StatusBadge.jsx
import { FaCircle } from 'react-icons/fa'

const statusConfig = {
  open: {
    text: 'Open',
    color: 'text-yellow-500',
    bg: 'bg-yellow-100',
    border: 'border-yellow-300'
  },
  'in-progress': {
    text: 'In Progress',
    color: 'text-blue-500',
    bg: 'bg-blue-100',
    border: 'border-blue-300'
  },
  resolved: {
    text: 'Resolved',
    color: 'text-green-500',
    bg: 'bg-green-100',
    border: 'border-green-300'
  }
}

const StatusBadge = ({ status, showText = false }) => {
  const config = statusConfig[status] || statusConfig.open
  
  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        showText ? 'border' : ''
      } ${config.bg} ${showText ? config.border : ''}`}
    >
      <FaCircle className={`mr-1 ${config.color}`} size={8} />
      {showText && config.text}
    </span>
  )
}

export default StatusBadge
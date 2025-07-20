// src/components/Alert.jsx
import { FaTimes, FaExclamationCircle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa'

const Alert = ({ message, type = 'info', onClose, className = '' }) => {
  if (!message) return null
  
  const typeStyles = {
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }
  
  const iconMap = {
    error: <FaExclamationCircle className="text-red-500" />,
    success: <FaCheckCircle className="text-green-500" />,
    warning: <FaExclamationCircle className="text-yellow-500" />,
    info: <FaInfoCircle className="text-blue-500" />,
  }

  return (
    <div className={`${typeStyles[type]} border rounded-lg p-4 flex items-start ${className}`}>
      <div className="mr-3 mt-0.5 text-xl">
        {iconMap[type]}
      </div>
      <div className="flex-1">
        {message}
      </div>
      {onClose && (
        <button 
          onClick={onClose}
          className="ml-3 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <FaTimes />
        </button>
      )}
    </div>
  )
}

export default Alert
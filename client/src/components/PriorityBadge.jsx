// src/components/PriorityBadge.jsx
const priorityConfig = {
  low: {
    text: 'Low',
    color: 'text-green-500',
    bg: 'bg-green-100',
    border: 'border-green-300'
  },
  medium: {
    text: 'Medium',
    color: 'text-yellow-500',
    bg: 'bg-yellow-100',
    border: 'border-yellow-300'
  },
  high: {
    text: 'High',
    color: 'text-red-500',
    bg: 'bg-red-100',
    border: 'border-red-300'
  }
}

const PriorityBadge = ({ priority, showText = false, className = '' }) => {
  const config = priorityConfig[priority] || priorityConfig.medium
  
  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        showText ? 'border' : ''
      } ${config.bg} ${showText ? config.border : ''} ${className}`}
    >
      {showText && config.text}
      {!showText && (
        <span className="flex items-center">
          <span className={`mr-1 ${config.color}`}>
            {priority === 'high' ? '!!!' : priority === 'medium' ? '!!' : '!'}
          </span>
        </span>
      )}
    </span>
  )
}

export default PriorityBadge
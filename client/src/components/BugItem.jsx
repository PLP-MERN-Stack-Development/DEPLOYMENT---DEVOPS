// src/components/BugItem.jsx
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useBugContext from '../hooks/useBugContext';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import Loader from './Loader';

const BugItem = ({ bug }) => {
  const { loading, removeBug } = useBugContext();
  const isDeleting = loading && typeof loading === 'string' && loading.includes('delete');
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this bug?')) {
      removeBug(bug._id);
    }
  };

  const handleCardClick = () => {
    navigate(`/bugs/${bug._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer block hover:bg-gray-50 transition duration-150 px-6 py-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center mb-1">
            <h3 className="text-lg font-medium text-gray-900 truncate mr-2">
              {bug.title}
            </h3>
            <StatusBadge status={bug.status} />
            <PriorityBadge priority={bug.priority} className="ml-2" />
          </div>

          <p className="text-gray-600 truncate mb-2">
            {bug.description}
          </p>

          <div className="flex items-center text-sm text-gray-500">
            <span>
              Created: {new Date(bug.createdAt).toLocaleDateString()}
            </span>
            {bug.updatedAt && (
              <span className="ml-4">
                Updated: {new Date(bug.updatedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <div
          className="flex space-x-2 ml-4"
          onClick={(e) => e.stopPropagation()} // prevent card click
        >
          <Link
            to={`/bugs/${bug._id}/edit`}
            className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-indigo-50"
          >
            <FaEdit />
          </Link>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 disabled:opacity-50"
          >
            {isDeleting ? <Loader size="small" /> : <FaTrash />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BugItem;

import BugItem from './BugItem';
import Loader from './Loader';
import useBugContext from '../hooks/useBugContext';

const BugList = () => {
  const { bugs, loading, error, fetchBugs } = useBugContext();

  if (loading && bugs.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <Loader size="large" text="Fetching bugs..." />
        <p className="text-gray-600 animate-pulse">Please wait while we load your data</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchBugs}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (bugs.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bugs Found</h3>
          <p className="text-gray-500">Start by reporting a new bug</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">All Bugs</h2>
      </div>

      <div className="divide-y">
        {bugs.map(bug => (
          <BugItem key={bug._id} bug={bug} />
        ))}
      </div>
    </div>
  );
};

export default BugList;

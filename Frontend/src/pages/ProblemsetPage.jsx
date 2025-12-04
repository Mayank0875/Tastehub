// pages/ProblemsetPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from '../components/Router';
import UserProfile from '../components/UserProfile';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const ProblemsetPage = () => {
  const { problems, loading, fetchProblems } = useApp();
  const { isAdmin, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 7;

  // Fetch problems when component mounts or becomes visible
  useEffect(() => {
    // Fetch on mount
    fetchProblems();

    // Fetch when page becomes visible (user navigates back)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('Page visible, refreshing problems...');
        fetchProblems();
      }
    };

    // Fetch when user navigates back using browser back button
    const handleFocus = () => {
      console.log('Window focused, refreshing problems...');
      fetchProblems();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Calculate pagination
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = problems.slice(indexOfFirstProblem, indexOfLastProblem);
  const totalPages = Math.ceil(problems.length / problemsPerPage);

  // Reset to page 1 when problems change
  useEffect(() => {
    setCurrentPage(1);
  }, [problems.length]);

  const handleDeleteProblem = async (problemId, problemTitle) => {
    if (window.confirm(`Are you sure you want to delete "${problemTitle}"?`)) {
      try {
        const response = await axios.delete(`http://localhost:3030/admin/problems/${problemId}`);
        if (response.data.success) {
          alert('Problem deleted successfully!');
          fetchProblems(); // Refresh the problem list
        }
      } catch (error) {
        console.error('Failed to delete problem:', error);
        alert('Failed to delete problem: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-grow flex flex-col gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg overflow-x-auto">
          {/* Header with Create Button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Problems</h2>
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={20} />
                Create Problem
              </Link>
            )}
          </div>

          <div className={`grid ${isAdmin ? 'grid-cols-5' : 'grid-cols-5'} gap-4 text-xs lg:text-sm font-semibold text-gray-600 pb-2 border-b border-gray-200`}>
            <div>PROBLEM NAME</div>
            <div className="text-center">CREATOR</div>
            <div className="text-center">STATUS</div>
            <div className="text-right">RATING</div>
            <div className="text-right">{isAdmin ? 'ACTIONS' : 'TAGS'}</div>
          </div>

          {loading ? (
            <div className="text-center py-6 text-gray-600">
              Loading problems...
            </div>
          ) : currentProblems.length > 0 ? (
            currentProblems.map((problem) => (
              <div
                key={problem.id}
                className={`grid ${isAdmin ? 'grid-cols-5' : 'grid-cols-5'} items-center gap-4 py-3 border-b border-gray-200 last:border-b-0`}
              >
                <Link
                  to={`/problem/${problem.id}`}
                  className="text-[#1ba3ff] hover:underline text-sm md:text-base"
                >
                  {problem.title}
                </Link>
                <div className="text-center">
                  <span className="text-xs text-gray-600">
                    {problem.creator ? problem.creator.username : 'System'}
                  </span>
                </div>
                <div className="flex justify-center">
                  <span className="h-3 w-3 rounded-full bg-gray-300"></span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800">
                    {problem.rating}
                  </span>
                </div>
                {isAdmin ? (
                  <div className="text-right">
                    <button
                      onClick={() => handleDeleteProblem(problem.id, problem.title)}
                      className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 transition-colors"
                      title="Delete Problem"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="text-right">
                    <div className="flex flex-wrap justify-end gap-1">
                      {problem.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-300 text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                      {problem.tags.length > 2 && (
                        <span className="text-xs text-gray-400">
                          +{problem.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-600">
              No problems found.
              {isAdmin && (
                <div className="mt-2">
                  <Link to="/admin" className="text-[#1ba3ff] hover:underline">
                    Create your first problem
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          {!loading && problems.length > problemsPerPage && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Showing {indexOfFirstProblem + 1} to {Math.min(indexOfLastProblem, problems.length)} of {problems.length} problems
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>
                
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Show first page, last page, current page, and pages around current
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            currentPage === pageNumber
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return <span key={pageNumber} className="px-2 text-gray-400">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <UserProfile />
    </div>
  );
};

export default ProblemsetPage;
import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'; // Import new icons
import type { Pagination as PaginationType } from '../types/job'; // Alias to avoid naming conflict

interface PaginationProps {
  pagination: PaginationType;
  handlePageChange: (newPage: number) => void;
  loading: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, handlePageChange, loading }) => {
  if (pagination.totalPages <= 1) {
    return null; // Don't render pagination if only one page
  }

  const { currentPage, totalPages, totalJobs, hasPrev, hasNext } = pagination;

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {((currentPage - 1) * 20) + 1} to {Math.min(currentPage * 20, totalJobs)} of {totalJobs} jobs
        </div>
        <div className="flex items-center space-x-2">
          {/* First Page Button */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={!hasPrev || loading} // Disable if on first page or loading
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            title="First Page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>

          {/* Previous Page Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!hasPrev || loading}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            title="Previous Page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm">
            {currentPage} / {totalPages}
          </span>

          {/* Next Page Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasNext || loading}
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            title="Next Page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Last Page Button */}
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={!hasNext || loading} // Disable if on last page or loading
            className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            title="Last Page"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
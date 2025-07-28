import React from "react"
import { useJobs } from './hooks/useJobs';
import SearchBar from './components/SearchBar';
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';
import Pagination from './components/Pagination'; // New import

const App: React.FC = () => {
  const {
    jobs,
    selectedJob,
    setSelectedJob,
    searchLocation,
    setSearchLocation,
    loading,
    error,
    pagination,
    handleSearch,
    handlePageChange,
    searchError // New: get search validation error
  } = useJobs(); // Using the custom hook

  return (
    <div className="flex h-screen bg-gray-50 px-12 py-4">
      {/* Left Sidebar - Job List */}
      <div className="w-1/2 bg-white border-r border-gray-200 flex flex-col">
        <SearchBar
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          handleSearch={handleSearch}
          loading={loading}
        />

        {/* Search validation error */}
        {searchError && (
          <div className="mx-4 mb-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-sm">
            {searchError}
          </div>
        )}

        {/* API error */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}

        {/* Pass loading state to JobList to handle its own loading display */}
        <JobList
          jobs={jobs}
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
          searchLocation={searchLocation}
          loading={loading} // Pass loading state
        />

        <Pagination
          pagination={pagination}
          handlePageChange={handlePageChange}
          loading={loading}
        />
      </div>

      {/* Right Panel - Job Details */}
      <div className="w-1/2 bg-white overflow-y-auto">
        <JobDetails job={selectedJob} />
      </div>
    </div>
  );
};

export default App;
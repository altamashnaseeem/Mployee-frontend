import React from 'react';
import { MapPin } from 'lucide-react';
import type { Job } from '../types/job';
import { getDaysAgo } from '../utils//helper';

interface JobListProps {
  jobs: Job[];
  selectedJob: Job | null;
  setSelectedJob: (job: Job) => void;
  searchLocation: string;
  loading: boolean; // Add loading prop to Joblist
}

const JobList: React.FC<JobListProps> = ({ jobs, selectedJob, setSelectedJob, searchLocation, loading }) => {
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-500">Loading jobs...</div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        {searchLocation ? `No jobs found for "${searchLocation}"` : 'No jobs available'}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {jobs.map((job) => (
        <div
          key={job.jobId} // Use jobId
          onClick={() => setSelectedJob(job)}
          className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedJob && selectedJob.jobId === job.jobId // Use jobId
              ? 'bg-blue-50 border-l-4 border-l-blue-500'
              : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{job.company}</p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {job.location}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {getDaysAgo(job.postedDateTime)}
                </span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {job.source}
                </span>
              </div>
            </div>
            {job.companyImageUrl && (
              <img
                src={job.companyImageUrl}
                alt={job.company}
                className="w-12 h-12 rounded-lg ml-4 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
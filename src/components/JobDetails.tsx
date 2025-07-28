import React from 'react';
import { MapPin, Calendar, Briefcase, Building, Clock, ExternalLink } from 'lucide-react';
import type { Job } from '../types/job';
import { formatDate, getDaysAgo } from '../utils/helper';

interface JobDetailsProps {
  job: Job | null;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  if (!job) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a job to view details
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Job Header */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {job.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-2">
              <Building className="h-5 w-5 mr-2" />
              {job.company}
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-5 w-5 mr-2" />
              {job.location}
            </div>
          </div>
          {job.companyImageUrl && (
            <img
              src={job.companyImageUrl}
              alt={job.company}
              className="w-16 h-16 rounded-lg object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
        </div>

        <div className="flex items-center justify-between">
          <a
            href={job.jobLink} // Use jobLink
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:opacity-70 transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Apply Now
          </a>
          <span className="text-sm text-gray-500">
            {getDaysAgo(job.postedDateTime)}
          </span>
        </div>
      </div>

      {/* Job Details */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Job Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Employment Type</p>
                <p className="font-medium">{job.employmentType || 'N/A'}</p> {/* Use employmentType */}
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-medium">{job.experience || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Posted Date</p>
                <p className="font-medium">{formatDate(job.postedDateTime)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Building className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Source</p>
                <p className="font-medium capitalize">{job.source || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Job Description
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {job.description || `Join ${job.company} as a ${job.title}. Great opportunity for career growth.`}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        {(job.seniorityLevel || (job.minExp !== undefined && job.maxExp !== undefined) || job.companyType) && ( // Use correct properties
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Requirements
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              {job.seniorityLevel && ( // Use seniorityLevel
                <p className="text-sm text-gray-600">
                  <strong>Seniority Level:</strong> {job.seniorityLevel}
                </p>
              )}
              {job.minExp !== undefined && job.maxExp !== undefined && ( // Use minExp/maxExp
                <p className="text-sm text-gray-600">
                  <strong>Experience Range:</strong> {job.minExp} - {job.maxExp} years
                </p>
              )}
              {job.companyType && ( // Use companyType
                <p className="text-sm text-gray-600">
                  <strong>Company Size:</strong> {job.companyType} company
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
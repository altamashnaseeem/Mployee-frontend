import { useState, useEffect, useCallback } from 'react';
import type { Job, Pagination, JobsApiResponse } from '../types/job';
import { fetchJobs } from '../utils/api';

export interface UseJobsResult {
  jobs: Job[];
  selectedJob: Job | null;
  setSelectedJob: React.Dispatch<React.SetStateAction<Job | null>>;
  searchLocation: string;
  setSearchLocation: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  error: string;
  pagination: Pagination;
  handleSearch: (location: string) => void;
  handlePageChange: (newPage: number) => void;
  searchError: string; // New: validation error message
}

export const useJobs = (): UseJobsResult => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchLocation, setSearchLocation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [searchError, setSearchError] = useState<string>(''); // New: validation error state
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  
  // It now takes 'page' and 'location' as direct arguments
  const getJobs = useCallback(async (page: number, location: string) => {
    setLoading(true);
    setError('');

    try {
      const data: JobsApiResponse = await fetchJobs(page, location); // Use the provided page and location

      setJobs(data.jobs || []);
      setPagination(data.pagination || { currentPage: 1, totalPages: 1, totalJobs: 0, hasNext: false, hasPrev: false });

      // Set first job as selected if available and no job is currently selected
      // Or if the currently selected job is no longer in the fetched list
      if (data.jobs && data.jobs.length > 0) {
        if (!selectedJob || !data.jobs.some(job => job.jobId === selectedJob.jobId)) {
          setSelectedJob(data.jobs[0]);
        }
      } else {
        setSelectedJob(null);
      }

    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs. Please try again.');
      // Fallback to sample data for demo
      const sampleJobs: Job[] = [
        {
          jobId: "33411379",
          title: "SAP Project Manager",
          company: "Executive Softway Guild India Private Limited",
          location: "Hyderabad, Bengaluru",
          jobLink: "https://www.foundit.in/job/33411379",
          employmentType: "Permanent Job",
          experience: "10-20 Years",
          source: "foundit",
          country: "India",
          postedDateTime: new Date("2024-12-23T07:22:17.710Z").toISOString(),
          companyImageUrl: "https://media.foundit.in/trex/search/public/images/companyLogoDefault.png",
          minExp: 10,
          maxExp: 20,
          description: "Looking for experienced SAP Project Manager to lead implementation projects. Must have strong leadership skills and experience with SAP modules."
        },
        {
          jobId: "4106589701",
          title: "System Engineer",
          company: "SystematizeHA",
          location: "Bengaluru, Karnataka, India",
          jobLink: "https://in.linkedin.com/jobs/view/system-engineer-at-systematizeha-4106589701",
          seniorityLevel: "Entry level",
          employmentType: "Full time",
          source: "linkedin",
          experience: "0-2 years",
          companyUrl: "https://in.linkedin.com/company/systematizeha",
          companyImageUrl: "https://media.licdn.com/dms/image/v2/D560BAQEwuLkARUZIdQ/company-logo_100_100/company-logo_100_100/0/1718879848585",
          postedDateTime: new Date("2024-12-23T07:16:54.134Z").toISOString(),
          minExp: 6,
          maxExp: 8,
          country: "India",
          companyType: "medium",
          description: "Entry-level System Engineer position. Great opportunity for fresh graduates to start their career in IT infrastructure and system administration."
        }
      ];

      setJobs(sampleJobs);
      setSelectedJob(sampleJobs[0]);
      // IMPORTANT: When falling back to sample data, ensure pagination
      // reflects that. For demo, setting it to 1 page is fine.
      setPagination({ currentPage: 1, totalPages: 1, totalJobs: 2, hasNext: false, hasPrev: false });
    } finally {
      setLoading(false);
    }
  }, [selectedJob]); // Depend on selectedJob for the auto-selection logic

  // EFFECT: Fetch jobs whenever currentPage or searchLocation changes
  // Only fetch if searchLocation is empty OR has 3+ characters
  useEffect(() => {
    if (searchLocation === '' || searchLocation.length >= 3) {
      getJobs(currentPage, searchLocation);
    }
  }, [currentPage, searchLocation, getJobs]); // Added getJobs as dependency for useCallback stability

  // Handle search action with validation
  const handleSearch = (location: string) => {
    const trimmedLocation = location.trim();
    
    // Clear previous search error
    setSearchError('');
    
    // Validate minimum 3 characters (if not empty)
    if (trimmedLocation !== '' && trimmedLocation.length < 3) {
      setSearchError('Please enter at least 3 characters to search');
      return; // Don't proceed with search
    }
    
    setSearchLocation(trimmedLocation);
    setCurrentPage(1); // Always reset to page 1 on new search
  };

  const handlePageChange = (newPage: number) => {

    setCurrentPage(newPage);
  };

  return {
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
    searchError, // New: return validation error
  };
};
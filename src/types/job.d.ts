export interface Job {
  jobId: string; // Changed from "Job ID (Numeric)"
  title: string;
  company: string;
  location: string;
  jobLink?: string; // Changed from job_link
  employmentType?: string; // Changed from employment_type
  experience?: string;
  source?: string;
  country?: string;
  postedDateTime?: string; // Assuming ISO string from backend (e.g., "2024-07-17T10:00:00.000Z")
  companyImageUrl?: string;
  minExp?: number; // Changed from min_exp
  maxExp?: number; // Changed from max_exp
  seniorityLevel?: string; // Changed from seniority_level
  companyUrl?: string; // Changed from company_url
  companyType?: string; // Changed from companytype
  description?: string;
  // Add any other fields you expect from your backend's Job model
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalJobs: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface JobsApiResponse {
  jobs: Job[];
  pagination: Pagination;
}
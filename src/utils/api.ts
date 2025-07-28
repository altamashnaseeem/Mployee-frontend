import type { JobsApiResponse } from '../types/job';

// For Vite, use import.meta.env.VITE_API_BASE_URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4002/api';

// --- Using Native Fetch API (as in your provided code) ---
export const fetchJobs = async (page: number = 1, location: string = ''): Promise<JobsApiResponse> => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', '20'); // Hardcoded limit as in your code
   
  if (location.trim()) {
    params.append('location', location);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/jobs?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: JobsApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    // You might want to re-throw or return a specific error object
    // to be handled by the calling component/hook.
    throw error;
  }
};

/*
// --- Alternative: Using Axios (if you prefer, remember to npm install axios) ---
import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchJobsAxios = async (page: number = 1, location: string = ''): Promise<JobsApiResponse> => {
  try {
    const response = await axiosInstance.get<JobsApiResponse>('/jobs', {
      params: {
        page: page,
        limit: 20,
        location: location.trim() ? location : undefined, // Send location only if not empty
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs with Axios:', error);
    throw error;
  }
};
*/
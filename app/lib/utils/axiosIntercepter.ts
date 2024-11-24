import axios from 'axios';
import { getCookie } from './helper';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_SERVICE_URL, // Base URL for all requests
  timeout: 10000, // Set a timeout (10 seconds)
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token
    if(config.method !== "get"){
        const accessToken = getCookie('accessToken');
        // TODO: Throw Error if a user is not admin.
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
  },
  (error) => {
    // Handle request errors
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response errors (e.g., 401 Unauthorized)
    if (error.response) {
      console.error(
        `[Response Error] ${error.response.status} - ${error.response.config.url}`,
        error.response.data
      );
    } else {
      console.error('[Response Error]', error.message);
    }

    // Optional: Retry logic or redirect for specific status codes
    if (error.response?.status === 401) {
      // For example, log out user on 401 Unauthorized
    //   localStorage.removeItem('authToken');
    //   window.location.href = '/login'; // Redirect to login page
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
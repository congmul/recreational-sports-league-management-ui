import axios from 'axios';
import { getCookie, setCookie } from './helper';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CORE_SERVICE_URL, // Base URL for all requests
  timeout: 10000, // Set a timeout (10 seconds)
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Add authorization token
    if(config.method !== "get"){
      if(config.url?.includes('auth') || config.url?.includes('auth')){
        return config;
      }

      const accessToken = getCookie('accessToken');
      if(!accessToken) {
        throw new Error("Request failed with status code 401", { cause: { status: 401 } })
      }

      // Check if the user has admin role. If not, fail earlier.
      const userInfo = getCookie("userInfo");
      const parsedUserInfo = userInfo ? JSON.parse(userInfo) : undefined;
      if(!(parsedUserInfo && parsedUserInfo.role === "admin")){
        throw new Error("Request failed with status code 401", { cause: { status: 401 } })
      }
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
      if(error.response?.data.message === "Token is expired." || error.response?.data.message === "There is no valid Token"){
        setCookie('userInfo', "", 0);
        setCookie('accessToken', "", 0);
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
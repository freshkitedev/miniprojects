import axios from 'axios';
import { BASE_URL } from '../config';

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Set your API base URL
  timeout: 5000, // Set a timeout for requests (optional)
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request configuration here if needed
    console.log("reqConfig:", config);
    return config;
  },
  (error) => {
    // Handle request errors here
    console.log("reqerror:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the successful response here if needed
    console.log("res:", response);
    return response;
  },
  (error) => {
    // Handle response errors here
    console.log("reserror:", error);
    if (error.response) {
      // The request was made, but the server responded with an error status code
      console.error('Status Code:', error.response.status);
      console.error('Response Data:', error.response.data);
      // You can customize how you want to handle and display the error message here
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received from the server');
      return Promise.reject('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      return Promise.reject(error.message);
    }
  }
);

export default axiosInstance;

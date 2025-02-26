import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://35.240.187.228:3003', // Base URL of your backend
  timeout: 5000, // Optional timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getMachines = async () => {
    try {
      const response = await apiClient.get('/items');
      console.log('API Response:', response.data); // ✅ Log API response
      return response.data; // Make sure response.data is the actual array of machines
    } catch (error) {
      console.error('Error fetching machines:', error.message);
      throw error;
    }
  };

  export const loginUser = async (email, password) => {
    try {
      const response = await apiClient.get(`/login`, {
        params: { email, password }, // Pass parameters correctly
      });
  
      console.log('Login Response:', response.data); // ✅ Log response
  
      return response.data; // Return response (success, token, user info)
    } catch (error) {
      console.error('Login Error:', error.message);
      throw error;
    }
  };
  
  
export default apiClient;

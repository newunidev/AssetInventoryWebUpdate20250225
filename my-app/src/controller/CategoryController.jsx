import apiClient from '../utility/api'; // Import the existing Axios instance

export const getCategories = async () => {
    try {
        const response = await apiClient.get('/categories');
        console.log('Categories Response:', response.data); // ✅ Log API response
        return response.data; // Return categories data
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        throw error;
    }
};

export default {
    getCategories
};

import axios from "axios";

// Get the base URL from the environment variable
const baseURL = process.env.REACT_APP_API_BASE_URL; 

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
    baseURL,
});

export default axiosInstance;

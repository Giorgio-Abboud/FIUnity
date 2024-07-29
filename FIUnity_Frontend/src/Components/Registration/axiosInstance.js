import axios from "axios";

// Set the base URL for your API requests
axios.defaults.baseURL = "http://localhost:8000/";

// Intercept every request and include the JWT token if available
axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;

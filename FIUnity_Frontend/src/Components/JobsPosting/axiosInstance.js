import axios from "axios";

// Set the base URL for your API requests
axios.defaults.baseURL = "http://localhost:8008/";

// Intercept every request and include CSRF token
axios.interceptors.request.use(
  (config) => {
    const csrfToken = localStorage.getItem("csrfToken");
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;

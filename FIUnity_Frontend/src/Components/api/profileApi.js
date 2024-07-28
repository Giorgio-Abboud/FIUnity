import axios from 'axios';

// Base URL for your API
const API_URL = 'http://localhost:8000/profile';

// Axios instance with token authentication
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
},
(error) => {
      return Promise.reject(error);
    }
);

// Fetch extracurriculars
export const fetchExtracurriculars = async () => {
  try {
    const response = await axiosInstance.get('/extracurricular/');
    console.log("Access Token:", localStorage.getItem('access_token'));
    return response.data;
  } catch (error) {
    console.error('Error fetching extracurriculars:', error);
    throw error;
  }
};

// Create extracurricular
export const createExtracurricular = async (data) => {
    try {
      console.log("BEFORE POST REQUEST");
      console.log("data", data)

      const response = await axiosInstance.post('/extracurricular/', {
        extracurricular: {
            name: data.name || '',
            description: data.description || ''
          }
      });      
      
      console.log("AFTER POST REQUEST");
      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Error request data:', error.request);
      } else {
        // Something else went wrong
        console.error('Error message:', error.message);
      }
      throw error;
    }
  };

// Update extracurricular
export const updateExtracurricular = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/extracurricular/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating extracurricular:', error);
    throw error;
  }
};

// Delete extracurricular
export const deleteExtracurricular = async (id) => {
  try {
    const response = await axiosInstance.delete(`/extracurricular/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting extracurricular:', error);
    throw error;
  }
};

// Fetch projects
export const fetchProjects = async () => {
  try {
    const response = await axiosInstance.get('/project/');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Create project
export const createProject = async (data) => {
  try {
    const response = await axiosInstance.post('/project/', data);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Update project
export const updateProject = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/project/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (id) => {
  try {
    const response = await axiosInstance.delete(`/project/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

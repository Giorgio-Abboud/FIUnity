import axios from 'axios';

// Base URL for your API
const API_URL = 'http://localhost:8008/profile';

// Axios instance with token authentication
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the JWT token
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

// Create extracurricular
export const createExtracurricular = async (data) => {
    try {
      console.log('extracur data', data)
      const response = await axiosInstance.post('/extracurriculars/', data);      
      console.log('extracurr after request', response)
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      throw error;
    }
  };

// Update extracurricular
export const updateExtracurricular = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/extracurriculars/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating extracurricular:', error);
    throw error;
  }
};

// Delete extracurricular
export const deleteExtracurricular = async (id) => {
  try {
    const response = await axiosInstance.delete(`/extracurriculars/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting extracurricular:', error);
    throw error;
  }
};


// Create project
export const createProject = async (data) => {
  try {
    console.log('project coming in', data)

    const response = await axiosInstance.post('/projects/', data);
    
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

// Update project
export const updateProject = async (id, data) => {
  try {
    console.log('update project data', data)
    const response = await axiosInstance.patch(`/projects/${id}/`, data);
    console.log('response', response)
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (id) => {
  try {
    const response = await axiosInstance.delete(`/projects/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Create an experience
export const createExperience = async (data) => {
  try {
    console.log('experience data before axios', data)

    const response = await axiosInstance.post('/experiences/', data);
    return response.data;
  } catch (error) {
    console.error('Error creating experience:', error);
    throw error;
  }
};

// Update an experience
export const updateExperience = async (id, data) => {
  try {
    const response = await axiosInstance.patch(`/experiences/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating experience:', error);
    throw error;
  }
};

// Delete an experience
export const deleteExperience = async (id) => {
  try {
    const response = await axiosInstance.delete(`/experiences/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Create a skill
export const createSkill = async (data) => {
  try {
    console.log('skill data before axios', data)

    const response = await axiosInstance.post('/skills/', data);
      console.log('skills after request', response)

    return response.data;
  } catch (error) {
    console.error('Error creating experience:', error);
    throw error;
  }
};

// Delete a skill
export const deleteSkill = async (id) => {
  try {
    const response = await axiosInstance.delete(`/skills/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

export default axiosInstance;
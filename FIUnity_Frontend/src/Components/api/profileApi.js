import axios from 'axios';

// Base URL for your API
const API_URL = 'http://localhost:8000/profile';

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

// // Fetch extracurriculars
// export const fetchExtracurriculars = async () => {
//   try {
//     const response = await axiosInstance.get('/extracurriculars/');
//     console.log('response', response);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching extracurriculars:', error);
//     throw error;
//   }
// };

// Create extracurricular
export const createExtracurricular = async (data) => {
    try {
      const response = await axiosInstance.post('/extracurriculars/', {
            extracurricular: data.name || '',
            description: data.description || ''
      });      
      
      console.log("AFTER POST REQUEST");
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
    console.log('data coming in', data)

    const response = await axiosInstance.post('/projects/', {
      project: data.name,
      description: data.description,
      skills: data.skills,
    });
    
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
export const updateProject = async (data) => {
  try {
    console.log('data', data)
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


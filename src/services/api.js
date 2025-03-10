import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
};

export const scriptsAPI = {
  getAll: () => api.get('/scripts'),
  getById: (id) => api.get(`/scripts/${id}`),
  create: (data) => api.post('/scripts', data),
  update: (id, data) => api.put(`/scripts/${id}`, data),
  delete: (id) => api.delete(`/scripts/${id}`),
};

export const aiAPI = {
  generate: (prompt) => api.post('/ai/generate', { prompt }),
};

export default api;
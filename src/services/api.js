import axios from 'axios';

const API_URL = "https://backend-script-ai.vercel.app";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (data) => api.post('/api/auth/login', data),
  register: (data) => api.post('/api/auth/register', data),
};

export const scriptsAPI = {
  getAll: () => api.get('/api/scripts'),
  getById: (id) => api.get(`/api/scripts/${id}`),
  create: (data) => api.post('/api/scripts', data),
  update: (id, data) => api.put(`/api/scripts/${id}`, data),
  delete: (id) => api.delete(`/api/scripts/${id}`),
};

export const aiAPI = {
  generate: (prompt) => api.post('/api/ai/generate', { prompt }),
};

export default api;
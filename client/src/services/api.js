import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://tempora-fullstack.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me')
};

export const productsAPI = {
  getAll: () => api.get('/products'),
  getOne: (id) => api.get(`/products/${id}`),
  create: (productData) => api.post('/products', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`)
};

export const quotationsAPI = {
  create: (quotationData) => api.post('/quotations', quotationData),
  getMyQuotations: () => api.get('/quotations/my-quotations'),
  getAll: () => api.get('/quotations'),
  getOne: (id) => api.get(`/quotations/${id}`),
  update: (id, quotationData) => api.put(`/quotations/${id}`, quotationData),
  delete: (id) => api.delete(`/quotations/${id}`)
};

export default api;

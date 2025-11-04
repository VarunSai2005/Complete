import axios from 'axios';

const BASE_URL = "https://noque-server.onrender.com/"

export const api = axios.create({
  baseURL: BASE_URL + '/api',
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

const existing = localStorage.getItem('token');
if (existing) setAuthToken(existing);

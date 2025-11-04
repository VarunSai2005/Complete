import axios from 'axios';

<<<<<<< HEAD
const BASE_URL = 'https://noque-server.onrender.com/' || 'http://localhost:5000';
=======
const BASE_URL = "https://noque-server.onrender.com/"
>>>>>>> ee3741a5c66c14d262a7682f0b22a936f6294f45

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

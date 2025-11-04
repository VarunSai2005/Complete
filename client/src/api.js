import axios from 'axios';

// ✅ Use Render backend by default, or fallback to .env for flexibility
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://noque-server.onrender.com';

export const api = axios.create({
  baseURL: BASE_URL + '/api',
});

// ✅ Auth token helper
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// ✅ Load existing token (if user was already logged in)
const existing = localStorage.getItem('token');
if (existing) setAuthToken(existing);

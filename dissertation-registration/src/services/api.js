import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Creez instanța axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor pentru adăugarea automată a token-ului
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

// Interceptor pentru gestionarea răspunsurilor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirat sau invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Functions pentru autentificare
export const authAPI = {
  register: (userData) => api.post('/api/auth/register', userData),
  login: (credentials) => api.post('/api/auth/login', credentials),
  verify: () => api.get('/api/auth/verify'),
  getProfile: () => api.get('/api/auth/profile'),
  completeProfile: (profileData) => api.put('/api/auth/complete-profile', profileData),
  logout: () => api.post('/api/auth/logout')
};

// API Functions pentru utilizatori
export const usersAPI = {
  getStudents: () => api.get('/api/users/students'),
  getProfessors: () => api.get('/api/users/professors'),
  getMe: () => api.get('/api/users/me'),
  getStats: () => api.get('/api/users/stats')
};

// Helper pentru validarea email-ului
export const validateEmailDomain = (email) => {
  const studentDomains = [
    '@stud.ase.ro',
    '@student.ase.ro',
    '@student.upt.ro',
    '@student.utcluj.ro',
    '@stud.ubbcluj.ro',
    '@student.upb.ro'
  ];
  
  const professorDomains = [
    '@ase.ro',
    '@ie.ase.ro',
    '@profesor.ase.ro',
    '@upt.ro',
    '@utcluj.ro',
    '@ubbcluj.ro',
    '@upb.ro'
  ];
  
  const emailLower = email.toLowerCase();
  
  // Verifică dacă e student
  for (const domain of studentDomains) {
    if (emailLower.endsWith(domain)) {
      return { isValid: true, userType: 'student' };
    }
  }
  
  // Verifică dacă e profesor
  for (const domain of professorDomains) {
    if (emailLower.endsWith(domain)) {
      return { isValid: true, userType: 'profesor' };
    }
  }
  
  return { isValid: false, userType: null };
};

export default api;

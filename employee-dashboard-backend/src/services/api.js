import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const registerEmployee = (employeeData) => api.post('/register', employeeData);
export const login = (credentials) => api.post('/login', credentials);
export const getEmployeeDetails = () => api.get('/employee/details');
export const getAdminDetails = () => api.get('/admin/details');

export default api;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import LoginPage from './components/LoginPage';
import { EmployeeProvider } from './contexts/EmployeeContext';
import './App.css';

function App() {
  return (
    <EmployeeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        </Routes>
      </Router>
    </EmployeeProvider>
  );
}

export default App;
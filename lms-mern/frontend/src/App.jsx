import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layout/Navbar';
import './styles/index.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="flex">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
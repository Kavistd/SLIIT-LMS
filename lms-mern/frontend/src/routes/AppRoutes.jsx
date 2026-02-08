import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Courses from '../pages/courses/CoursesList';
import CourseDetails from '../pages/courses/CourseDetails';
import QuizPage from '../pages/quizzes/QuizPage';
import Community from '../pages/community/Community';
import Notifications from '../pages/notifications/Notifications';
import AdminPanel from '../pages/admin/AdminPanel';
import ManageDepartments from '../pages/admin/ManageDepartments';
import ManageModules from '../pages/admin/ManageModules';
import ManageUsers from '../pages/admin/ManageUsers';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      
      {/* Protected routes */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetails />} />
        <Route path="quizzes/:id" element={<QuizPage />} />
        <Route path="community" element={<Community />} />
        <Route path="notifications" element={<Notifications />} />
        
        {/* Admin routes */}
        <Route path="admin" element={<ProtectedRoute requiredRole="admin" />}>
          <Route index element={<AdminPanel />} />
          <Route path="departments" element={<ManageDepartments />} />
          <Route path="modules" element={<ManageModules />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;
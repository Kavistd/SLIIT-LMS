import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/courses', label: 'Courses', icon: '📚' },
    { path: '/community', label: 'Community', icon: '💬' },
    { path: '/notifications', label: 'Notifications', icon: '🔔' },
  ];

  const adminItems = [
    { path: '/admin', label: 'Admin Panel', icon: '⚙️' },
    { path: '/admin/departments', label: 'Departments', icon: '🏛️' },
    { path: '/admin/modules', label: 'Modules', icon: '📦' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">Navigation</h2>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          
          {user && user.role === 'admin' && (
            <>
              <div className="border-t border-gray-700 my-4"></div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Admin
              </h3>
              {adminItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    location.pathname.startsWith(item.path) ? 'bg-blue-600' : 'hover:bg-gray-700'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
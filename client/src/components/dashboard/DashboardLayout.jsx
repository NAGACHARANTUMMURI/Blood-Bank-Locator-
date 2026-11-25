import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Hospital,
  MapPin,
  Package,
  Users,
  Shield,
  AlertCircle,
  BarChart3,
  ClipboardList,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = ({ title, children, role }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getRoleIcon = (role) => {
    switch (role) {
      case 'hospital': return Hospital;
      case 'bloodbank': return Package;
      case 'donor': return Users;
      case 'admin': return Shield;
      default: return Home;
    }
  };

  const RoleIcon = getRoleIcon(role);

  const sidebarItems = [
    { name: 'Overview', href: `/dashboard/${role}`, icon: Home },
    { name: 'Requests', href: `/requests`, icon: ClipboardList },
    { name: 'Find Blood Banks', href: '/blood-banks', icon: MapPin },
    { name: 'Live Inventory', href: '/inventory', icon: Package },
  ];

  if (role === 'admin') {
    sidebarItems.push(
      { name: 'User Management', href: '/dashboard/admin/users', icon: Users },
      { name: 'Analytics', href: '/dashboard/admin/analytics', icon: BarChart3 },
      { name: 'Reports', href: '/dashboard/admin/reports', icon: AlertCircle }
    );
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 flex">
        <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset--y overflow-y-auto bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-3">
              <div className="space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        isActive
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
          <div className="border-t border-gray-200 pb-4">
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md flex items-center"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </aside>

        <div className="flex-1">
          <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
            <div className="flex justify-between items-center px-4 py-3 md:px-6">
              <div className="flex items-center">
                <RoleIcon className="h-6 w-6 text-primary-600 mr-2" />
                <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
              </div>
            </div>
          </div>

          <main className="flex-1 focus:outline-none p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
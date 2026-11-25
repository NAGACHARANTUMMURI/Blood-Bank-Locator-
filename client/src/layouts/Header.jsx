import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = ({ isActive }) => isActive ? 'text-primary-600 font-semibold' : 'text-gray-600 hover:text-primary-600';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary-600 fill-current" />
            <span className="text-xl font-bold text-primary-700">Blood Bank Locator</span>
          </Link>

          <nav className="hidden md:flex space-x-1">
            <NavLink to="/" className={isActive}>Home</NavLink>
            <NavLink to="/about" className={isActive}>About</NavLink>
            <NavLink to="/blood-banks" className={isActive}>Locate Banks</NavLink>
            <NavLink to="/inventory" className={isActive}>Inventory</NavLink>
            <NavLink to="/contact" className={isActive}>Contact</NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    to={`/dashboard/${user.role}`}
                    className="flex items-center space-x-1 text-gray-600 hover:text-primary-600"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              className={isActive}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={isActive}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/blood-banks"
              className={isActive}
              onClick={() => setMobileMenuOpen(false)}
            >
              Locate Banks
            </NavLink>
            <NavLink
              to="/inventory"
              className={isActive}
              onClick={() => setMobileMenuOpen(false)}
            >
              Inventory
            </NavLink>
            <NavLink
              to="/contact"
              className={isActive}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
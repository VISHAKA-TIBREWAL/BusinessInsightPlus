import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="text-primary-700 font-bold text-xl md:text-2xl">
                BusinessInsightsPlus+
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition hover:text-primary-600 ${
                location.pathname === '/' 
                  ? 'text-primary-600 font-medium' 
                  : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/stock-news" 
              className={`transition hover:text-primary-600 ${
                location.pathname === '/stock-news' 
                  ? 'text-primary-600 font-medium' 
                  : 'text-gray-700'
              }`}
            >
              Stock News
            </Link>
            {currentUser && (
              <Link 
                to="/dashboard" 
                className={`transition hover:text-primary-600 ${
                  location.pathname === '/dashboard' 
                    ? 'text-primary-600 font-medium' 
                    : 'text-gray-700'
                }`}
              >
                Dashboard
              </Link>
            )}
            
            {currentUser ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition"
                >
                  <span>Account</span>
                  <ChevronDown size={16} />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fade-in">
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LayoutDashboard size={16} className="mr-2" />
                      Dashboard
                    </Link>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <User size={16} className="mr-2" />
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition"
              >
                Sign In
              </Link>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/' 
                  ? 'bg-primary-100 text-primary-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/stock-news" 
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/stock-news' 
                  ? 'bg-primary-100 text-primary-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Stock News
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`block px-3 py-2 rounded-md ${
                    location.pathname === '/dashboard' 
                      ? 'bg-primary-100 text-primary-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className={`block px-3 py-2 rounded-md ${
                    location.pathname === '/profile' 
                      ? 'bg-primary-100 text-primary-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import { Link, useLocation } from 'react-router-dom';
import { FaBug, FaPlus, FaBars } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Close menu when resizing to desktop
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white shadow-lg fixed top-0 w-full z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 group transition-all duration-300"
        >
          <div className="relative transition-transform duration-300 group-hover:rotate-12">
            <FaBug className="text-2xl text-yellow-400" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-100 transition-all duration-300 group-hover:scale-105">
            <span className="hidden sm:inline">Bug Tracker </span>
            <span className="sm:hidden">BTP</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3 md:space-x-5">
          <Link 
            to="/" 
            className={`px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center ${
              location.pathname === '/' 
                ? 'bg-white/20 backdrop-blur-sm shadow-inner' 
                : 'hover:bg-white/10'
            }`}
          >
            <span>Bugs</span>
          </Link>

          <Link 
            to="/report" 
            className={`flex items-center space-x-1 font-medium py-2 px-4 rounded-xl transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 ${
              location.pathname === '/report' 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 ring-2 ring-white/50 shadow-amber-500/30' 
                : 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 shadow-yellow-500/30'
            }`}
          >
            <FaPlus className="mr-1" />
            <span>Report Bug</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-yellow-400 p-2 rounded-lg hover:bg-purple-800 transition-colors"
        >
          <FaBars className="text-xl" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-800 py-4 px-4 border-t border-purple-500 shadow-lg">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className={`px-3 py-2 rounded-lg transition-all duration-300 flex items-center ${
                location.pathname === '/' 
                  ? 'bg-white/20 backdrop-blur-sm shadow-inner' 
                  : 'hover:bg-white/10'
              }`}
            >
              <span>Bugs</span>
            </Link>

            <Link 
              to="/report" 
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center space-x-1 font-medium py-2 px-4 rounded-xl transition-all duration-300 shadow-lg ${
                location.pathname === '/report' 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 ring-2 ring-white/50 shadow-amber-500/30' 
                  : 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 shadow-yellow-500/30'
              }`}
            >
              <FaPlus className="mr-1" />
              <span>Report Bug</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
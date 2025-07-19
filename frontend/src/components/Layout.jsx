import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Icon from Lucide (or use Heroicons)

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClasses = ({ isActive }) =>
    isActive
      ? 'bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium'
      : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-white font-bold text-xl">HR Dashboard</span>

              {/* Desktop Menu */}
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-4">
                  <NavLink to="/" className={navLinkClasses}>Dashboard</NavLink>
                  <NavLink to="/bookmarks" className={navLinkClasses}>Bookmarks</NavLink>
                  <NavLink to="/analytics" className={navLinkClasses}>Analytics</NavLink>
                </div>
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-700 px-4 pb-4 space-y-1">
            <NavLink to="/" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>Dashboard</NavLink>
            <NavLink to="/bookmarks" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>Bookmarks</NavLink>
            <NavLink to="/analytics" className={navLinkClasses} onClick={() => setMobileMenuOpen(false)}>Analytics</NavLink>
          </div>
        )}
      </nav>

      {/* Main Content with Top Padding */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet /> {/* Child routes will render here */}
        </div>
      </main>
    </div>
  );
};

export default Layout;

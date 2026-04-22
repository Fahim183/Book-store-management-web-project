import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { getUser, logout } from "../utils/auth";
import '../App.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const userEmail = getUser();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 hover:text-amber-500 ${
      isActive ? "text-amber-500 font-semibold" : "text-gray-700 dark:text-gray-200"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-md text-base font-medium transition-colors duration-150 hover:bg-amber-50 dark:hover:bg-gray-700 hover:text-amber-600 dark:hover:text-amber-400 ${
      isActive
        ? "bg-amber-50 dark:bg-gray-700 text-amber-600 dark:text-amber-400 font-semibold"
        : "text-gray-700 dark:text-gray-200"
    }`;

  const links = [
    { to: "/", label: "Home" },
    { to: "/add-blog", label: "Add Book" },
    { to: "/all-blogs", label: "All Books" },
    { to: "/featured-blogs", label: "Featured" },
    { to: "/wishlist", label: "Wishlist" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-dark-card shadow-sm border-b border-gray-100 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>B</span>
            </div>
            <span
              className="text-lg font-bold text-gray-900 dark:text-white hidden sm:block"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              BookStore
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <NavLink key={to} to={to} className={navLinkClass} end={to === "/"}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">

            {/* Dark mode toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Auth buttons - desktop */}
            <div className="hidden sm:flex items-center gap-2">
              {userEmail ? (
                <>
                  <span className="text-xs text-gray-500 dark:text-gray-400 hidden md:block max-w-[120px] truncate">
                    {userEmail}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="px-4 py-2 text-sm font-medium rounded-lg border border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors">
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-sm">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-9 h-9 rounded-md flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-dark-card border-t border-gray-100 dark:border-dark-border shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={mobileNavLinkClass}
                end={to === "/"}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </NavLink>
            ))}

            {/* Mobile auth */}
            <div className="pt-3 mt-2 border-t border-gray-100 dark:border-dark-border flex gap-2">
              {userEmail ? (
                <>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block mb-2">{userEmail}</span>
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="w-full px-4 py-2 text-sm font-medium rounded-lg bg-gray-900 dark:bg-gray-700 text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex-1" onClick={() => setIsOpen(false)}>
                    <button className="w-full px-4 py-2 text-sm font-medium rounded-lg border border-amber-500 text-amber-600 dark:text-amber-400">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" className="flex-1" onClick={() => setIsOpen(false)}>
                    <button className="w-full px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 text-white">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

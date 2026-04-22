import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>B</span>
              </div>
              <span className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                BookStore
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              A community-driven platform for book lovers to discover, share, and manage their favorite reads.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navigate</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/all-blogs", label: "All Books" },
                { to: "/featured-blogs", label: "Featured" },
                { to: "/wishlist", label: "Wishlist" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-400 hover:text-amber-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/login", label: "Login" },
                { to: "/register", label: "Register" },
                { to: "/add-blog", label: "Add a Book" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-400 hover:text-amber-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} BookStore Management. All rights reserved.</span>
          <span>Built with React &amp; Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

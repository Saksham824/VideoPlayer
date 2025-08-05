import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Optional: Close menu on route change
  // useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <nav className="bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 backdrop-blur-md shadow-xl border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-3xl drop-shadow-glow">🎬</span>
            <span className="hidden sm:inline text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent group-hover:drop-shadow-glow transition">
              VideoHub
            </span>
          </Link>
          {/* Hamburger menu for mobile */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-gray-800/70 focus:outline-none transition-all"
              aria-label="Main menu"
              aria-expanded={menuOpen}
            >
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          {/* Links for desktop */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" label=" 🏠Home" active={location.pathname === "/"} />
            <NavLink to="/watch" label="🎥 Video Link" active={location.pathname === "/watch"} />
            <NavLink to="/upload" label="📤Upload" active={location.pathname === "/upload"} />
            <NavLink to="/youtube" label="▶️YouTube" active={location.pathname === "/youtube"} />
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 text-center pb-4 space-y-2 bg-black/90 backdrop-blur-md rounded-b-2xl shadow-lg border-t border-white/10">
          <NavLink to="/" label="🏠Home" active={location.pathname === "/"} onClick={() => setMenuOpen(false)} />
          <NavLink to="/watch" label="🎥Video Link" active={location.pathname === "/watch"} />
          <NavLink to="/upload" label="📤Upload" active={location.pathname === "/upload"} onClick={() => setMenuOpen(false)} />
          <NavLink to="/youtube" label="▶️YouTube" active={location.pathname === "/youtube"} onClick={() => setMenuOpen(false)} />
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, label, onClick, active }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-2 rounded-lg font-semibold transition-all duration-200
        ${
          active
            ? "bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-black shadow-md"
            : "text-white hover:bg-gray-800/70 hover:text-yellow-400"
        }
      `}
    >
      {label}
    </Link>
  );
}
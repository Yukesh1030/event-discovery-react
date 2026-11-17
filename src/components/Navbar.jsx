import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { getRegistrations } from "../utils/storage";

import brandLogo from "../assets/icons/Brand-logo.webp";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const list = getRegistrations();
      setRegistrationCount(list.length);
    };

    updateCount();
    window.addEventListener("stackly_registrations_updated", updateCount);

    return () => {
      window.removeEventListener("stackly_registrations_updated", updateCount);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
          <img src={brandLogo} alt="STACKLY Logo" />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Explore Events
          </NavLink>

          <NavLink
            to="/registrations"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span>My Registrations</span>
            {registrationCount > 0 && (
              <span className="navbar-badge">{registrationCount}</span>
            )}
          </NavLink>
        </nav>

        {/* Desktop CTA */}
        <NavLink to="/explore" className="navbar-cta">
          Discover Events
          <ArrowUpRight size={17} />
        </NavLink>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <NavLink to="/" end onClick={closeMenu}>
              Home
            </NavLink>

            <NavLink to="/explore" onClick={closeMenu}>
              Explore Events
            </NavLink>

            <NavLink to="/registrations" onClick={closeMenu} className="mobile-nav-item-with-badge">
              <span>My Registrations</span>
              {registrationCount > 0 && (
                <span className="navbar-badge">{registrationCount}</span>
              )}
            </NavLink>

            <NavLink
              to="/explore"
              className="mobile-nav-cta"
              onClick={closeMenu}
            >
              Discover Events
              <ArrowUpRight size={17} />
            </NavLink>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;

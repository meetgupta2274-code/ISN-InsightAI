import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    // Delay scroll so mobile menu close animation finishes first.
    // Without this, scrollIntoView fires while the DOM is still shifting,
    // causing the scroll to land in the wrong place on mobile browsers.
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 350);
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        id="navbar"
      >
        <div className="navbar__container">
          {/* Logo */}
          <a href="#hero" className="navbar__logo" onClick={e => handleNavClick(e, '#hero')}>
            <div className="navbar__logo-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" fill="url(#logoGrad)" opacity="0.9"/>
                <path d="M10 16 L16 10 L22 16 L16 22 Z" fill="white" opacity="0.9"/>
                <circle cx="16" cy="16" r="3" fill="white"/>
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stopColor="#6366f1"/>
                    <stop offset="100%" stopColor="#a855f7"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="navbar__logo-text">
              Insight<span className="gradient-text">AI</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="navbar__links" id="nav-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="navbar__link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="navbar__actions">
            <ThemeToggle />
            <motion.a
              href="#contact"
              className="btn btn-primary navbar__cta"
              id="navbar-cta-btn"
              onClick={(e) => handleNavClick(e, '#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started
            </motion.a>
            {/* Hamburger */}
            <button
              className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              id="hamburger-btn"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            id="mobile-menu"
          >
            <ul>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="navbar__mobile-link"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="btn btn-primary w-full"
                  onClick={(e) => handleNavClick(e, '#contact')}
                >
                  Get Started Free
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

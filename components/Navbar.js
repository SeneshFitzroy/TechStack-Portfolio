import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from './AdvancedAnimations';

export default function Navbar({ darkMode, setDarkMode, scrolled }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', href: '#home', icon: '🏠' },
    { name: 'About', href: '#about', icon: '👨‍💻' },
    { name: 'Skills', href: '#skills', icon: '⚡' },
    { name: 'Projects', href: '#projects', icon: '🚀' },
    { name: 'Certifications', href: '#certifications', icon: '🏆' },
    { name: 'Contact', href: '#contact', icon: '📧' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`navbar-3d ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="nav-container">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="nav-logo"
        >
          <span className="logo-text holographic">SF</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-only">
          {navItems.map((item, index) => (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => scrollToSection(item.href)}
              className={`nav-link ${activeSection === item.href.substring(1) ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Theme Toggle */}
        <MagneticButton
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle"
        >
          <motion.div
            animate={{ rotate: darkMode ? 180 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {darkMode ? '☀️' : '🌙'}
          </motion.div>
        </MagneticButton>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mobile-menu-btn mobile-only"
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 45 : 0 }}
            className="hamburger-line"
          />
          <motion.div
            animate={{ opacity: isMenuOpen ? 0 : 1 }}
            className="hamburger-line"
          />
          <motion.div
            animate={{ rotate: isMenuOpen ? -45 : 0 }}
            className="hamburger-line"
          />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className={`mobile-nav-link ${activeSection === item.href.substring(1) ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .navbar-3d {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.3s ease;
          padding: 1rem 0;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
        }

        .nav-logo {
          font-size: 2rem;
          font-weight: bold;
          cursor: pointer;
        }

        .logo-text {
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .nav-link:hover::before,
        .nav-link.active::before {
          transform: translateX(0);
        }

        .nav-link:hover {
          color: #3b82f6;
          transform: translateY(-2px);
        }

        .nav-link.active {
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
        }

        .nav-icon {
          font-size: 1.2rem;
        }

        .nav-text {
          position: relative;
          z-index: 1;
        }

        .theme-toggle {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          background: rgba(59, 130, 246, 0.1);
        }

        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }

        .hamburger-line {
          width: 25px;
          height: 3px;
          background: currentColor;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .mobile-menu {
          display: none;
          flex-direction: column;
          background: inherit;
          backdrop-filter: inherit;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-nav-link {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 2rem;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }

          .mobile-only {
            display: flex;
          }

          .mobile-menu {
            display: flex;
          }

          .nav-container {
            padding: 0 1rem;
          }
        }

        .dark-mode .nav-link:hover,
        .dark-mode .nav-link.active {
          color: #60a5fa;
        }

        .dark-mode .theme-toggle:hover {
          background: rgba(96, 165, 250, 0.1);
        }

        .dark-mode .mobile-nav-link:hover,
        .dark-mode .mobile-nav-link.active {
          color: #60a5fa;
          background: rgba(96, 165, 250, 0.1);
        }
      `}</style>
    </motion.nav>
  );
}

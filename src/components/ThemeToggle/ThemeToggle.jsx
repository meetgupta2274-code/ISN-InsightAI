import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      id="theme-toggle-btn"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="toggle-track">
        <motion.div
          className="toggle-thumb"
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{ x: isDark ? 2 : 26 }}
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={theme}
            className="toggle-icon"
            initial={{ opacity: 0, rotate: -30, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? '🌙' : '☀️'}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;

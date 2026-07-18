import { motion } from 'framer-motion';
import './Footer.css';

const footerLinks = {
  Product: ['Features', 'Dashboard', 'Pricing', 'Changelog', 'Roadmap'],
  Solutions: ['Retail & E-commerce', 'SaaS Companies', 'Financial Services', 'Healthcare', 'Real Estate'],
  Resources: ['Documentation', 'API Reference', 'Blog', 'Case Studies', 'Webinars'],
  Company: ['About Us', 'Careers', 'Partners', 'Press Kit', 'Contact'],
};

const socialLinks = [
  { name: 'LinkedIn', icon: '💼', href: '#' },
  { name: 'Twitter', icon: '🐦', href: '#' },
  { name: 'GitHub', icon: '⚡', href: '#' },
  { name: 'YouTube', icon: '▶️', href: '#' },
];

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer__gradient-top" />

      <div className="container">
        {/* Top Row */}
        <div className="footer__main">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
                  <circle cx="16" cy="16" r="14" fill="url(#footerLogoGrad)" opacity="0.9"/>
                  <path d="M10 16 L16 10 L22 16 L16 22 Z" fill="white" opacity="0.9"/>
                  <circle cx="16" cy="16" r="3" fill="white"/>
                  <defs>
                    <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="32" y2="32">
                      <stop offset="0%" stopColor="#6366f1"/>
                      <stop offset="100%" stopColor="#a855f7"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="footer__logo-text">
                Insight<span className="gradient-text">AI</span>
              </span>
            </div>
            <p className="footer__brand-desc">
              Transforming business data into actionable intelligence. Powered by cutting-edge AI, built for every business.
            </p>

            {/* Social Links */}
            <div className="footer__socials">
              {socialLinks.map(s => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  className="footer__social-btn"
                  aria-label={s.name}
                  id={`social-${s.name.toLowerCase()}`}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={s.name}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="footer__newsletter">
              <p className="footer__newsletter-label">Get AI insights in your inbox</p>
              <div className="footer__newsletter-form">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="footer__newsletter-input"
                  id="newsletter-email-input"
                />
                <motion.button
                  className="btn btn-primary footer__newsletter-btn"
                  id="newsletter-subscribe-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="footer__links-grid">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="footer__links-col">
                <h4 className="footer__links-title">{category}</h4>
                <ul className="footer__links-list">
                  {links.map(link => (
                    <li key={link}>
                      <a href="#" className="footer__link">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__bottom-left">
            <p>© {new Date().getFullYear()} InsightAI. All rights reserved.</p>
            <div className="footer__legal-links">
              <a href="#">Privacy Policy</a>
              <span>·</span>
              <a href="#">Terms of Service</a>
              <span>·</span>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
          <div className="footer__bottom-right">
            <span>Built with</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ❤️
            </motion.span>
            <span>using AI-assisted development</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Priya Mehta',
    role: 'CEO',
    company: 'RetailNext India',
    avatar: 'PM',
    color: '#6366f1',
    quote: 'InsightAI completely transformed how we make business decisions. We went from spending 3 weeks on monthly reports to getting them instantly. Our Q3 revenue grew 34% following the AI\'s recommendations.',
    rating: 5,
  },
  {
    name: 'Rahul Sharma',
    role: 'Head of Sales',
    company: 'TechVenture Solutions',
    avatar: 'RS',
    color: '#8b5cf6',
    quote: 'The sales forecasting accuracy is incredible — we\'ve hit within 2% of every prediction for 6 months straight. My team now plans inventory and staffing months in advance with full confidence.',
    rating: 5,
  },
  {
    name: 'Ananya Krishnan',
    role: 'Co-Founder',
    company: 'GrowthPilot Startup',
    avatar: 'AK',
    color: '#a855f7',
    quote: 'As a startup, we can\'t afford bad decisions. InsightAI showed us which customer segments were most profitable and which products to double down on. It paid for itself within the first month.',
    rating: 5,
  },
  {
    name: 'Vikram Nair',
    role: 'Director of Operations',
    company: 'Meridian Enterprises',
    avatar: 'VN',
    color: '#ec4899',
    quote: 'We were skeptical about AI tools at first, but InsightAI\'s onboarding was seamless. Within 2 weeks we had deeper business insights than we\'d accumulated in 5 years of manual analysis.',
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[current];

  return (
    <section className="section testimonials" id="testimonials">
      <div className="glow-orb glow-orb-violet" style={{ width: 500, height: 500, bottom: '-10%', left: '-10%', opacity: 0.15 }} />

      <div className="container">
        <div className="section-header">
          <div className="badge">💬 Testimonials</div>
          <h2>
            Real Businesses,{' '}
            <span className="gradient-text">Real Results</span>
          </h2>
          <p>
            Join thousands of business leaders who trust InsightAI to drive their growth strategy.
          </p>
        </div>

        <div className="testimonials__layout">
          {/* Main Card */}
          <div className="testimonials__main">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="testimonial-card glass"
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.97 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                id="testimonial-main-card"
              >
                {/* Stars */}
                <div className="testimonial-stars">
                  {'★'.repeat(t.rating)}
                </div>

                {/* Quote */}
                <blockquote className="testimonial-quote">
                  <span className="quote-mark">"</span>
                  {t.quote}
                </blockquote>

                {/* Author */}
                <div className="testimonial-author">
                  <motion.div
                    className="testimonial-avatar"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}
                    animate={{ boxShadow: [`0 0 0 0 ${t.color}44`, `0 0 0 8px ${t.color}00`] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {t.avatar}
                  </motion.div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role} · {t.company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dot Navigation */}
            <div className="testimonial-dots" id="testimonial-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonial-dot ${i === current ? 'active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  id={`dot-${i}`}
                />
              ))}
            </div>
          </div>

          {/* Sidebar - All testimonials preview */}
          <div className="testimonials__sidebar">
            {testimonials.map((item, i) => (
              <motion.button
                key={item.name}
                className={`testimonial-thumb ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
                id={`testimonial-thumb-${i}`}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
              >
                <div
                  className="testimonial-thumb__avatar"
                  style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}88)` }}
                >
                  {item.avatar}
                </div>
                <div className="testimonial-thumb__info">
                  <span className="testimonial-thumb__name">{item.name}</span>
                  <span className="testimonial-thumb__company">{item.company}</span>
                </div>
                {i === current && (
                  <motion.div
                    className="testimonial-thumb__indicator"
                    layoutId="activeIndicator"
                    style={{ background: item.color }}
                  />
                )}
              </motion.button>
            ))}

            {/* Rating Summary */}
            <div className="testimonials__rating-box glass-card">
              <div className="rating-score gradient-text">4.9/5</div>
              <div className="rating-stars">★★★★★</div>
              <div className="rating-count">Based on 2,400+ reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

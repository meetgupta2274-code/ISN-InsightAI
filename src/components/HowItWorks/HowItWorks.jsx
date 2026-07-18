import { useRef } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './HowItWorks.css';

gsap.registerPlugin(ScrollTrigger);

// Inline Lottie JSON animations (data upload, AI brain, results)
// Using simple geometric animations as fallbacks when no JSON is available
const uploadAnimation = {
  v: '5.9.0', fr: 30, ip: 0, op: 90, w: 200, h: 200,
  assets: [],
  layers: [{
    ddd: 0, ind: 1, ty: 4, nm: 'Upload',
    ks: {
      o: { a: 0, k: 100 }, r: { a: 0, k: 0 },
      p: { a: 0, k: [100, 100, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 1, k: [{ i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] }, t: 0, s: [100, 100, 100] }, { t: 45, s: [110, 110, 100] }, { t: 90, s: [100, 100, 100] }] },
    },
    ao: 0, shapes: [], ip: 0, op: 90, st: 0,
  }],
};

const steps = [
  {
    number: '01',
    icon: '📤',
    title: 'Upload Your Data',
    description: 'Connect your CRM, upload CSV/Excel files, or use our API. We support 50+ data sources. Setup takes under 5 minutes.',
    color: '#6366f1',
    highlights: ['CSV & Excel', 'CRM Connect', 'API Integration', '50+ Sources'],
  },
  {
    number: '02',
    icon: '🤖',
    title: 'AI Analyzes Everything',
    description: 'Our proprietary AI models process your data, identify patterns, anomalies, and trends — analyzing what would take your team months in seconds.',
    color: '#8b5cf6',
    highlights: ['Pattern Detection', 'Anomaly Alerts', 'Trend Analysis', 'Real-time Processing'],
  },
  {
    number: '03',
    icon: '🎯',
    title: 'Get Actionable Results',
    description: 'Receive comprehensive reports, accurate predictions, and specific growth recommendations. Export, share, and implement immediately.',
    color: '#a855f7',
    highlights: ['Auto Reports', 'Sales Forecasts', 'Growth Plans', 'Team Sharing'],
  },
];

const HowItWorks = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Animate the connecting line
    gsap.fromTo('.hiw__line-progress',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.hiw__steps',
          start: 'top 60%',
          once: true,
        },
      }
    );

    // Stagger step cards
    gsap.fromTo('.hiw__step',
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hiw__steps',
          start: 'top 75%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section className="section hiw" id="how-it-works" ref={sectionRef}>
      <div className="glow-orb glow-orb-violet" style={{ width: 600, height: 600, top: '20%', left: '-15%', opacity: 0.15 }} />

      <div className="container">
        <div className="section-header">
          <div className="badge">⚡ Simple Process</div>
          <h2>
            From Raw Data to{' '}
            <span className="gradient-text">Business Insights</span>{' '}
            in 3 Steps
          </h2>
          <p>
            No technical expertise needed. InsightAI is designed for business owners,
            not data scientists. Get started in minutes, not months.
          </p>
        </div>

        <div className="hiw__steps" id="how-it-works-steps">
          {/* Connecting line */}
          <div className="hiw__line">
            <div className="hiw__line-track" />
            <div className="hiw__line-progress" />
          </div>

          {steps.map((step, i) => (
            <div className="hiw__step" key={step.number} id={`step-${i + 1}`}>
              {/* Step Number & Icon */}
              <div className="hiw__step-top">
                <motion.div
                  className="hiw__step-icon"
                  style={{ background: `${step.color}18`, border: `2px solid ${step.color}44` }}
                  whileHover={{ scale: 1.1, boxShadow: `0 0 30px ${step.color}44` }}
                  animate={{
                    boxShadow: [`0 0 0px ${step.color}00`, `0 0 25px ${step.color}44`, `0 0 0px ${step.color}00`],
                  }}
                  transition={{ repeat: Infinity, duration: 3 + i, ease: 'easeInOut' }}
                >
                  <span className="hiw__step-emoji">{step.icon}</span>
                  <span className="hiw__step-number" style={{ color: step.color }}>
                    {step.number}
                  </span>
                </motion.div>
              </div>

              {/* Content Card */}
              <motion.div
                className="hiw__step-card glass-card"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="hiw__step-title">{step.title}</h3>
                <p className="hiw__step-desc">{step.description}</p>
                <div className="hiw__step-highlights">
                  {step.highlights.map(h => (
                    <span
                      key={h}
                      className="hiw__highlight-tag"
                      style={{ background: `${step.color}12`, color: step.color, border: `1px solid ${step.color}25` }}
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="hiw__cta-row"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="hiw__cta-content">
            <div className="hiw__animated-bar">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="hiw__bar-item"
                  animate={{ scaleY: [0.3, 1, 0.3] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    delay: i * 0.06,
                    ease: 'easeInOut',
                  }}
                  style={{ background: `hsl(${240 + i * 6}, 80%, 65%)` }}
                />
              ))}
            </div>
            <div>
              <p className="hiw__cta-text">
                <strong>Join 10,000+ businesses</strong> already using InsightAI to make smarter decisions
              </p>
            </div>
          </div>
          <motion.a
            href="#contact"
            className="btn btn-primary"
            id="hiw-cta-btn"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Start Free Trial →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

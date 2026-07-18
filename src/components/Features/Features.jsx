import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Features.css';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: '📊',
    title: 'Smart Data Upload',
    description: 'Drag & drop CSV, Excel files or directly connect your CRM. InsightAI handles any format, cleaning and structuring your data automatically.',
    color: '#6366f1',
    delay: 0,
  },
  {
    icon: '🔍',
    title: 'Trend Discovery',
    description: 'Our AI scans millions of data points to surface hidden patterns, seasonal trends, and correlations your team would take months to find manually.',
    color: '#8b5cf6',
    delay: 0.1,
  },
  {
    icon: '📈',
    title: 'Sales Predictions',
    description: 'Machine learning models trained on industry data give you sales forecasts with up to 98% accuracy — weeks or months into the future.',
    color: '#a855f7',
    delay: 0.2,
  },
  {
    icon: '📋',
    title: 'Auto Reports',
    description: 'Beautiful, branded PDF reports generated instantly. Share with stakeholders, investors, or your team with one click.',
    color: '#ec4899',
    delay: 0.3,
  },
  {
    icon: '💡',
    title: 'Growth Suggestions',
    description: 'InsightAI doesn\'t just show data — it tells you exactly what to do. Get prioritized, actionable recommendations tailored to your business.',
    color: '#f59e0b',
    delay: 0.4,
  },
  {
    icon: '🔒',
    title: 'Enterprise Security',
    description: 'SOC 2 Type II compliant with end-to-end encryption. Your business data stays private, protected, and fully under your control.',
    color: '#10b981',
    delay: 0.5,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Features = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.features__header',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: '.features__header', start: 'top 85%', once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section className="section features" id="features" ref={sectionRef}>
      {/* Background decoration */}
      <div className="glow-orb glow-orb-purple" style={{ width: 500, height: 500, top: '10%', right: '-10%', opacity: 0.2 }} />

      <div className="container">
        <div className="section-header features__header">
          <div className="badge">✨ Core Features</div>
          <h2>
            Everything You Need to{' '}
            <span className="gradient-text">Dominate Your Market</span>
          </h2>
          <p>
            InsightAI combines cutting-edge machine learning with intuitive design
            to give every business, from startups to enterprises, a competitive AI advantage.
          </p>
        </div>

        <motion.div
          className="features__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="feature-card glass-card"
              variants={cardVariants}
              whileHover={{
                y: -8,
                boxShadow: `0 20px 60px ${feature.color}22`,
                borderColor: `${feature.color}44`,
                transition: { duration: 0.2 },
              }}
              id={`feature-card-${i}`}
            >
              <div
                className="feature-card__icon"
                style={{ background: `${feature.color}18`, border: `1px solid ${feature.color}33` }}
              >
                <motion.span
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4 + i * 0.5, ease: 'easeInOut' }}
                >
                  {feature.icon}
                </motion.span>
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__desc">{feature.description}</p>
              <div className="feature-card__arrow" style={{ color: feature.color }}>
                Learn more →
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

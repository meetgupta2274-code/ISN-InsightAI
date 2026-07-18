import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Pricing.css';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Starter',
    price: '₹2,999',
    period: '/month',
    description: 'Perfect for small businesses getting started with AI analytics.',
    color: '#6366f1',
    popular: false,
    features: [
      '1 Data Source',
      'Up to 10,000 records',
      'Monthly AI Reports',
      'Basic Trend Analysis',
      'Email Support',
      '3 User Seats',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    price: '₹7,999',
    period: '/month',
    description: 'The most popular choice for growing businesses that need real insights.',
    color: '#8b5cf6',
    popular: true,
    features: [
      '10 Data Sources',
      'Up to 500,000 records',
      'Weekly AI Reports',
      'Advanced Trend Analysis',
      'Sales Forecasting',
      'Priority Support',
      '15 User Seats',
      'Custom Dashboards',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Tailored solutions for large organizations with complex data needs.',
    color: '#a855f7',
    popular: false,
    features: [
      'Unlimited Data Sources',
      'Unlimited records',
      'Real-time AI Reports',
      'Custom AI Models',
      'Dedicated Success Manager',
      'SLA Guarantee (99.9%)',
      'Unlimited User Seats',
      'White-label Option',
      'On-premise Deployment',
    ],
    cta: 'Contact Sales',
  },
];

const Pricing = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo('.pricing-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.pricing__grid', start: 'top 80%', once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section className="section pricing" id="pricing" ref={sectionRef}>
      <div className="glow-orb glow-orb-purple" style={{ width: 600, height: 600, top: '0', left: '50%', transform: 'translateX(-50%)', opacity: 0.1 }} />

      <div className="container">
        <div className="section-header">
          <div className="badge">💰 Pricing</div>
          <h2>
            Simple, Transparent{' '}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p>
            No hidden fees. No surprises. Start free, scale as you grow.
            Every plan includes a 14-day free trial.
          </p>
        </div>

        <div className="pricing__grid" id="pricing-grid">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`pricing-card glass-card ${plan.popular ? 'popular' : ''}`}
              id={`pricing-card-${plan.name.toLowerCase()}`}
              whileHover={{ y: plan.popular ? -4 : -8, transition: { duration: 0.2 } }}
            >
              {plan.popular && (
                <motion.div
                  className="popular-badge"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  ⭐ Most Popular
                </motion.div>
              )}

              <div className="pricing-card__top">
                <div
                  className="pricing-card__icon"
                  style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}33` }}
                >
                  {i === 0 ? '🚀' : i === 1 ? '⚡' : '🏢'}
                </div>
                <h3 className="pricing-card__name">{plan.name}</h3>
                <p className="pricing-card__desc">{plan.description}</p>
              </div>

              <div className="pricing-card__price">
                <span className="price-value">{plan.price}</span>
                <span className="price-period">{plan.period}</span>
              </div>

              <ul className="pricing-card__features">
                {plan.features.map(f => (
                  <li key={f} className="pricing-feature">
                    <span className="feature-check" style={{ color: plan.color }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <motion.a
                href="#contact"
                className={`btn pricing-card__cta ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                id={`pricing-cta-${plan.name.toLowerCase()}`}
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={plan.popular ? {} : { borderColor: `${plan.color}44`, color: plan.color }}
              >
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Row */}
        <motion.div
          className="pricing__guarantee"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <span>🔒 14-day free trial</span>
          <span>•</span>
          <span>🚫 No credit card required</span>
          <span>•</span>
          <span>↩️ Cancel anytime</span>
          <span>•</span>
          <span>🛡️ SOC 2 Compliant</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Dashboard.css';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { label: 'Revenue This Month', value: '₹24,81,500', change: '+18.2%', positive: true },
  { label: 'Sales Forecast (Q3)', value: '₹1.2 Cr', change: '+32%', positive: true },
  { label: 'Churn Risk', value: '3.4%', change: '-1.2%', positive: true },
  { label: 'Top Product', value: 'Enterprise Pro', change: '42% of sales', positive: true },
];

const chartBars = [45, 62, 38, 78, 55, 89, 67, 94, 71, 83, 76, 98];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Dashboard = () => {
  const sectionRef = useRef(null);
  const mockupRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useGSAP(() => {
    gsap.fromTo('.dashboard__text',
      { opacity: 0, x: -50 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.dashboard__text', start: 'top 80%', once: true },
      }
    );
    // Animate chart bars
    gsap.fromTo('.chart-bar',
      { scaleY: 0 },
      {
        scaleY: 1, duration: 0.6, stagger: 0.05, ease: 'power2.out',
        scrollTrigger: { trigger: '.dash-chart', start: 'top 80%', once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section className="section dashboard" id="dashboard" ref={sectionRef}>
      <div className="glow-orb glow-orb-purple" style={{ width: 700, height: 700, top: '-10%', right: '-15%', opacity: 0.12 }} />

      <div className="container dashboard__inner">
        {/* Text Content */}
        <div className="dashboard__text">
          <div className="badge">📊 Live Dashboard</div>
          <h2>
            Your Business Intelligence,{' '}
            <span className="gradient-text">Visualized Beautifully</span>
          </h2>
          <p>
            InsightAI's intuitive dashboard gives you a real-time birds-eye view of your entire
            business — from current sales performance to AI-powered future projections.
          </p>

          <ul className="dashboard__features-list">
            {[
              'Real-time sales performance tracking',
              'AI-generated revenue forecasts',
              'Customer behavior & churn analysis',
              'Product performance breakdowns',
              'Exportable reports in one click',
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="dashboard__feature-item"
              >
                <span className="dashboard__check">✓</span>
                {item}
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="#contact"
            className="btn btn-primary"
            id="dashboard-cta-btn"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            View Live Demo →
          </motion.a>
        </div>

        {/* Dashboard Mockup */}
        <motion.div
          className="dashboard__mockup"
          ref={mockupRef}
          style={{ y, opacity }}
        >
          {/* Floating metric cards */}
          <div className="dash-window glass">
            <div className="dash-window__header">
              <div className="dash-dots">
                <span style={{ background: '#ff5f57' }} />
                <span style={{ background: '#ffbd2e' }} />
                <span style={{ background: '#28c840' }} />
              </div>
              <span className="dash-title">InsightAI Dashboard</span>
              <div className="dash-status">
                <span className="dash-live" />
                Live
              </div>
            </div>

            <div className="dash-body">
              {/* Metric Cards */}
              <div className="dash-metrics">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    className="dash-metric glass-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    animate={{ y: [0, -4, 0] }}
                    style={{ animationDuration: `${3 + i * 0.5}s`, animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite' }}
                  >
                    <span className="dash-metric__label">{m.label}</span>
                    <span className="dash-metric__value">{m.value}</span>
                    <span className={`dash-metric__change ${m.positive ? 'positive' : 'negative'}`}>
                      {m.positive ? '↑' : '↓'} {m.change}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Chart */}
              <div className="dash-chart glass-card">
                <div className="dash-chart__header">
                  <span className="dash-chart__title">Revenue Trend</span>
                  <span className="dash-chart__subtitle gradient-text">AI Forecast ▲</span>
                </div>
                <div className="dash-chart__bars">
                  {chartBars.map((h, i) => (
                    <div key={i} className="chart-bar-wrapper">
                      <motion.div
                        className={`chart-bar ${i >= 9 ? 'forecast' : ''}`}
                        style={{
                          height: `${h}%`,
                          background: i >= 9
                            ? 'linear-gradient(to top, rgba(99,102,241,0.3), rgba(168,85,247,0.3))'
                            : 'linear-gradient(to top, #6366f1, #a855f7)',
                          transformOrigin: 'bottom',
                          border: i >= 9 ? '1px dashed rgba(99,102,241,0.5)' : 'none',
                        }}
                      />
                      <span className="chart-bar-label">{months[i]}</span>
                    </div>
                  ))}
                </div>
                <div className="dash-chart__legend">
                  <span><span style={{ background: '#6366f1' }} className="legend-dot" /> Actual</span>
                  <span><span style={{ background: 'rgba(99,102,241,0.3)', border: '1px dashed #6366f1' }} className="legend-dot" /> AI Forecast</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;

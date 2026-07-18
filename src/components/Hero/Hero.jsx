import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ParticleField from './ParticleField';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 10000, suffix: '+', label: 'Businesses Powered' },
  { value: 98, suffix: '%', label: 'Prediction Accuracy' },
  { value: 50, suffix: 'M+', label: 'AI Predictions Made' },
  { value: 5, suffix: 'min', label: 'Avg. Report Time' },
];

const Hero = () => {
  const heroRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const [activeVideo, setActiveVideo] = useState(1);
  const counterRefs = useRef([]);

  // Seamless video switching
  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    const handleV1End = () => {
      setActiveVideo(2);
      v2.currentTime = 0;
      v2.play().catch(() => {});
    };
    const handleV2End = () => {
      setActiveVideo(1);
      v1.currentTime = 0;
      v1.play().catch(() => {});
    };

    v1.addEventListener('ended', handleV1End);
    v2.addEventListener('ended', handleV2End);
    v1.play().catch(() => {});

    return () => {
      v1.removeEventListener('ended', handleV1End);
      v2.removeEventListener('ended', handleV2End);
    };
  }, []);

  // GSAP animations
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('.hero__badge', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .fromTo('.hero__title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .fromTo('.hero__subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .fromTo('.hero__ctas', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo('.hero__stats', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2');

    // Counter animations
    counterRefs.current.forEach((el, i) => {
      if (!el) return;
      const stat = stats[i];
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.value,
        duration: 2.5,
        delay: 1.2 + i * 0.1,
        ease: 'power2.out',
        onUpdate: () => {
          if (el) el.textContent = Math.floor(obj.val).toLocaleString() + stat.suffix;
        },
      });
    });
  }, { scope: heroRef });

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* Video Backgrounds */}
      <div className="hero__video-container">
        <video
          ref={video1Ref}
          className={`hero__video ${activeVideo === 1 ? 'active' : ''}`}
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/hero-bg-1.mp4" type="video/mp4" />
        </video>
        <video
          ref={video2Ref}
          className={`hero__video ${activeVideo === 2 ? 'active' : ''}`}
          muted
          playsInline
          preload="auto"
        >
          <source src="/videos/hero-bg-2.mp4" type="video/mp4" />
        </video>
        <div className="hero__video-overlay" />
      </div>

      {/* Three.js Particles */}
      <ParticleField />

      {/* Glow Orbs */}
      <div className="hero__orb hero__orb--left glow-orb glow-orb-purple" />
      <div className="hero__orb hero__orb--right glow-orb glow-orb-violet" />

      {/* Content */}
      <div className="container hero__content">
        <div className="hero__badge badge" style={{ opacity: 0 }}>
          <span>🚀</span>
          <span>AI-Powered Business Intelligence Platform</span>
        </div>

        <h1 className="hero__title" style={{ opacity: 0 }}>
          Transform Your Sales Data Into{' '}
          <span className="gradient-text">Actionable Intelligence</span>
        </h1>

        <p className="hero__subtitle" style={{ opacity: 0 }}>
          Upload your data. InsightAI finds hidden trends, predicts future sales,
          generates beautiful reports, and suggests exactly how to grow your business —
          all powered by cutting-edge AI.
        </p>

        <div className="hero__ctas" style={{ opacity: 0 }}>
          <motion.a
            href="#contact"
            className="btn btn-primary hero__btn-primary"
            id="hero-cta-primary"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99,102,241,0.6)' }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started Free
            <span className="btn-arrow">→</span>
          </motion.a>
          <motion.a
            href="#how-it-works"
            className="btn btn-outline hero__btn-secondary"
            id="hero-cta-demo"
            onClick={e => { e.preventDefault(); document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="play-icon">▶</span>
            See How It Works
          </motion.a>
        </div>

        {/* Stats Row */}
        <div className="hero__stats" style={{ opacity: 0 }}>
          {stats.map((stat, i) => (
            <div className="hero__stat" key={stat.label}>
              <span
                className="hero__stat-value gradient-text"
                ref={el => counterRefs.current[i] = el}
              >
                0{stat.suffix}
              </span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="hero__scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      >
        <span>Scroll to explore</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 40,
      x = 0,
      duration = 0.8,
      delay = 0,
      stagger = 0,
      trigger = el,
      start = 'top 85%',
    } = options;

    const targets = stagger ? el.querySelectorAll('[data-animate]') : el;

    const tl = gsap.fromTo(
      targets,
      { opacity: 0, y, x },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger,
          start,
          once: true,
        },
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === trigger) st.kill();
      });
    };
  }, []);

  return ref;
};

export const useCounter = (end, duration = 2, start = 'top 85%') => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    const tl = gsap.to(obj, {
      val: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
      onUpdate: () => {
        el.textContent = Math.floor(obj.val).toLocaleString();
      },
    });

    return () => tl.kill();
  }, [end, duration]);

  return ref;
};

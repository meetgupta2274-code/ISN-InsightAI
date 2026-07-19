import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Contact.css';

// Fix Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker
const customIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div class="marker-pin">
    <svg viewBox="0 0 32 32" width="36" height="36">
      <circle cx="16" cy="12" r="10" fill="url(#markerGrad)" />
      <path d="M16 38 L8 20 Q16 28 24 20 Z" fill="url(#markerGrad)" />
      <circle cx="16" cy="12" r="4" fill="white" opacity="0.9"/>
      <defs>
        <linearGradient id="markerGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#6366f1"/>
          <stop offset="100%" stop-color="#a855f7"/>
        </linearGradient>
      </defs>
    </svg>
  </div>`,
  iconSize: [36, 48],
  iconAnchor: [18, 48],
  popupAnchor: [0, -48],
});

// InsightAI HQ - Nariman Point, Mumbai (same area as iSN Business Solutions)
const OFFICE_LOCATION = [18.9220, 72.8347];

const Contact = () => {
  const formRef = useRef(null);
  const [formState, setFormState] = useState({ user_name: '', user_email: '', company: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = e => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
      );
      setStatus('success');
      setFormState({ user_name: '', user_email: '', company: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  const inputVariants = {
    focused: { scale: 1.01, borderColor: 'var(--accent-primary)' },
    unfocused: { scale: 1, borderColor: 'var(--glass-border)' },
  };

  return (
    <section className="section contact" id="contact">
      <div className="glow-orb glow-orb-purple" style={{ width: 500, height: 500, top: '10%', right: '-10%', opacity: 0.15 }} />

      <div className="container">
        <div className="section-header">
          <div className="badge">📧 Get In Touch</div>
          <h2>
            Start Your{' '}
            <span className="gradient-text">AI Journey Today</span>
          </h2>
          <p>
            Ready to transform your business with AI? Let's talk. Our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="contact__layout">
          {/* Form */}
          <motion.div
            className="contact__form-wrapper glass-card"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact__form-title">Send us a message</h3>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  className="contact__success"
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="success-icon">✅</div>
                  <h4>Message Sent Successfully!</h4>
                  <p>Thank you for reaching out. Our team will contact you within 24 hours.</p>
                  <motion.button
                    className="btn btn-outline"
                    onClick={() => setStatus('idle')}
                    whileHover={{ scale: 1.03 }}
                    id="send-another-btn"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  className="contact__form"
                  onSubmit={handleSubmit}
                  id="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="form-row">
                    <div className="form-field">
                      <motion.div
                        className={`form-input-wrapper ${focusedField === 'name' ? 'focused' : ''}`}
                      >
                        <input
                          type="text"
                          name="user_name"
                          id="input-name"
                          placeholder="Your Name *"
                          value={formState.user_name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="form-input"
                        />
                        <span className="form-icon">👤</span>
                      </motion.div>
                    </div>
                    <div className="form-field">
                      <div className={`form-input-wrapper ${focusedField === 'email' ? 'focused' : ''}`}>
                        <input
                          type="email"
                          name="user_email"
                          id="input-email"
                          placeholder="Email Address *"
                          value={formState.user_email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="form-input"
                        />
                        <span className="form-icon">📧</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-field">
                    <div className={`form-input-wrapper ${focusedField === 'company' ? 'focused' : ''}`}>
                      <input
                        type="text"
                        name="company"
                        id="input-company"
                        placeholder="Company Name"
                        value={formState.company}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('company')}
                        onBlur={() => setFocusedField(null)}
                        className="form-input"
                      />
                      <span className="form-icon">🏢</span>
                    </div>
                  </div>

                  <div className="form-field">
                    <div className={`form-input-wrapper form-textarea-wrapper ${focusedField === 'message' ? 'focused' : ''}`}>
                      <textarea
                        name="message"
                        id="input-message"
                        placeholder="Tell us about your business and data needs... *"
                        value={formState.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={4}
                        className="form-input form-textarea"
                      />
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="form-error">
                      ⚠️ Something went wrong. Please try again or email us directly.
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    className="btn btn-primary contact__submit"
                    id="contact-submit-btn"
                    disabled={status === 'loading'}
                    whileHover={{ scale: status === 'loading' ? 1 : 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="spinner" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message 🚀
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column - Map + Info */}
          <motion.div
            className="contact__right"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Office Info */}
            <div className="contact__info-cards">
              {[
                { icon: '📍', title: 'Office', info: 'Nariman Point, Mumbai, Maharashtra 400021' },
                { icon: '📞', title: 'Phone', info: '+91 96534 91090' },
                { icon: '✉️', title: 'Email', info: 'hello@insightai.in' },
                { icon: '🕐', title: 'Hours', info: 'Mon–Fri: 9AM–6PM IST' },
              ].map(item => (
                <div key={item.title} className="contact__info-card glass">
                  <span className="contact__info-icon">{item.icon}</span>
                  <div>
                    <div className="contact__info-title">{item.title}</div>
                    <div className="contact__info-text">{item.info}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Leaflet Map */}
            <div className="contact__map" id="office-map">
              <MapContainer
                center={OFFICE_LOCATION}
                zoom={14}
                style={{ height: '260px', width: '100%', borderRadius: 'var(--radius-lg)' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={OFFICE_LOCATION} icon={customIcon}>
                  <Popup>
                    <div className="map-popup">
                      <strong>InsightAI HQ 🚀</strong>
                      <br />
                      Nariman Point, Mumbai
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

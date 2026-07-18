# InsightAI — AI-Powered Business Intelligence Platform

> **Interview Assessment** for iSN Business Solutions LLP | Built with AI-assisted development (Antigravity IDE)

A modern, premium SaaS landing page featuring **all 7 external integrations**, rich animations, responsive design, and production-ready code.

🔗 **[Live Demo](https://isn-insightai.vercel.app)** | 📦 **[GitHub Repository](https://github.com/yourusername/ISN-InsightAI)**

---

## 🚀 About InsightAI

InsightAI is a fictional AI-powered SaaS platform that helps businesses:
- Upload sales data (CSV, Excel, CRM integrations)
- Discover hidden trends and patterns with AI
- Predict future sales with 98% accuracy
- Generate beautiful auto-reports
- Get actionable growth suggestions

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18.3 | UI Framework |
| **Vite** | 5.4 | Build tool & Dev server |
| **GSAP + ScrollTrigger** | 3.12 | Scroll animations, counters, reveals |
| **Framer Motion** | 11 | Component animations, transitions |
| **Lottie React** | 2.4 | Animated AI illustrations |
| **Three.js (React Three Fiber)** | 8.17 | 3D particle field in hero |
| **EmailJS** | 4.4 | Working contact form |
| **React Leaflet** | 4.2 | Interactive office location map |
| **Theme Toggle** | Custom | Dark/Light mode with localStorage |

---

## ✨ Key Features

- **Seamless Dual Video Background** — Hero section with 2 AI-generated videos that loop without gaps
- **3D Particle Field** — Three.js rotating sphere of particles overlaid on video
- **10 Complete Sections** — Navbar, Hero, Logo Marquee, Features, How It Works, Dashboard, Testimonials, Pricing, Contact, Footer
- **All 7 External Integrations** — GSAP, Framer Motion, Lottie, Three.js, EmailJS, Theme Toggle, Leaflet Maps
- **Dark/Light Mode** — System preference detection + user toggle, persisted in localStorage
- **Responsive Design** — Mobile, tablet, and desktop layouts
- **Performance Optimized** — Code splitting, lazy loading, optimized assets

---

## 🔧 Setup & Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ISN-InsightAI.git
cd ISN-InsightAI

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your EmailJS credentials

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📧 EmailJS Setup

To enable the contact form:
1. Create account at [emailjs.com](https://emailjs.com)
2. Add Email Service (Gmail recommended)
3. Create Email Template with variables: `{{user_name}}`, `{{user_email}}`, `{{company}}`, `{{message}}`
4. Copy your Service ID, Template ID, and Public Key to `.env`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 🚀 Deployment

Deployed on **Vercel**:
1. Push code to GitHub
2. Import repository in Vercel dashboard
3. Add environment variables (EmailJS keys)
4. Deploy — Vercel auto-detects Vite and handles everything

---

## 🎨 Design Decisions

- **Dark mode by default** — Premium, modern SaaS aesthetic with deep navy/indigo palette
- **Glassmorphism** — Frosted glass cards with backdrop-filter for depth
- **Space Grotesk + Inter** — Technical yet readable typography pairing
- **Indigo/Violet gradient** — AI-tech brand language consistent throughout
- **Micro-animations** — Every interactive element has purposeful animation

---

## 📁 Project Structure

```
src/
├── components/         # 10 section components (each with .jsx + .css)
│   ├── Navbar/
│   ├── Hero/
│   ├── LogoMarquee/
│   ├── Features/
│   ├── HowItWorks/
│   ├── Dashboard/
│   ├── Testimonials/
│   ├── Pricing/
│   ├── Contact/
│   ├── Footer/
│   └── ThemeToggle/
├── context/
│   └── ThemeContext.jsx  # Global theme state
├── hooks/
│   └── useScrollAnimation.js  # GSAP animation hooks
├── App.jsx
├── main.jsx
└── index.css             # Global design system
```

---

## 👤 Author

Built by **Meet** as an assessment for iSN Business Solutions LLP using AI-assisted development.

---

*This project demonstrates effective use of AI coding tools, integration of 7 external libraries, and production-ready web development practices.*

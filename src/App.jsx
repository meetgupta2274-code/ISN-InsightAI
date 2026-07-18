import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import LogoMarquee from './components/LogoMarquee/LogoMarquee';
import Features from './components/Features/Features';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Dashboard from './components/Dashboard/Dashboard';
import Testimonials from './components/Testimonials/Testimonials';
import Pricing from './components/Pricing/Pricing';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <ThemeProvider>
      {/* Subtle noise texture overlay for premium feel */}
      <div className="noise-overlay" aria-hidden="true" />

      <Navbar />

      <main id="main-content">
        <Hero />
        <LogoMarquee />
        <Features />
        <HowItWorks />
        <Dashboard />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>

      <Footer />
    </ThemeProvider>
  );
}

export default App;

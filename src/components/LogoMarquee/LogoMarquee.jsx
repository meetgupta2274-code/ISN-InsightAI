import './LogoMarquee.css';

const logos = [
  'NovaCorp', 'DataFlow', 'Nexus AI', 'QuantumBiz',
  'MetricsPro', 'SalesEdge', 'PulseAnalytics', 'VentureIQ',
  'NovaCorp', 'DataFlow', 'Nexus AI', 'QuantumBiz',
  'MetricsPro', 'SalesEdge', 'PulseAnalytics', 'VentureIQ',
];

const LogoMarquee = () => {
  return (
    <section className="marquee-section">
      <div className="marquee-label">
        <span>Trusted by leading businesses worldwide</span>
      </div>
      <div className="marquee-track-wrapper">
        <div className="marquee-fade-left" />
        <div className="marquee-track" id="logo-marquee">
          <div className="marquee-content">
            {logos.map((name, i) => (
              <div className="marquee-logo" key={`${name}-${i}`}>
                <div className="marquee-logo-icon">
                  {name.charAt(0)}
                </div>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="marquee-fade-right" />
      </div>
    </section>
  );
};

export default LogoMarquee;

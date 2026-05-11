import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Head>
        <title>Ether EV — Drive the Future</title>
        <meta name="description" content="Ether EV — Next generation electric vehicles powered by innovation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className="root">
        {/* Ambient background particles */}
        <div className="ambient">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle p${i % 5}`} style={{ left: `${(i * 19 + 3) % 100}%`, animationDelay: `${i * 0.4}s`, animationDuration: `${6 + (i % 4) * 2}s` }} />
          ))}
        </div>

        {/* NAVBAR */}
        <nav className={`navbar ${scrollY > 60 ? 'scrolled' : ''}`}>
          <div className="nav-inner">
            <div className="logo">
              <span className="logo-e">Ξ</span>
              <span className="logo-text">ETHER<span className="logo-ev">EV</span></span>
            </div>
            <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
              <li><a href="#models" onClick={() => setMenuOpen(false)}>Models</a></li>
              <li><a href="#tech" onClick={() => setMenuOpen(false)}>Technology</a></li>
              <li><a href="#features" onClick={() => setMenuOpen(false)}>Features</a></li>
              <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
            </ul>
            <a href="#contact" className="nav-cta">Order Now</a>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero" ref={heroRef}>
          <div className="hero-content">
            <div className="hero-badge">Next-Gen Electric</div>
            <h1 className="hero-title">
              Drive The<br />
              <span className="glow-text">Future</span><br />
              Today.
            </h1>
            <p className="hero-sub">
              Ether EV redefines electric mobility — blinding performance,<br />
              zero compromise, infinite possibilities.
            </p>
            <div className="hero-btns">
              <a href="#models" className="btn-primary">Explore Models</a>
              <a href="#tech" className="btn-ghost">Watch Film ▶</a>
            </div>
            <div className="hero-stats">
              <div className="hstat"><span className="hstat-val">620<small>km</small></span><span className="hstat-label">Range</span></div>
              <div className="hstat-divider" />
              <div className="hstat"><span className="hstat-val">2.4<small>s</small></span><span className="hstat-label">0–100 km/h</span></div>
              <div className="hstat-divider" />
              <div className="hstat"><span className="hstat-val">18<small>min</small></span><span className="hstat-label">80% Charge</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="car-container">
              <div className="car-glow" />
              <svg className="car-svg" viewBox="0 0 700 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Car body */}
                <defs>
                  <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1a2a4a" />
                    <stop offset="50%" stopColor="#0d1b35" />
                    <stop offset="100%" stopColor="#060d1a" />
                  </linearGradient>
                  <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e3560" />
                    <stop offset="100%" stopColor="#0a1628" />
                  </linearGradient>
                  <linearGradient id="glowGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
                    <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {/* Shadow */}
                <ellipse cx="350" cy="268" rx="260" ry="14" fill="#00d4ff" fillOpacity="0.08" />
                {/* Main body */}
                <path d="M80 210 Q85 170 140 165 L200 120 Q240 82 320 78 L420 76 Q500 76 530 100 L580 138 Q630 152 640 180 L642 210 Q642 230 620 232 L80 232 Q60 232 60 210 Z" fill="url(#bodyGrad)" />
                {/* Roof */}
                <path d="M210 120 Q250 78 325 74 L415 72 Q495 72 525 98 L575 138 L200 138 Z" fill="url(#roofGrad)" />
                {/* Windshield */}
                <path d="M218 132 Q255 88 324 80 L415 78 Q478 78 510 104 L548 132 Z" fill="#00d4ff" fillOpacity="0.12" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.4" />
                {/* Rear window */}
                <path d="M218 132 L215 138 L560 138 L548 132 Z" fill="#00d4ff" fillOpacity="0.06" />
                {/* Door lines */}
                <line x1="330" y1="138" x2="325" y2="230" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.3" />
                <line x1="460" y1="138" x2="460" y2="230" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.3" />
                {/* Door handles */}
                <rect x="280" y="185" width="30" height="6" rx="3" fill="#00d4ff" fillOpacity="0.5" />
                <rect x="410" y="185" width="30" height="6" rx="3" fill="#00d4ff" fillOpacity="0.5" />
                {/* Bottom stripe glow */}
                <rect x="80" y="226" width="560" height="3" rx="1.5" fill="url(#glowGrad)" filter="url(#glow)" />
                {/* Front light */}
                <path d="M630 165 L645 172 L645 190 L630 195 Z" fill="#00d4ff" fillOpacity="0.9" filter="url(#glow)" />
                <path d="M645 172 L680 168 L682 200 L645 190 Z" fill="#00d4ff" fillOpacity="0.3" />
                {/* Rear light */}
                <path d="M78 165 L64 170 L62 195 L78 198 Z" fill="#ff3d3d" fillOpacity="0.9" filter="url(#glow)" />
                {/* Front wheel */}
                <circle cx="530" cy="240" r="42" fill="#0a0f1e" stroke="#00d4ff" strokeWidth="1.5" strokeOpacity="0.6" />
                <circle cx="530" cy="240" r="30" fill="#0d1428" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.4" />
                <circle cx="530" cy="240" r="8" fill="#00d4ff" fillOpacity="0.8" />
                {[0,60,120,180,240,300].map(a => (
                  <line key={a} x1={530 + 12 * Math.cos(a * Math.PI/180)} y1={240 + 12 * Math.sin(a * Math.PI/180)} x2={530 + 28 * Math.cos(a * Math.PI/180)} y2={240 + 28 * Math.sin(a * Math.PI/180)} stroke="#00d4ff" strokeWidth="2" strokeOpacity="0.6" />
                ))}
                {/* Rear wheel */}
                <circle cx="175" cy="240" r="42" fill="#0a0f1e" stroke="#00d4ff" strokeWidth="1.5" strokeOpacity="0.6" />
                <circle cx="175" cy="240" r="30" fill="#0d1428" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.4" />
                <circle cx="175" cy="240" r="8" fill="#00d4ff" fillOpacity="0.8" />
                {[0,60,120,180,240,300].map(a => (
                  <line key={a} x1={175 + 12 * Math.cos(a * Math.PI/180)} y1={240 + 12 * Math.sin(a * Math.PI/180)} x2={175 + 28 * Math.cos(a * Math.PI/180)} y2={240 + 28 * Math.sin(a * Math.PI/180)} stroke="#00d4ff" strokeWidth="2" strokeOpacity="0.6" />
                ))}
                {/* Logo on car */}
                <text x="340" y="200" fill="#00d4ff" fillOpacity="0.4" fontSize="28" fontFamily="serif" fontWeight="bold" textAnchor="middle">Ξ</text>
              </svg>
              <div className="scan-line" />
            </div>
          </div>
          <div className="hero-scroll">
            <span>Scroll</span>
            <div className="scroll-arrow" />
          </div>
        </section>

        {/* MARQUEE TICKER */}
        <div className="ticker">
          <div className="ticker-track">
            {['Zero Emissions', 'Ultra-Fast Charging', '620km Range', 'Autopilot Ready', 'OTA Updates', 'Bi-directional Charging', 'Active Air Suspension', 'Titanium Frame', 'Zero Emissions', 'Ultra-Fast Charging', '620km Range', 'Autopilot Ready', 'OTA Updates', 'Bi-directional Charging', 'Active Air Suspension', 'Titanium Frame'].map((t, i) => (
              <span key={i} className="ticker-item">{t} <span className="ticker-dot">◆</span></span>
            ))}
          </div>
        </div>

        {/* MODELS */}
        <section className="section" id="models">
          <div className="section-inner">
            <div className="section-label">Our Fleet</div>
            <h2 className="section-title">Choose Your<br /><span className="glow-text">Ether</span></h2>
            <div className="models-grid">
              {[
                { name: 'Ether One', tag: 'Entry', range: '480km', speed: '3.8s', price: '৳ 45L', color: '#00d4ff', desc: 'The perfect start to electric life. Sleek, smart, efficient.' },
                { name: 'Ether Pro', tag: 'Popular', range: '620km', speed: '2.4s', price: '৳ 72L', color: '#7b2fff', desc: 'Performance meets luxury. Our most-loved model.', featured: true },
                { name: 'Ether X', tag: 'Hypercar', range: '740km', speed: '1.9s', price: '৳ 1.2Cr', color: '#ff6b00', desc: 'Uncompromising power. Built for the bold.' },
              ].map((m, i) => (
                <div key={i} className={`model-card ${m.featured ? 'featured' : ''}`} style={{ '--accent': m.color }}>
                  {m.featured && <div className="model-badge">Most Popular</div>}
                  <div className="model-tag">{m.tag}</div>
                  <div className="model-car-viz">
                    <div className="model-car-glow" />
                    <svg viewBox="0 0 300 120" className="model-car-icon">
                      <defs>
                        <linearGradient id={`mg${i}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor={m.color} stopOpacity="0.3" />
                          <stop offset="100%" stopColor={m.color} stopOpacity="0.05" />
                        </linearGradient>
                      </defs>
                      <path d="M30 80 Q32 62 55 60 L75 44 Q92 30 125 28 L175 27 Q210 27 225 40 L248 54 Q268 60 270 74 L272 82 Q272 90 262 91 L30 91 Q22 91 22 82 Z" fill={`url(#mg${i})`} stroke={m.color} strokeWidth="1" strokeOpacity="0.6" />
                      <path d="M80 44 Q98 28 127 26 L175 25 Q208 25 222 38 L242 54 L78 54 Z" fill={m.color} fillOpacity="0.15" />
                      <circle cx="215" cy="98" r="16" fill="none" stroke={m.color} strokeWidth="1.5" strokeOpacity="0.7" />
                      <circle cx="215" cy="98" r="6" fill={m.color} fillOpacity="0.6" />
                      <circle cx="85" cy="98" r="16" fill="none" stroke={m.color} strokeWidth="1.5" strokeOpacity="0.7" />
                      <circle cx="85" cy="98" r="6" fill={m.color} fillOpacity="0.6" />
                      <rect x="25" y="86" width="246" height="2" rx="1" fill={m.color} fillOpacity="0.3" />
                    </svg>
                  </div>
                  <h3 className="model-name">{m.name}</h3>
                  <p className="model-desc">{m.desc}</p>
                  <div className="model-specs">
                    <div className="spec"><div className="spec-val">{m.range}</div><div className="spec-key">Range</div></div>
                    <div className="spec"><div className="spec-val">{m.speed}</div><div className="spec-key">0–100</div></div>
                    <div className="spec"><div className="spec-val">{m.price}</div><div className="spec-key">Starting</div></div>
                  </div>
                  <a href="#contact" className="model-btn">Configure →</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TECHNOLOGY */}
        <section className="section tech-section" id="tech">
          <div className="section-inner">
            <div className="section-label">Under the Hood</div>
            <h2 className="section-title">Engineered for<br /><span className="glow-text">Tomorrow</span></h2>
            <div className="tech-grid">
              <div className="tech-visual">
                <div className="battery-viz">
                  <div className="battery-outer">
                    <div className="battery-cells">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="battery-cell" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                    <div className="battery-label">98 kWh<br /><small>Solid-State Pack</small></div>
                  </div>
                  <div className="tech-rings">
                    <div className="ring r1" /><div className="ring r2" /><div className="ring r3" />
                  </div>
                </div>
              </div>
              <div className="tech-content">
                {[
                  { icon: '⚡', title: 'Solid-State Battery', desc: 'Our proprietary 98 kWh solid-state battery packs deliver 40% more energy density than conventional lithium-ion cells — with superior safety.' },
                  { icon: '🔋', title: 'Ultra-Fast Charging', desc: '350 kW DC fast charging architecture. Go from 10% to 80% in under 18 minutes — faster than your coffee break.' },
                  { icon: '🧠', title: 'Neural Drive AI', desc: 'Real-time road learning AI optimizes range, braking, suspension and energy recovery 100 times per second.' },
                  { icon: '🌡️', title: 'Thermal Management', desc: 'Patent-pending octovalve thermal system maintains optimal battery temperature in -30°C to +55°C environments.' },
                ].map((t, i) => (
                  <div key={i} className="tech-item">
                    <div className="tech-icon">{t.icon}</div>
                    <div>
                      <h4 className="tech-title">{t.title}</h4>
                      <p className="tech-desc">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="section" id="features">
          <div className="section-inner">
            <div className="section-label">Why Ether</div>
            <h2 className="section-title">Features That<br /><span className="glow-text">Define You</span></h2>
            <div className="features-grid">
              {[
                { icon: '🛡️', title: 'Military-Grade Safety', desc: '5-star NCAP safety rating. Crumple zones, 8 airbags, and pre-collision AI braking.' },
                { icon: '📡', title: 'Over-the-Air Updates', desc: 'Your car gets smarter every month. New features, performance upgrades — delivered wirelessly.' },
                { icon: '🌐', title: 'Global Charging Network', desc: '8,000+ charging stations across South Asia. Never worry about range again.' },
                { icon: '🎛️', title: '17" Holographic Display', desc: 'Immersive floating touchscreen with ambient edge lighting and haptic feedback.' },
                { icon: '🔊', title: 'Dolby Atmos Sound', desc: '23-speaker premium surround sound system. Concert hall inside your car.' },
                { icon: '🌿', title: '100% Carbon Neutral', desc: 'Every Ether EV sold plants 100 trees. Sustainably manufactured, responsibly delivered.' },
              ].map((f, i) => (
                <div key={i} className="feature-card">
                  <div className="feature-icon">{f.icon}</div>
                  <h4 className="feature-title">{f.title}</h4>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <div className="stats-bar">
          {[
            { val: '12,400+', label: 'Happy Owners' },
            { val: '98%', label: 'Satisfaction Rate' },
            { val: '4.2M', label: 'km Driven Monthly' },
            { val: '#1', label: 'EV Brand in BD' },
          ].map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-val">{s.val}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* TESTIMONIALS */}
        <section className="section">
          <div className="section-inner">
            <div className="section-label">Owners Say</div>
            <h2 className="section-title">Real People.<br /><span className="glow-text">Real Stories.</span></h2>
            <div className="testimonials-grid">
              {[
                { name: 'Arif Rahman', role: 'Tech Entrepreneur, Dhaka', text: '"Switched from a petrol SUV to Ether Pro 8 months ago. The performance is insane and I\'ve spent ৳0 on fuel. Best decision of my life."', stars: 5 },
                { name: 'Farhana Islam', role: 'Architect, Chittagong', text: '"The charging network is everywhere now. I drove Dhaka to Cox\'s Bazar on a single charge. Absolutely mindblowing."', stars: 5 },
                { name: 'Tahmid Hossain', role: 'Software Engineer, Sylhet', text: '"OTA update last month added 30km of range and improved autopilot. The car literally got better while I slept!"', stars: 5 },
              ].map((t, i) => (
                <div key={i} className="testimonial-card">
                  <div className="stars">{'★'.repeat(t.stars)}</div>
                  <p className="testimonial-text">{t.text}</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{t.name[0]}</div>
                    <div>
                      <div className="author-name">{t.name}</div>
                      <div className="author-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="cta-section" id="contact">
          <div className="cta-glow" />
          <div className="cta-inner">
            <div className="section-label">Get Started</div>
            <h2 className="cta-title">Ready to Go<br /><span className="glow-text">Electric?</span></h2>
            <p className="cta-sub">Join 12,000+ Bangladeshis already driving the future. Reserve your Ether EV today with ৳10,000 fully refundable deposit.</p>
            <form className="cta-form" onSubmit={e => e.preventDefault()}>
              <input type="text" placeholder="Your Full Name" className="cta-input" />
              <input type="tel" placeholder="Phone Number" className="cta-input" />
              <select className="cta-input cta-select">
                <option value="">Select Model</option>
                <option>Ether One</option>
                <option>Ether Pro</option>
                <option>Ether X</option>
              </select>
              <button type="submit" className="cta-btn">Reserve My Ether →</button>
            </form>
            <p className="cta-note">No commitment. 100% refundable. Delivery in Q3 2026.</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="logo">
                <span className="logo-e">Ξ</span>
                <span className="logo-text">ETHER<span className="logo-ev">EV</span></span>
              </div>
              <p className="footer-tagline">Driving Bangladesh forward,<br />one electron at a time.</p>
              <div className="footer-socials">
                {['𝕏', 'in', 'f', '▶'].map((s, i) => <a key={i} href="#" className="social-btn">{s}</a>)}
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <h5>Products</h5>
                <a href="#">Ether One</a><a href="#">Ether Pro</a><a href="#">Ether X</a><a href="#">Accessories</a>
              </div>
              <div className="footer-col">
                <h5>Company</h5>
                <a href="#">About Us</a><a href="#">Careers</a><a href="#">Press</a><a href="#">Investors</a>
              </div>
              <div className="footer-col">
                <h5>Support</h5>
                <a href="#">Service Centers</a><a href="#">Charging Map</a><a href="#">Owner App</a><a href="#">Contact</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Ether EV Technologies Ltd. All rights reserved.</span>
            <span>Made with ⚡ in Bangladesh</span>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #03060f; color: #e8eaf6; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        a { text-decoration: none; color: inherit; }
        button { border: none; cursor: pointer; background: none; }
      `}</style>

      <style jsx>{`
        /* ROOT */
        .root { position: relative; min-height: 100vh; }

        /* AMBIENT */
        .ambient { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .particle { position: absolute; border-radius: 50%; animation: float linear infinite; }
        .p0 { width: 3px; height: 3px; background: #00d4ff; opacity: 0.4; bottom: -10px; }
        .p1 { width: 2px; height: 2px; background: #7b2fff; opacity: 0.3; bottom: -10px; }
        .p2 { width: 4px; height: 4px; background: #00d4ff; opacity: 0.2; bottom: -10px; }
        .p3 { width: 2px; height: 2px; background: #39ff14; opacity: 0.3; bottom: -10px; }
        .p4 { width: 3px; height: 3px; background: #ff6b00; opacity: 0.2; bottom: -10px; }
        @keyframes float { from { transform: translateY(0) rotate(0deg); opacity: 0.4; } to { transform: translateY(-110vh) rotate(360deg); opacity: 0; } }

        /* NAVBAR */
        .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 2rem; transition: all 0.3s ease; }
        .navbar.scrolled { background: rgba(3,6,15,0.92); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(0,212,255,0.1); }
        .nav-inner { max-width: 1280px; margin: 0 auto; display: flex; align-items: center; height: 72px; gap: 2rem; }
        .logo { display: flex; align-items: center; gap: 8px; margin-right: auto; }
        .logo-e { font-size: 1.8rem; color: #00d4ff; filter: drop-shadow(0 0 10px #00d4ff); }
        .logo-text { font-family: 'Orbitron', monospace; font-size: 1.1rem; font-weight: 700; letter-spacing: 0.15em; color: #e8eaf6; }
        .logo-ev { color: #00d4ff; }
        .nav-links { display: flex; list-style: none; gap: 2.5rem; }
        .nav-links a { font-size: 0.875rem; font-weight: 500; color: rgba(232,234,246,0.7); letter-spacing: 0.05em; transition: color 0.2s; position: relative; }
        .nav-links a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1px; background: #00d4ff; transition: width 0.3s; }
        .nav-links a:hover { color: #00d4ff; }
        .nav-links a:hover::after { width: 100%; }
        .nav-cta { padding: 0.5rem 1.5rem; border: 1px solid #00d4ff; color: #00d4ff; border-radius: 4px; font-size: 0.875rem; font-weight: 600; letter-spacing: 0.05em; transition: all 0.3s; white-space: nowrap; }
        .nav-cta:hover { background: #00d4ff; color: #03060f; box-shadow: 0 0 20px rgba(0,212,255,0.4); }
        .hamburger { display: none; flex-direction: column; gap: 5px; padding: 4px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: #e8eaf6; transition: all 0.3s; }
        @media (max-width: 768px) {
          .nav-links { display: none; position: fixed; top: 72px; left: 0; right: 0; background: rgba(3,6,15,0.98); flex-direction: column; padding: 2rem; gap: 1.5rem; border-bottom: 1px solid rgba(0,212,255,0.1); }
          .nav-links.open { display: flex; }
          .hamburger { display: flex; }
        }

        /* HERO */
        .hero { position: relative; min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; align-items: center; padding: 0 4rem; max-width: 1400px; margin: 0 auto; gap: 2rem; overflow: hidden; }
        .hero::before { content: ''; position: absolute; top: 20%; left: -20%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%); pointer-events: none; }
        .hero-content { position: relative; z-index: 2; padding-top: 5rem; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border: 1px solid rgba(0,212,255,0.3); border-radius: 999px; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.1em; color: #00d4ff; margin-bottom: 1.5rem; background: rgba(0,212,255,0.05); text-transform: uppercase; }
        .hero-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #00d4ff; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.4); } }
        .hero-title { font-family: 'Orbitron', monospace; font-size: clamp(2.5rem, 5vw, 5rem); font-weight: 900; line-height: 1.05; letter-spacing: -0.02em; color: #e8eaf6; margin-bottom: 1.5rem; }
        .glow-text { color: #00d4ff; text-shadow: 0 0 30px rgba(0,212,255,0.6), 0 0 60px rgba(0,212,255,0.3); }
        .hero-sub { font-size: 1.05rem; color: rgba(232,234,246,0.6); line-height: 1.7; margin-bottom: 2.5rem; max-width: 480px; }
        .hero-btns { display: flex; gap: 1rem; margin-bottom: 3rem; flex-wrap: wrap; }
        .btn-primary { padding: 0.875rem 2rem; background: linear-gradient(135deg, #00d4ff, #0085ff); color: #03060f; border-radius: 6px; font-weight: 700; font-size: 0.95rem; letter-spacing: 0.03em; transition: all 0.3s; box-shadow: 0 0 30px rgba(0,212,255,0.3); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 50px rgba(0,212,255,0.5); }
        .btn-ghost { padding: 0.875rem 2rem; border: 1px solid rgba(232,234,246,0.2); color: rgba(232,234,246,0.8); border-radius: 6px; font-weight: 500; font-size: 0.95rem; transition: all 0.3s; }
        .btn-ghost:hover { border-color: rgba(0,212,255,0.4); color: #00d4ff; background: rgba(0,212,255,0.05); }
        .hero-stats { display: flex; align-items: center; gap: 0; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; overflow: hidden; width: fit-content; }
        .hstat { padding: 1rem 1.5rem; text-align: center; }
        .hstat-val { display: block; font-family: 'Orbitron', monospace; font-size: 1.6rem; font-weight: 700; color: #00d4ff; line-height: 1; }
        .hstat-val small { font-size: 0.9rem; font-family: 'Inter', sans-serif; font-weight: 400; }
        .hstat-label { display: block; font-size: 0.7rem; color: rgba(232,234,246,0.4); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; }
        .hstat-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.1); }
        .hero-visual { position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; padding-top: 5rem; }
        .car-container { position: relative; width: 100%; max-width: 600px; }
        .car-glow { position: absolute; bottom: 20%; left: 50%; transform: translateX(-50%); width: 60%; height: 40px; background: radial-gradient(ellipse, rgba(0,212,255,0.3), transparent 70%); filter: blur(15px); animation: carGlow 3s ease-in-out infinite; }
        @keyframes carGlow { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
        .car-svg { width: 100%; filter: drop-shadow(0 0 20px rgba(0,212,255,0.2)); animation: carFloat 4s ease-in-out infinite; }
        @keyframes carFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .scan-line { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00d4ff, transparent); animation: scan 3s linear infinite; opacity: 0.5; }
        @keyframes scan { from { top: 0; } to { top: 100%; } }
        .hero-scroll { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; color: rgba(232,234,246,0.3); font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; animation: bounce 2s infinite; }
        .scroll-arrow { width: 1px; height: 40px; background: linear-gradient(to bottom, rgba(0,212,255,0.5), transparent); }
        @keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }
        @media (max-width: 900px) { .hero { grid-template-columns: 1fr; padding: 0 1.5rem; padding-top: 5rem; } .hero-visual { order: -1; padding-top: 0; } }

        /* TICKER */
        .ticker { background: rgba(0,212,255,0.05); border-top: 1px solid rgba(0,212,255,0.1); border-bottom: 1px solid rgba(0,212,255,0.1); overflow: hidden; padding: 0.75rem 0; }
        .ticker-track { display: flex; animation: ticker 30s linear infinite; width: max-content; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-item { white-space: nowrap; padding: 0 1.5rem; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.08em; color: rgba(0,212,255,0.7); text-transform: uppercase; }
        .ticker-dot { color: #00d4ff; margin-left: 1.5rem; }

        /* SECTIONS */
        .section { padding: 6rem 2rem; position: relative; z-index: 1; }
        .section-inner { max-width: 1280px; margin: 0 auto; }
        .section-label { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #00d4ff; margin-bottom: 1rem; }
        .section-title { font-family: 'Orbitron', monospace; font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 700; line-height: 1.1; color: #e8eaf6; margin-bottom: 3.5rem; }

        /* MODELS */
        .models-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 900px) { .models-grid { grid-template-columns: 1fr; } }
        .model-card { position: relative; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 2rem; transition: all 0.4s; overflow: hidden; }
        .model-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(var(--accent-rgb),0.05), transparent); opacity: 0; transition: opacity 0.4s; }
        .model-card:hover { transform: translateY(-6px); border-color: var(--accent); box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 30px color-mix(in srgb, var(--accent) 20%, transparent); }
        .model-card:hover::before { opacity: 1; }
        .model-card.featured { border-color: rgba(123,47,255,0.5); background: rgba(123,47,255,0.05); }
        .model-badge { position: absolute; top: -1px; right: 1.5rem; background: linear-gradient(135deg, #7b2fff, #00d4ff); color: white; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em; padding: 4px 12px; border-radius: 0 0 8px 8px; text-transform: uppercase; }
        .model-tag { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent); margin-bottom: 1rem; }
        .model-car-viz { position: relative; height: 100px; margin: 0.5rem 0 1.5rem; }
        .model-car-glow { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 80%; height: 20px; background: radial-gradient(ellipse, var(--accent), transparent 70%); opacity: 0.3; filter: blur(8px); }
        .model-car-icon { width: 100%; height: 100%; }
        .model-name { font-family: 'Orbitron', monospace; font-size: 1.4rem; font-weight: 700; color: #e8eaf6; margin-bottom: 0.5rem; }
        .model-desc { font-size: 0.875rem; color: rgba(232,234,246,0.5); line-height: 1.6; margin-bottom: 1.5rem; }
        .model-specs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 8px; }
        .spec-val { font-family: 'Orbitron', monospace; font-size: 1rem; font-weight: 700; color: var(--accent); }
        .spec-key { font-size: 0.7rem; color: rgba(232,234,246,0.4); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 2px; }
        .model-btn { display: block; text-align: center; padding: 0.75rem; border: 1px solid var(--accent); color: var(--accent); border-radius: 8px; font-weight: 600; font-size: 0.875rem; transition: all 0.3s; }
        .model-btn:hover { background: var(--accent); color: #03060f; }

        /* TECH */
        .tech-section { background: radial-gradient(ellipse at 70% 50%, rgba(0,212,255,0.04), transparent 60%); }
        .tech-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        @media (max-width: 900px) { .tech-grid { grid-template-columns: 1fr; } }
        .tech-visual { display: flex; justify-content: center; }
        .battery-viz { position: relative; display: flex; align-items: center; justify-content: center; }
        .battery-outer { width: 220px; height: 220px; border: 2px solid rgba(0,212,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative; z-index: 2; background: rgba(0,212,255,0.03); }
        .battery-cells { position: absolute; inset: 0; border-radius: 50%; overflow: hidden; }
        .battery-cell { position: absolute; width: 100%; height: 12.5%; left: 0; animation: chargeCell 2s ease-in-out infinite; }
        .battery-cell:nth-child(1) { top: 0%; background: linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent); }
        .battery-cell:nth-child(2) { top: 12.5%; background: linear-gradient(90deg, transparent, rgba(0,212,255,0.35), transparent); }
        .battery-cell:nth-child(3) { top: 25%; background: linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent); }
        .battery-cell:nth-child(4) { top: 37.5%; background: linear-gradient(90deg, transparent, rgba(0,212,255,0.25), transparent); }
        .battery-cell:nth-child(5) { top: 50%; background: linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent); }
        .battery-cell:nth-child(6) { top: 62.5%; background: linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent); }
        .battery-cell:nth-child(7) { top: 75%; background: linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent); }
        .battery-cell:nth-child(8) { top: 87.5%; background: linear-gradient(90deg, transparent, rgba(0,212,255,0.08), transparent); }
        @keyframes chargeCell { 0%,100% { opacity: 0.5; transform: scaleX(0.8); } 50% { opacity: 1; transform: scaleX(1); } }
        .battery-label { font-family: 'Orbitron', monospace; font-size: 1.4rem; font-weight: 700; color: #00d4ff; text-align: center; line-height: 1.4; z-index: 1; }
        .battery-label small { font-size: 0.65rem; font-family: 'Inter', sans-serif; color: rgba(0,212,255,0.6); font-weight: 400; display: block; }
        .tech-rings { position: absolute; inset: -20px; }
        .ring { position: absolute; border-radius: 50%; border: 1px solid rgba(0,212,255,0.15); animation: ringPulse 3s ease-in-out infinite; }
        .r1 { inset: 0; animation-delay: 0s; }
        .r2 { inset: -20px; animation-delay: 0.5s; }
        .r3 { inset: -40px; animation-delay: 1s; }
        @keyframes ringPulse { 0%,100% { opacity: 0.15; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.02); } }
        .tech-content { display: flex; flex-direction: column; gap: 1.5rem; }
        .tech-item { display: flex; gap: 1rem; padding: 1.25rem; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; transition: border-color 0.3s, background 0.3s; }
        .tech-item:hover { border-color: rgba(0,212,255,0.3); background: rgba(0,212,255,0.03); }
        .tech-icon { font-size: 1.5rem; flex-shrink: 0; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: rgba(0,212,255,0.1); border-radius: 8px; }
        .tech-title { font-weight: 600; color: #e8eaf6; margin-bottom: 0.25rem; }
        .tech-desc { font-size: 0.875rem; color: rgba(232,234,246,0.5); line-height: 1.6; }

        /* FEATURES */
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 900px) { .features-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 540px) { .features-grid { grid-template-columns: 1fr; } }
        .feature-card { padding: 1.75rem; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; transition: all 0.3s; background: rgba(255,255,255,0.01); }
        .feature-card:hover { border-color: rgba(0,212,255,0.25); background: rgba(0,212,255,0.03); transform: translateY(-4px); }
        .feature-icon { font-size: 1.75rem; margin-bottom: 1rem; }
        .feature-title { font-weight: 600; color: #e8eaf6; margin-bottom: 0.5rem; }
        .feature-desc { font-size: 0.875rem; color: rgba(232,234,246,0.5); line-height: 1.6; }

        /* STATS BAR */
        .stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); background: linear-gradient(135deg, rgba(0,212,255,0.08), rgba(123,47,255,0.08)); border-top: 1px solid rgba(0,212,255,0.15); border-bottom: 1px solid rgba(0,212,255,0.15); }
        @media (max-width: 640px) { .stats-bar { grid-template-columns: repeat(2, 1fr); } }
        .stat-item { padding: 2.5rem 2rem; text-align: center; border-right: 1px solid rgba(255,255,255,0.06); }
        .stat-item:last-child { border-right: none; }
        .stat-val { font-family: 'Orbitron', monospace; font-size: 2rem; font-weight: 700; color: #00d4ff; margin-bottom: 0.25rem; }
        .stat-label { font-size: 0.8rem; color: rgba(232,234,246,0.5); text-transform: uppercase; letter-spacing: 0.08em; }

        /* TESTIMONIALS */
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        @media (max-width: 900px) { .testimonials-grid { grid-template-columns: 1fr; } }
        .testimonial-card { padding: 2rem; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; background: rgba(255,255,255,0.02); }
        .stars { color: #fbbf24; font-size: 1.1rem; margin-bottom: 1rem; letter-spacing: 2px; }
        .testimonial-text { font-size: 0.9rem; color: rgba(232,234,246,0.7); line-height: 1.7; margin-bottom: 1.5rem; font-style: italic; }
        .testimonial-author { display: flex; align-items: center; gap: 0.75rem; }
        .author-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #00d4ff, #7b2fff); display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; font-size: 1rem; flex-shrink: 0; }
        .author-name { font-weight: 600; font-size: 0.875rem; color: #e8eaf6; }
        .author-role { font-size: 0.75rem; color: rgba(232,234,246,0.4); }

        /* CTA */
        .cta-section { position: relative; padding: 7rem 2rem; text-align: center; overflow: hidden; }
        .cta-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 600px; background: radial-gradient(circle, rgba(0,212,255,0.06), transparent 70%); pointer-events: none; }
        .cta-inner { position: relative; z-index: 1; max-width: 680px; margin: 0 auto; }
        .cta-title { font-family: 'Orbitron', monospace; font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 700; line-height: 1.1; color: #e8eaf6; margin-bottom: 1.5rem; }
        .cta-sub { font-size: 1rem; color: rgba(232,234,246,0.6); line-height: 1.7; margin-bottom: 2.5rem; }
        .cta-form { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        @media (max-width: 640px) { .cta-form { grid-template-columns: 1fr; } }
        .cta-input { padding: 0.875rem 1.25rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #e8eaf6; font-size: 0.95rem; font-family: 'Inter', sans-serif; outline: none; transition: border-color 0.3s; }
        .cta-input::placeholder { color: rgba(232,234,246,0.3); }
        .cta-input:focus { border-color: rgba(0,212,255,0.5); }
        .cta-select { appearance: none; cursor: pointer; }
        .cta-btn { grid-column: 1 / -1; padding: 1rem 2.5rem; background: linear-gradient(135deg, #00d4ff, #0062ff); color: #03060f; border-radius: 8px; font-weight: 700; font-size: 1rem; letter-spacing: 0.03em; transition: all 0.3s; box-shadow: 0 0 30px rgba(0,212,255,0.3); cursor: pointer; border: none; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 0 50px rgba(0,212,255,0.5); }
        .cta-note { font-size: 0.8rem; color: rgba(232,234,246,0.3); margin-top: 1rem; }

        /* FOOTER */
        .footer { background: rgba(0,0,0,0.4); border-top: 1px solid rgba(255,255,255,0.06); padding: 4rem 2rem 2rem; }
        .footer-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 2fr; gap: 4rem; margin-bottom: 3rem; }
        @media (max-width: 768px) { .footer-inner { grid-template-columns: 1fr; gap: 2rem; } }
        .footer-tagline { font-size: 0.875rem; color: rgba(232,234,246,0.4); line-height: 1.7; margin: 1rem 0 1.5rem; }
        .footer-socials { display: flex; gap: 0.75rem; }
        .social-btn { width: 38px; height: 38px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; color: rgba(232,234,246,0.5); transition: all 0.3s; }
        .social-btn:hover { border-color: #00d4ff; color: #00d4ff; }
        .footer-links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .footer-col { display: flex; flex-direction: column; gap: 0.75rem; }
        .footer-col h5 { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(232,234,246,0.4); margin-bottom: 0.25rem; }
        .footer-col a { font-size: 0.875rem; color: rgba(232,234,246,0.6); transition: color 0.2s; }
        .footer-col a:hover { color: #00d4ff; }
        .footer-bottom { max-width: 1280px; margin: 0 auto; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: rgba(232,234,246,0.3); flex-wrap: wrap; gap: 0.5rem; }
      `}</style>
    </>
  )
}

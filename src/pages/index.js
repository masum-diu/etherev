import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('models')
  const [modelDot, setModelDot] = useState(0)
  const [testDot, setTestDot] = useState(0)
  const [selectedModel, setSelectedModel] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const modelScrollRef = useRef(null)
  const testScrollRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const close = (e) => { if (!e.target.closest('.custom-select-wrap')) setDropdownOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  // Active section tracker for bottom nav
  useEffect(() => {
    const sections = ['models', 'tech', 'features', 'contact']
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Dot indicator sync for model carousel
  const onModelScroll = () => {
    const el = modelScrollRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / (el.scrollWidth / 3))
    setModelDot(Math.min(2, Math.max(0, idx)))
  }

  // Dot indicator sync for testimonial carousel
  const onTestScroll = () => {
    const el = testScrollRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / (el.scrollWidth / 3))
    setTestDot(Math.min(2, Math.max(0, idx)))
  }

  const scrollToModel = (i) => {
    const el = modelScrollRef.current
    if (!el) return
    el.scrollTo({ left: (el.scrollWidth / 3) * i, behavior: 'smooth' })
  }

  const scrollToTest = (i) => {
    const el = testScrollRef.current
    if (!el) return
    el.scrollTo({ left: (el.scrollWidth / 3) * i, behavior: 'smooth' })
  }

  const navItems = [
    { id: 'models', label: 'Models', icon: '🚗' },
    { id: 'tech', label: 'Tech', icon: '⚡' },
    { id: 'features', label: 'Features', icon: '🛡️' },
    { id: 'contact', label: 'Reserve', icon: '📋' },
  ]

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
        {/* Ambient particles */}
        <div className="ambient">
          {[...Array(16)].map((_, i) => (
            <div key={i} className={`particle p${i % 5}`} style={{ left: `${(i * 19 + 3) % 100}%`, animationDelay: `${i * 0.5}s`, animationDuration: `${7 + (i % 4) * 2}s` }} />
          ))}
        </div>

        {/* ── NAVBAR ── */}
        <nav className={`navbar ${scrollY > 60 ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
          <div className="nav-inner">
            <a href="#" className="logo">
              <span className="logo-e">Ξ</span>
              <span className="logo-text">ETHER<span className="logo-ev">EV</span></span>
            </a>
            <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
              <li><a href="#models" onClick={() => setMenuOpen(false)}>Models</a></li>
              <li><a href="#tech" onClick={() => setMenuOpen(false)}>Technology</a></li>
              <li><a href="#features" onClick={() => setMenuOpen(false)}>Features</a></li>
              <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
            </ul>
            {/* Desktop-only hamburger (no Order Now anywhere) */}
            <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* ── MOBILE BOTTOM NAV ── */}
        <nav className="bottom-nav">
          {navItems.map(item => (
            <a key={item.id} href={`#${item.id}`} className={`bnav-item ${activeSection === item.id ? 'active' : ''}`}>
              <span className="bnav-icon">{item.icon}</span>
              <span className="bnav-label">{item.label}</span>
              {activeSection === item.id && <span className="bnav-dot" />}
            </a>
          ))}
        </nav>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-inner">
            {/* Content — left on desktop */}
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-dot" />
                Next-Gen Electric
              </div>
              <h1 className="hero-title">
                Drive The <span className="glow-text">Future</span> Today.
              </h1>
              <p className="hero-sub">
                Ether EV redefines electric mobility — blinding performance, zero compromise, infinite possibilities.
              </p>
              <div className="hero-btns">
                <a href="#models" className="btn-primary">Explore Models →</a>
                <a href="#tech" className="btn-ghost">▶ Watch Film</a>
              </div>
              <div className="hero-stats">
                <div className="hstat">
                  <span className="hstat-val">620<small>km</small></span>
                  <span className="hstat-label">Range</span>
                </div>
                <div className="hstat-divider" />
                <div className="hstat">
                  <span className="hstat-val">2.4<small>s</small></span>
                  <span className="hstat-label">0–100 km/h</span>
                </div>
                <div className="hstat-divider" />
                <div className="hstat">
                  <span className="hstat-val">18<small>min</small></span>
                  <span className="hstat-label">80% Charge</span>
                </div>
              </div>
            </div>

            {/* Visual — right on desktop, top on mobile */}
            <div className="hero-visual">
              <div className="car-container">
                <div className="car-glow" />
                <svg className="car-svg" viewBox="0 0 700 300" fill="none">
                  <defs>
                    <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1a2a4a" /><stop offset="50%" stopColor="#0d1b35" /><stop offset="100%" stopColor="#060d1a" />
                    </linearGradient>
                    <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1e3560" /><stop offset="100%" stopColor="#0a1628" />
                    </linearGradient>
                    <linearGradient id="glowGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" /><stop offset="50%" stopColor="#00d4ff" stopOpacity="0.8" /><stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                  </defs>
                  <ellipse cx="350" cy="268" rx="260" ry="14" fill="#00d4ff" fillOpacity="0.08" />
                  <path d="M80 210 Q85 170 140 165 L200 120 Q240 82 320 78 L420 76 Q500 76 530 100 L580 138 Q630 152 640 180 L642 210 Q642 230 620 232 L80 232 Q60 232 60 210 Z" fill="url(#bodyGrad)" />
                  <path d="M210 120 Q250 78 325 74 L415 72 Q495 72 525 98 L575 138 L200 138 Z" fill="url(#roofGrad)" />
                  <path d="M218 132 Q255 88 324 80 L415 78 Q478 78 510 104 L548 132 Z" fill="#00d4ff" fillOpacity="0.12" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.4" />
                  <path d="M218 132 L215 138 L560 138 L548 132 Z" fill="#00d4ff" fillOpacity="0.06" />
                  <line x1="330" y1="138" x2="325" y2="230" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.3" />
                  <line x1="460" y1="138" x2="460" y2="230" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.3" />
                  <rect x="280" y="185" width="30" height="6" rx="3" fill="#00d4ff" fillOpacity="0.5" />
                  <rect x="410" y="185" width="30" height="6" rx="3" fill="#00d4ff" fillOpacity="0.5" />
                  <rect x="80" y="226" width="560" height="3" rx="1.5" fill="url(#glowGrad)" filter="url(#glow)" />
                  <path d="M630 165 L645 172 L645 190 L630 195 Z" fill="#00d4ff" fillOpacity="0.9" filter="url(#glow)" />
                  <path d="M645 172 L680 168 L682 200 L645 190 Z" fill="#00d4ff" fillOpacity="0.3" />
                  <path d="M78 165 L64 170 L62 195 L78 198 Z" fill="#ff3d3d" fillOpacity="0.9" filter="url(#glow)" />
                  {[530, 175].map(cx => (
                    <g key={cx}>
                      <circle cx={cx} cy="240" r="42" fill="#0a0f1e" stroke="#00d4ff" strokeWidth="1.5" strokeOpacity="0.6" />
                      <circle cx={cx} cy="240" r="30" fill="#0d1428" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.4" />
                      <circle cx={cx} cy="240" r="8" fill="#00d4ff" fillOpacity="0.8" />
                      {[0, 60, 120, 180, 240, 300].map(a => (
                        <line key={a} x1={cx + 12 * Math.cos(a * Math.PI / 180)} y1={240 + 12 * Math.sin(a * Math.PI / 180)} x2={cx + 28 * Math.cos(a * Math.PI / 180)} y2={240 + 28 * Math.sin(a * Math.PI / 180)} stroke="#00d4ff" strokeWidth="2" strokeOpacity="0.6" />
                      ))}
                    </g>
                  ))}
                  <text x="340" y="200" fill="#00d4ff" fillOpacity="0.35" fontSize="28" fontFamily="serif" fontWeight="bold" textAnchor="middle">Ξ</text>
                </svg>
                <div className="scan-line" />
              </div>
            </div>

          </div>

          <div className="hero-scroll">
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* ── TICKER ── */}
        <div className="ticker">
          <div className="ticker-track">
            {['Zero Emissions', 'Ultra-Fast Charging', '620km Range', 'Autopilot Ready', 'OTA Updates', 'Bi-directional Charging', 'Air Suspension', 'Titanium Frame',
              'Zero Emissions', 'Ultra-Fast Charging', '620km Range', 'Autopilot Ready', 'OTA Updates', 'Bi-directional Charging', 'Air Suspension', 'Titanium Frame'].map((t, i) => (
              <span key={i} className="ticker-item">{t} <span className="ticker-dot">◆</span></span>
            ))}
          </div>
        </div>

        {/* ── MODELS ── */}
        <section className="section" id="models">
          <div className="section-inner">
            <div className="section-label">Our Fleet</div>
            <h2 className="section-title">Choose Your <span className="glow-text">Ether</span></h2>
          </div>
          {/* Snap scroll carousel */}
          <div className="models-carousel" ref={modelScrollRef} onScroll={onModelScroll}>
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
                        <stop offset="0%" stopColor={m.color} stopOpacity="0.3" /><stop offset="100%" stopColor={m.color} stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    <path d="M30 80 Q32 62 55 60 L75 44 Q92 30 125 28 L175 27 Q210 27 225 40 L248 54 Q268 60 270 74 L272 82 Q272 90 262 91 L30 91 Q22 91 22 82 Z" fill={`url(#mg${i})`} stroke={m.color} strokeWidth="1" strokeOpacity="0.6" />
                    <path d="M80 44 Q98 28 127 26 L175 25 Q208 25 222 38 L242 54 L78 54 Z" fill={m.color} fillOpacity="0.15" />
                    {[215, 85].map(cx => (<g key={cx}><circle cx={cx} cy="98" r="16" fill="none" stroke={m.color} strokeWidth="1.5" strokeOpacity="0.7" /><circle cx={cx} cy="98" r="6" fill={m.color} fillOpacity="0.6" /></g>))}
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
          {/* Carousel dots */}
          <div className="carousel-dots">
            {[0, 1, 2].map(i => (
              <button key={i} className={`dot ${modelDot === i ? 'active' : ''}`} onClick={() => scrollToModel(i)} aria-label={`Model ${i + 1}`} />
            ))}
          </div>
        </section>

        {/* ── TECHNOLOGY ── */}
        <section className="section tech-section" id="tech">
          <div className="section-inner">
            <div className="section-label">Under the Hood</div>
            <h2 className="section-title">Engineered for <span className="glow-text">Tomorrow</span></h2>
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

        {/* ── FEATURES ── */}
        <section className="section" id="features">
          <div className="section-inner">
            <div className="section-label">Why Ether</div>
            <h2 className="section-title">Features That <span className="glow-text">Define You</span></h2>
            <div className="features-grid">
              {[
                { icon: '🛡️', title: 'Military-Grade Safety', desc: '5-star NCAP rating. 8 airbags, pre-collision AI braking.' },
                { icon: '📡', title: 'Over-the-Air Updates', desc: 'New features, performance upgrades — delivered wirelessly.' },
                { icon: '🌐', title: 'Charging Network', desc: '8,000+ stations across South Asia. Never worry about range.' },
                { icon: '🎛️', title: '17" Holographic Display', desc: 'Floating touchscreen with ambient lighting and haptics.' },
                { icon: '🔊', title: 'Dolby Atmos Sound', desc: '23-speaker premium surround sound. Concert hall in your car.' },
                { icon: '🌿', title: '100% Carbon Neutral', desc: 'Every Ether EV sold plants 100 trees. Responsibly built.' },
              ].map((f, i) => (
                <div key={i} className="feature-card">
                  <div className="feature-icon-wrap">
                    <span className="feature-icon">{f.icon}</span>
                  </div>
                  <h4 className="feature-title">{f.title}</h4>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
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

        {/* ── TESTIMONIALS ── */}
        <section className="section">
          <div className="section-inner">
            <div className="section-label">Owners Say</div>
            <h2 className="section-title">Real People. <span className="glow-text">Real Stories.</span></h2>
          </div>
          <div className="models-carousel" ref={testScrollRef} onScroll={onTestScroll}>
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
          <div className="carousel-dots">
            {[0, 1, 2].map(i => (
              <button key={i} className={`dot ${testDot === i ? 'active' : ''}`} onClick={() => scrollToTest(i)} aria-label={`Review ${i + 1}`} />
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section" id="contact">
          <div className="cta-glow" />
          <div className="cta-inner">
            <div className="section-label">Get Started</div>
            <h2 className="cta-title">Ready to Go <span className="glow-text">Electric?</span></h2>
            <p className="cta-sub">Join 12,000+ Bangladeshis driving the future. Reserve with ৳10,000 fully refundable deposit.</p>
            <form className="cta-form" onSubmit={e => e.preventDefault()}>
              <input type="text" placeholder="Your Full Name" className="cta-input" />
              <input type="tel" placeholder="Phone Number" className="cta-input" />
              <div className="custom-select-wrap" style={{ gridColumn: '1 / -1' }}>
                <button
                  type="button"
                  className={`custom-select-trigger ${dropdownOpen ? 'open' : ''} ${selectedModel ? 'has-value' : ''}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="cs-left">
                    {selectedModel ? (
                      <>
                        <span className="cs-dot" style={{ background: selectedModel.color }} />
                        <span className="cs-value">{selectedModel.name}</span>
                      </>
                    ) : (
                      <span className="cs-placeholder">Select Your Model</span>
                    )}
                  </span>
                  <span className={`cs-chevron ${dropdownOpen ? 'up' : ''}`}>▾</span>
                </button>
                {dropdownOpen && (
                  <div className="cs-dropdown">
                    {[
                      { name: 'Ether One', tag: 'Entry · ৳ 45L', color: '#00d4ff', range: '480km' },
                      { name: 'Ether Pro', tag: 'Popular · ৳ 72L', color: '#7b2fff', range: '620km', hot: true },
                      { name: 'Ether X', tag: 'Hypercar · ৳ 1.2Cr', color: '#ff6b00', range: '740km' },
                    ].map(m => (
                      <button
                        key={m.name}
                        type="button"
                        className={`cs-option ${selectedModel?.name === m.name ? 'selected' : ''}`}
                        onClick={() => { setSelectedModel(m); setDropdownOpen(false) }}
                      >
                        <span className="cs-opt-dot" style={{ background: m.color, boxShadow: `0 0 8px ${m.color}` }} />
                        <span className="cs-opt-info">
                          <span className="cs-opt-name">{m.name}</span>
                          <span className="cs-opt-tag">{m.tag}</span>
                        </span>
                        <span className="cs-opt-range" style={{ color: m.color }}>{m.range}</span>
                        {m.hot && <span className="cs-hot">★</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button type="submit" className="cta-btn">Reserve My Ether →</button>
            </form>
            <p className="cta-note">No commitment. 100% refundable. Delivery in Q3 2026.</p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="logo">
                <span className="logo-e">Ξ</span>
                <span className="logo-text">ETHER<span className="logo-ev">EV</span></span>
              </div>
              <p className="footer-tagline">Driving Bangladesh forward, one electron at a time.</p>
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
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #03060f; color: #e8eaf6; font-family: 'Inter', sans-serif; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; color: inherit; }
        button { border: none; cursor: pointer; background: none; font-family: inherit; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #03060f; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 2px; }
        ::selection { background: rgba(0,212,255,0.2); color: #00d4ff; }
      `}</style>

      <style jsx>{`
        /* ROOT */
        .root { position: relative; min-height: 100vh; }

        /* AMBIENT */
        .ambient { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .particle { position: absolute; border-radius: 50%; animation: float linear infinite; bottom: -10px; }
        .p0 { width: 3px; height: 3px; background: #00d4ff; opacity: 0.4; }
        .p1 { width: 2px; height: 2px; background: #7b2fff; opacity: 0.3; }
        .p2 { width: 4px; height: 4px; background: #00d4ff; opacity: 0.2; }
        .p3 { width: 2px; height: 2px; background: #39ff14; opacity: 0.3; }
        .p4 { width: 3px; height: 3px; background: #ff6b00; opacity: 0.2; }
        @keyframes float { from { transform: translateY(0) rotate(0deg); opacity: 0.4; } to { transform: translateY(-110vh) rotate(360deg); opacity: 0; } }

        /* ── NAVBAR ── */
        .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 200; padding: 0 1.5rem; transition: all 0.3s; }
        .navbar.scrolled, .navbar.menu-open { background: rgba(3,6,15,0.97); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(0,212,255,0.1); }
        .nav-inner { max-width: 1280px; margin: 0 auto; display: flex; align-items: center; height: 64px; gap: 2rem; }
        .logo { display: flex; align-items: center; gap: 8px; }
        .logo-e { font-size: 1.7rem; color: #00d4ff; filter: drop-shadow(0 0 8px #00d4ff); line-height: 1; }
        .logo-text { font-family: 'Orbitron', monospace; font-size: 1rem; font-weight: 700; letter-spacing: 0.15em; color: #e8eaf6; }
        .logo-ev { color: #00d4ff; }
        .nav-links { display: flex; list-style: none; gap: 2.5rem; margin-left: auto; }
        .nav-links a { font-size: 0.875rem; font-weight: 500; color: rgba(232,234,246,0.7); letter-spacing: 0.04em; transition: color 0.2s; position: relative; padding: 4px 0; }
        .nav-links a::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #00d4ff; transition: width 0.3s; }
        .nav-links a:hover { color: #00d4ff; }
        .nav-links a:hover::after { width: 100%; }
        /* Hamburger — desktop only if needed, hidden on mobile (replaced by bottom nav) */
        .hamburger { display: none; flex-direction: column; justify-content: center; gap: 5px; width: 44px; height: 44px; padding: 10px; flex-shrink: 0; }
        .hamburger span { display: block; width: 22px; height: 2px; background: #e8eaf6; border-radius: 2px; transition: all 0.3s; transform-origin: center; }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .navbar { padding: 0 1rem; }
        }

        /* ── MOBILE BOTTOM NAV ── */
        .bottom-nav { display: none; }
        @media (max-width: 768px) {
          .bottom-nav {
            display: flex;
            position: fixed; bottom: 0; left: 0; right: 0; z-index: 300;
            background: rgba(5,10,25,0.96);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border-top: 1px solid rgba(0,212,255,0.15);
            padding: 6px 0 max(10px, env(safe-area-inset-bottom));
            box-shadow: 0 -8px 40px rgba(0,0,0,0.5);
          }
          .bnav-item {
            flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px;
            padding: 6px 4px; position: relative; text-decoration: none;
            transition: all 0.2s; color: rgba(232,234,246,0.35);
          }
          .bnav-item.active { color: #00d4ff; }
          .bnav-icon { font-size: 1.25rem; line-height: 1; transition: transform 0.2s; }
          .bnav-item.active .bnav-icon { transform: translateY(-2px); filter: drop-shadow(0 0 6px #00d4ff); }
          .bnav-label { font-size: 0.6rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
          .bnav-dot { position: absolute; bottom: 2px; width: 4px; height: 4px; border-radius: 50%; background: #00d4ff; box-shadow: 0 0 6px #00d4ff; }
          /* Page bottom padding so content isn't hidden behind bottom nav */
          .root { padding-bottom: 70px; }
        }

        /* ── HERO ── */
        .hero { position: relative; min-height: 100svh; display: flex; flex-direction: column; justify-content: center; padding-top: 64px; overflow: hidden; }
        .hero-inner { max-width: 1400px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 2rem; padding: 3rem 4rem; }
        .hero-inner::before { content: ''; position: absolute; top: 10%; left: -15%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(0,212,255,0.06), transparent 70%); pointer-events: none; }
        .hero-visual { position: relative; }
        .car-container { position: relative; }
        .car-glow { position: absolute; bottom: 18%; left: 50%; transform: translateX(-50%); width: 55%; height: 32px; background: radial-gradient(ellipse, rgba(0,212,255,0.35), transparent 70%); filter: blur(14px); animation: carGlow 3s ease-in-out infinite; }
        @keyframes carGlow { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        .car-svg { width: 100%; filter: drop-shadow(0 0 20px rgba(0,212,255,0.25)); animation: carFloat 4s ease-in-out infinite; }
        @keyframes carFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .scan-line { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00d4ff, transparent); animation: scan 3s linear infinite; opacity: 0.4; }
        @keyframes scan { from { top: 0; } to { top: 100%; } }
        .hero-content { position: relative; z-index: 2; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border: 1px solid rgba(0,212,255,0.3); border-radius: 999px; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; color: #00d4ff; margin-bottom: 1.25rem; background: rgba(0,212,255,0.05); text-transform: uppercase; }
        .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #00d4ff; flex-shrink: 0; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.5); } }
        .hero-title { font-family: 'Orbitron', monospace; font-size: clamp(2rem, 4.5vw, 4.5rem); font-weight: 900; line-height: 1.08; letter-spacing: -0.02em; color: #e8eaf6; margin-bottom: 1.25rem; }
        .glow-text { color: #00d4ff; text-shadow: 0 0 25px rgba(0,212,255,0.6), 0 0 50px rgba(0,212,255,0.3); }
        .hero-sub { font-size: 1.05rem; color: rgba(232,234,246,0.6); line-height: 1.75; margin-bottom: 2rem; max-width: 440px; }
        .hero-btns { display: flex; gap: 0.875rem; margin-bottom: 2rem; flex-wrap: wrap; }
        .btn-primary { padding: 0.825rem 1.75rem; background: linear-gradient(135deg, #00d4ff, #0085ff); color: #03060f; border-radius: 6px; font-weight: 700; font-size: 0.9rem; transition: all 0.3s; box-shadow: 0 0 25px rgba(0,212,255,0.3); display: inline-block; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 40px rgba(0,212,255,0.5); }
        .btn-ghost { padding: 0.825rem 1.75rem; border: 1px solid rgba(232,234,246,0.2); color: rgba(232,234,246,0.8); border-radius: 6px; font-weight: 500; font-size: 0.9rem; transition: all 0.3s; display: inline-block; }
        .btn-ghost:hover { border-color: rgba(0,212,255,0.4); color: #00d4ff; background: rgba(0,212,255,0.05); }
        .hero-stats { display: flex; align-items: stretch; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; overflow: hidden; width: fit-content; }
        .hstat { padding: 0.875rem 1.25rem; text-align: center; }
        .hstat-val { display: block; font-family: 'Orbitron', monospace; font-size: 1.5rem; font-weight: 700; color: #00d4ff; line-height: 1; }
        .hstat-val small { font-size: 0.8rem; font-family: 'Inter', sans-serif; font-weight: 400; }
        .hstat-label { display: block; font-size: 0.62rem; color: rgba(232,234,246,0.4); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; }
        .hstat-divider { width: 1px; background: rgba(255,255,255,0.08); }
        .hero-scroll { position: absolute; bottom: 1.5rem; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 6px; color: rgba(232,234,246,0.25); font-size: 0.62rem; letter-spacing: 0.15em; text-transform: uppercase; animation: scrollBounce 2.5s ease-in-out infinite; }
        .scroll-line { width: 1px; height: 36px; background: linear-gradient(to bottom, rgba(0,212,255,0.5), transparent); }
        @keyframes scrollBounce { 0%,100% { transform: translateX(-50%) translateY(0); opacity: 0.5; } 50% { transform: translateX(-50%) translateY(6px); opacity: 1; } }

        /* Hero responsive */
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; padding: 2rem 1.5rem 3.5rem; text-align: center; }
          .hero-visual { order: -1; max-width: 440px; margin: 0 auto; width: 100%; }
          .hero-content { display: flex; flex-direction: column; align-items: center; }
          .hero-sub { max-width: 100%; }
          .hero-btns { justify-content: center; }
          .hero-stats { width: 100%; }
          .hstat { flex: 1; }
        }
        @media (max-width: 480px) {
          .hero-inner { padding: 1.5rem 1rem 3rem; }
          .hero-title { font-size: clamp(1.75rem, 8.5vw, 2.8rem); }
          .hero-btns { flex-direction: column; width: 100%; }
          .btn-primary, .btn-ghost { width: 100%; text-align: center; padding: 1rem; font-size: 1rem; border-radius: 10px; }
          .hstat { padding: 0.75rem 0.5rem; }
          .hstat-val { font-size: 1.15rem; }
          .hstat-label { font-size: 0.58rem; }
        }

        /* ── TICKER ── */
        .ticker { background: rgba(0,212,255,0.04); border-top: 1px solid rgba(0,212,255,0.1); border-bottom: 1px solid rgba(0,212,255,0.1); overflow: hidden; padding: 0.65rem 0; }
        .ticker-track { display: flex; animation: ticker 28s linear infinite; width: max-content; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker-item { white-space: nowrap; padding: 0 1.25rem; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; color: rgba(0,212,255,0.65); text-transform: uppercase; }
        .ticker-dot { color: #00d4ff; margin-left: 1.25rem; }

        /* ── SECTIONS ── */
        .section { padding: 5rem 1.5rem; position: relative; z-index: 1; }
        .section-inner { max-width: 1280px; margin: 0 auto; }
        .section-label { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #00d4ff; margin-bottom: 0.75rem; }
        .section-title { font-family: 'Orbitron', monospace; font-size: clamp(1.6rem, 4vw, 3rem); font-weight: 700; line-height: 1.15; color: #e8eaf6; margin-bottom: 2.5rem; }
        @media (max-width: 480px) { .section { padding: 3rem 1rem; } .section-title { margin-bottom: 1.75rem; } }

        /* ── MODEL / TESTIMONIAL CAROUSEL ── */
        .models-carousel {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem; max-width: 1280px; margin: 0 auto; padding: 0 1.5rem;
        }
        @media (max-width: 900px) {
          .models-carousel {
            display: flex;
            overflow-x: scroll;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            gap: 1rem;
            padding: 0.5rem 1.25rem 1rem;
            margin: 0;
          }
          .models-carousel::-webkit-scrollbar { display: none; }
        }

        /* ── CAROUSEL DOTS ── */
        .carousel-dots { display: none; justify-content: center; gap: 8px; margin-top: 1rem; }
        @media (max-width: 900px) { .carousel-dots { display: flex; } }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.15); border: none; cursor: pointer; transition: all 0.3s; padding: 0; }
        .dot.active { width: 24px; border-radius: 4px; background: #00d4ff; box-shadow: 0 0 8px #00d4ff; }

        /* ── MODEL CARDS ── */
        .model-card {
          position: relative; background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 1.5rem;
          transition: all 0.4s; overflow: hidden; scroll-snap-align: center; flex-shrink: 0;
        }
        @media (max-width: 900px) { .model-card { min-width: 78vw; max-width: 340px; } }
        @media (max-width: 480px) { .model-card { min-width: 82vw; padding: 1.25rem; border-radius: 14px; } }
        .model-card:hover { transform: translateY(-5px); border-color: var(--accent); box-shadow: 0 16px 50px rgba(0,0,0,0.5), 0 0 24px color-mix(in srgb, var(--accent) 18%, transparent); }
        .model-card.featured { border-color: rgba(123,47,255,0.5); background: rgba(123,47,255,0.05); }
        .model-badge { position: absolute; top: -1px; right: 1.25rem; background: linear-gradient(135deg,#7b2fff,#00d4ff); color: white; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.08em; padding: 3px 10px; border-radius: 0 0 7px 7px; text-transform: uppercase; }
        .model-tag { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.75rem; }
        .model-car-viz { position: relative; height: 90px; margin: 0.25rem 0 1.25rem; }
        .model-car-glow { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 80%; height: 16px; background: radial-gradient(ellipse, var(--accent), transparent 70%); opacity: 0.25; filter: blur(7px); }
        .model-car-icon { width: 100%; height: 100%; }
        .model-name { font-family: 'Orbitron', monospace; font-size: 1.2rem; font-weight: 700; color: #e8eaf6; margin-bottom: 0.4rem; }
        .model-desc { font-size: 0.825rem; color: rgba(232,234,246,0.5); line-height: 1.55; margin-bottom: 1.25rem; }
        .model-specs { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.5rem; margin-bottom: 1.25rem; padding: 0.875rem; background: rgba(0,0,0,0.25); border-radius: 8px; }
        .spec-val { font-family: 'Orbitron', monospace; font-size: 0.9rem; font-weight: 700; color: var(--accent); }
        .spec-key { font-size: 0.6rem; color: rgba(232,234,246,0.4); text-transform: uppercase; letter-spacing: 0.07em; margin-top: 2px; }
        .model-btn { display: block; text-align: center; padding: 0.7rem; border: 1px solid var(--accent); color: var(--accent); border-radius: 8px; font-weight: 600; font-size: 0.85rem; transition: all 0.3s; }
        .model-btn:hover { background: var(--accent); color: #03060f; }

        /* ── TECH ── */
        .tech-section { background: radial-gradient(ellipse at 70% 50%, rgba(0,212,255,0.04), transparent 60%); }
        .tech-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: center; }
        @media (max-width: 900px) { .tech-grid { grid-template-columns: 1fr; gap: 2.5rem; } }
        .tech-visual { display: flex; justify-content: center; }
        .battery-viz { position: relative; display: flex; align-items: center; justify-content: center; padding: 40px; }
        .battery-outer { width: 200px; height: 200px; border: 2px solid rgba(0,212,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative; z-index: 2; background: rgba(0,212,255,0.03); }
        @media (max-width: 480px) { .battery-outer { width: 160px; height: 160px; } }
        .battery-cells { position: absolute; inset: 0; border-radius: 50%; overflow: hidden; }
        .battery-cell { position: absolute; width: 100%; height: 12.5%; left: 0; animation: chargeCell 2.2s ease-in-out infinite; }
        .battery-cell:nth-child(1) { top: 0%; background: linear-gradient(90deg,transparent,rgba(0,212,255,0.4),transparent); }
        .battery-cell:nth-child(2) { top: 12.5%; background: linear-gradient(90deg,transparent,rgba(0,212,255,0.35),transparent); }
        .battery-cell:nth-child(3) { top: 25%; background: linear-gradient(90deg,transparent,rgba(0,212,255,0.3),transparent); }
        .battery-cell:nth-child(4) { top: 37.5%; background: linear-gradient(90deg,transparent,rgba(0,212,255,0.25),transparent); }
        .battery-cell:nth-child(5) { top: 50%; background: linear-gradient(90deg,transparent,rgba(0,212,255,0.2),transparent); }
        .battery-cell:nth-child(6) { top: 62.5%; background: linear-gradient(90deg,transparent,rgba(0,212,255,0.15),transparent); }
        .battery-cell:nth-child(7) { top: 75%; background: linear-gradient(90deg,transparent,rgba(0,212,255,0.1),transparent); }
        .battery-cell:nth-child(8) { top: 87.5%; background: linear-gradient(90deg,transparent,rgba(0,212,255,0.07),transparent); }
        @keyframes chargeCell { 0%,100% { opacity: 0.4; transform: scaleX(0.7); } 50% { opacity: 1; transform: scaleX(1); } }
        .battery-label { font-family: 'Orbitron', monospace; font-size: 1.25rem; font-weight: 700; color: #00d4ff; text-align: center; line-height: 1.4; z-index: 1; }
        .battery-label small { font-size: 0.58rem; font-family: 'Inter', sans-serif; color: rgba(0,212,255,0.6); font-weight: 400; display: block; }
        .tech-rings { position: absolute; inset: 0; pointer-events: none; }
        .ring { position: absolute; border-radius: 50%; border: 1px solid rgba(0,212,255,0.12); animation: ringPulse 3s ease-in-out infinite; }
        .r1 { inset: 40px; } .r2 { inset: 20px; animation-delay: 0.5s; } .r3 { inset: 0; animation-delay: 1s; }
        @keyframes ringPulse { 0%,100% { opacity: 0.12; } 50% { opacity: 0.35; } }
        .tech-content { display: flex; flex-direction: column; gap: 1.25rem; }
        .tech-item { display: flex; gap: 1rem; padding: 1.125rem; border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; transition: all 0.3s; }
        .tech-item:hover { border-color: rgba(0,212,255,0.28); background: rgba(0,212,255,0.03); }
        .tech-icon { font-size: 1.4rem; flex-shrink: 0; width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: rgba(0,212,255,0.08); border-radius: 8px; }
        .tech-title { font-weight: 600; font-size: 0.9rem; color: #e8eaf6; margin-bottom: 0.25rem; }
        .tech-desc { font-size: 0.825rem; color: rgba(232,234,246,0.5); line-height: 1.6; }

        /* ── FEATURES ── */
        .features-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.25rem; }
        @media (max-width: 900px) { .features-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 480px) { .features-grid { grid-template-columns: 1fr 1fr; gap: 0.875rem; } }
        .feature-card { padding: 1.5rem 1.25rem; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; transition: all 0.3s; background: rgba(255,255,255,0.01); }
        .feature-card:hover { border-color: rgba(0,212,255,0.25); background: rgba(0,212,255,0.03); transform: translateY(-3px); }
        @media (max-width: 480px) { .feature-card { padding: 1.125rem 1rem; border-radius: 12px; } }
        .feature-icon-wrap { width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,212,255,0.03)); border: 1px solid rgba(0,212,255,0.12); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
        @media (max-width: 480px) { .feature-icon-wrap { width: 38px; height: 38px; margin-bottom: 0.75rem; } }
        .feature-icon { font-size: 1.4rem; }
        @media (max-width: 480px) { .feature-icon { font-size: 1.2rem; } }
        .feature-title { font-weight: 600; font-size: 0.875rem; color: #e8eaf6; margin-bottom: 0.4rem; }
        @media (max-width: 480px) { .feature-title { font-size: 0.8rem; } }
        .feature-desc { font-size: 0.8rem; color: rgba(232,234,246,0.5); line-height: 1.6; }
        @media (max-width: 480px) { .feature-desc { font-size: 0.75rem; line-height: 1.5; } }

        /* ── STATS BAR ── */
        .stats-bar { display: grid; grid-template-columns: repeat(4,1fr); background: linear-gradient(135deg,rgba(0,212,255,0.07),rgba(123,47,255,0.07)); border-top: 1px solid rgba(0,212,255,0.12); border-bottom: 1px solid rgba(0,212,255,0.12); }
        @media (max-width: 640px) {
          .stats-bar { grid-template-columns: repeat(2,1fr); }
          .stat-item:nth-child(2) { border-right: none; }
          .stat-item:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.06); }
          .stat-item:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.06); border-right: none; }
        }
        .stat-item { padding: 2rem 1.25rem; text-align: center; border-right: 1px solid rgba(255,255,255,0.06); }
        .stat-item:last-child { border-right: none; }
        .stat-val { font-family: 'Orbitron', monospace; font-size: clamp(1.3rem, 3vw, 2rem); font-weight: 700; color: #00d4ff; margin-bottom: 0.2rem; }
        .stat-label { font-size: 0.7rem; color: rgba(232,234,246,0.45); text-transform: uppercase; letter-spacing: 0.07em; }

        /* ── TESTIMONIAL CARDS (reuse carousel) ── */
        .testimonial-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 1.5rem; scroll-snap-align: center; flex-shrink: 0; }
        @media (max-width: 900px) { .testimonial-card { min-width: 78vw; max-width: 340px; } }
        @media (max-width: 480px) { .testimonial-card { min-width: 82vw; padding: 1.25rem; } }
        .stars { color: #fbbf24; font-size: 1rem; margin-bottom: 0.875rem; letter-spacing: 2px; }
        .testimonial-text { font-size: 0.875rem; color: rgba(232,234,246,0.7); line-height: 1.7; margin-bottom: 1.25rem; font-style: italic; }
        .testimonial-author { display: flex; align-items: center; gap: 0.75rem; }
        .author-avatar { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg,#00d4ff,#7b2fff); display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; font-size: 0.95rem; flex-shrink: 0; }
        .author-name { font-weight: 600; font-size: 0.85rem; color: #e8eaf6; }
        .author-role { font-size: 0.7rem; color: rgba(232,234,246,0.4); }

        /* ── CTA ── */
        .cta-section { position: relative; padding: 5rem 1.5rem; text-align: center; overflow: hidden; }
        .cta-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: min(600px,100%); height: 400px; background: radial-gradient(circle,rgba(0,212,255,0.06),transparent 70%); pointer-events: none; }
        .cta-inner { position: relative; z-index: 1; max-width: 580px; margin: 0 auto; }
        .cta-title { font-family: 'Orbitron', monospace; font-size: clamp(1.6rem, 4vw, 3rem); font-weight: 700; line-height: 1.1; color: #e8eaf6; margin-bottom: 1.25rem; }
        .cta-sub { font-size: clamp(0.875rem,2vw,1rem); color: rgba(232,234,246,0.6); line-height: 1.75; margin-bottom: 2rem; }
        .cta-form { display: grid; grid-template-columns: 1fr 1fr; gap: 0.875rem; margin-bottom: 0.875rem; }
        @media (max-width: 560px) { .cta-form { grid-template-columns: 1fr; } }
        .cta-input { padding: 0.875rem 1.125rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #e8eaf6; font-size: 0.95rem; outline: none; transition: border-color 0.3s; width: 100%; -webkit-appearance: none; }
        .cta-input::placeholder { color: rgba(232,234,246,0.3); }
        .cta-input:focus { border-color: rgba(0,212,255,0.5); background: rgba(0,212,255,0.03); }
        .cta-select { cursor: pointer; }

        /* ── CUSTOM SELECT ── */
        .custom-select-wrap { position: relative; }
        .custom-select-trigger {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          padding: 0.875rem 1.125rem; cursor: pointer;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; color: rgba(232,234,246,0.35); font-size: 0.95rem;
          transition: all 0.25s; text-align: left;
        }
        .custom-select-trigger:hover,
        .custom-select-trigger.open { border-color: rgba(0,212,255,0.5); background: rgba(0,212,255,0.04); }
        .custom-select-trigger.has-value { color: #e8eaf6; }
        .cs-left { display: flex; align-items: center; gap: 10px; }
        .cs-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .cs-placeholder { color: rgba(232,234,246,0.3); }
        .cs-value { font-weight: 500; color: #e8eaf6; }
        .cs-chevron { font-size: 1.1rem; color: rgba(232,234,246,0.4); transition: transform 0.25s; line-height: 1; }
        .cs-chevron.up { transform: rotate(180deg); color: #00d4ff; }
        .cs-dropdown {
          position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 50;
          background: rgba(8,14,30,0.98); border: 1px solid rgba(0,212,255,0.2);
          border-radius: 10px; overflow: hidden;
          box-shadow: 0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,212,255,0.05);
          animation: dropIn 0.18s ease;
        }
        @keyframes dropIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .cs-option {
          width: 100%; display: flex; align-items: center; gap: 12px;
          padding: 0.875rem 1.125rem; cursor: pointer; text-align: left;
          background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.2s; position: relative;
        }
        .cs-option:last-child { border-bottom: none; }
        .cs-option:hover { background: rgba(0,212,255,0.06); }
        .cs-option.selected { background: rgba(0,212,255,0.08); }
        .cs-option.selected::before { content: '✓'; position: absolute; right: 1rem; color: #00d4ff; font-size: 0.8rem; }
        .cs-opt-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .cs-opt-info { display: flex; flex-direction: column; gap: 2px; flex: 1; }
        .cs-opt-name { font-family: 'Orbitron', monospace; font-size: 0.85rem; font-weight: 600; color: #e8eaf6; }
        .cs-opt-tag { font-size: 0.7rem; color: rgba(232,234,246,0.4); }
        .cs-opt-range { font-family: 'Orbitron', monospace; font-size: 0.8rem; font-weight: 600; flex-shrink: 0; }
        .cs-hot { position: absolute; top: 8px; right: 28px; font-size: 0.65rem; color: #7b2fff; }
        .cta-btn { grid-column: 1/-1; padding: 1rem; background: linear-gradient(135deg,#00d4ff,#0062ff); color: #03060f; border-radius: 8px; font-weight: 700; font-size: 1rem; letter-spacing: 0.03em; transition: all 0.3s; box-shadow: 0 0 28px rgba(0,212,255,0.28); cursor: pointer; border: none; width: 100%; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 0 45px rgba(0,212,255,0.45); }
        .cta-btn:active { transform: translateY(0); }
        .cta-note { font-size: 0.775rem; color: rgba(232,234,246,0.28); margin-top: 0.875rem; }
        @media (max-width: 480px) { .cta-section { padding: 3rem 1rem; } }

        /* ── FOOTER ── */
        .footer { background: rgba(0,0,0,0.5); border-top: 1px solid rgba(255,255,255,0.06); padding: 3.5rem 1.5rem 1.5rem; }
        .footer-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: 1.4fr 2fr; gap: 3.5rem; margin-bottom: 2.5rem; }
        @media (max-width: 768px) { .footer-inner { grid-template-columns: 1fr; gap: 2rem; } }
        .footer-tagline { font-size: 0.85rem; color: rgba(232,234,246,0.4); line-height: 1.7; margin: 0.875rem 0 1.25rem; max-width: 280px; }
        .footer-socials { display: flex; gap: 0.625rem; }
        .social-btn { width: 40px; height: 40px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 0.875rem; color: rgba(232,234,246,0.5); transition: all 0.3s; }
        .social-btn:hover { border-color: #00d4ff; color: #00d4ff; }
        .footer-links { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; }
        .footer-col { display: flex; flex-direction: column; gap: 0.7rem; }
        .footer-col h5 { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(232,234,246,0.35); margin-bottom: 0.25rem; }
        .footer-col a { font-size: 0.85rem; color: rgba(232,234,246,0.55); transition: color 0.2s; padding: 2px 0; display: block; }
        .footer-col a:hover { color: #00d4ff; }
        .footer-bottom { max-width: 1280px; margin: 0 auto; padding-top: 1.25rem; border-top: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: center; font-size: 0.775rem; color: rgba(232,234,246,0.28); flex-wrap: wrap; gap: 0.5rem; }
        @media (max-width: 480px) { .footer-bottom { flex-direction: column; text-align: center; gap: 0.35rem; } }
      `}</style>
    </>
  )
}

export default function Home() {
  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero-section" id="hero">
        <div className="bg-watermark">GC 2026</div>
        <div className="bg-sen-outline">GC</div>

        <div className="ticker-top">
          <div className="ticker-track">
            {Array.from({ length: 11 }).map((_, i) => (
              <span key={i} className="ticker-text">GC 2026</span>
            ))}
          </div>
        </div>

        <div className="main-title">
          <h1>GC 2026</h1>
        </div>

        <div className="left-info">
          <div className="valorant-logo">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4l10 16h4L6 4H2zm10 0l10 16h-4L8 4h4z" fill="white" />
            </svg>
            <span className="valorant-text">GET READY FOR</span>
          </div>
          <div className="first-strike">GC SEASON 3</div>
        </div>

        <div className="right-info">
          <div className="begins-text">COMING IN</div>
          <div className="tomorrow-text">JANUARY</div>
        </div>

        <div className="character">
          <img src="https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/fullportrait.png" alt="Phoenix" />
        </div>

        <div className="ticker-bottom">
          <div className="ticker-track">
            {Array.from({ length: 11 }).map((_, i) => (
              <span key={i} className="ticker-text">GC 2026</span>
            ))}
          </div>
        </div>

        <div className="fire-container">
          <div className="smoke"></div>
          <div className="flames"></div>
          <div className="fire-glow"></div>
          <div className="embers">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="ember"></div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION and previous winners*/}
     
    </div>
  );
}
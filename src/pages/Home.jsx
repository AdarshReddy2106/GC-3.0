import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/home.css';
import TeamsScroll from '../components/TeamsScroll';
import ScrollReveal from '../components/ScrollReveal';
import SplitText from '../components/splittext';

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="hero-section" id="hero">
      {/* Background watermarks */}
      <div className="bg-watermark">GC 2026</div>
      <div className="bg-sen-outline">GC</div>

      {/* Top ticker */}
      <div className="ticker-top">
        <div className="ticker-track">
          {[...Array(11)].map((_, i) => (
            <span key={i} className="ticker-text">GC 2026</span>
          ))}
        </div>
      </div>

      {/* Main title */}
      <div className="main-title">
        {/* <h1>GC 2026</h1> */}
      </div>

      {/* Left info */}
      <div className="left-info">
        <div className="valorant-logo">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4l10 16h4L6 4H2zm10 0l10 16h-4L8 4h4z" fill="white"/>
          </svg>
          <SplitText
            text="GET READY FOR"
            className="valorant-text"
            delay={50}
            duration={0.5}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.3}
            rootMargin="-50px"
          />
        </div>
        <SplitText
          text="GC SEASON 3"
          className="first-strike"
          delay={80}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.3}
          rootMargin="-50px"
        />
      </div>

      {/* Right info */}
      <div className="right-info">
        <SplitText
          text="STARTS"
          className="begins-text"
          delay={50}
          duration={0.5}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.3}
          rootMargin="-50px"
        />
        <SplitText
          text="JANUARY 30"
          className="tomorrow-text"
          delay={80}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.3}
          rootMargin="-50px"
        />
      </div>

      {/* Character */}
      <div className="character">
        <img src="/logo.png" alt="Phoenix" />
      </div>

      {/* Bottom ticker */}
      <div className="ticker-bottom">
        <div className="ticker-track">
          {[...Array(11)].map((_, i) => (
            <span key={i} className="ticker-text">GC 2026</span>
          ))}
        </div>
      </div>

      {/* Fire effect */}
      <div className="fire-container">
        <div className="smoke"></div>
        <div className="flames"></div>
        <div className="fire-glow"></div>
        <div className="embers">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="ember"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      {/* About Hero */}
      <div className="about-hero">
        <div className="about-hero-bg"></div>
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <SplitText
            text="THE LEGACY"
            className="about-tag"
            delay={50}
            duration={0.4}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-100px"
            textAlign="center"
          />
          <SplitText
            text="ABOUT THE GENERAL CHAMPIONSHIP 2026"
            className="about-main-title"
            delay={80}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>
      </div>

      {/* About Content */}
      <div className="about-content-area">
        <div className="about-grid">
          <div className="about-text-side">
            <ScrollReveal
              delay={0.2}
              duration={0.8}
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.3}
            >
              <p className="about-description">
                The General Championship, first held in 2024, is one of the newest and most exciting traditions in our institution. It fosters resilience, leadership, discipline, and camaraderie among students across all departments. Over the years, the spirit of the championship has endured, representing youthful energy, excellence, and the shared vision of building a stronger community.
              </p>
            </ScrollReveal>
            
            <ScrollReveal
              delay={0.4}
              duration={0.8}
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.3}
            >
              <p className="about-description">
                The General Championship is an eagerly anticipated annual sports tournament. Typically organized in the academic year, it brings together athletes from different backgrounds, making it a highlight on the academic calendar. The championship celebrates not just athletic prowess, but the values of teamwork, sportsmanship, and the relentless pursuit of greatness.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

// Featured Sports Section Component
const FeaturedSportsSection = () => {
  const sports = [
    {
      id: 1,
      name: 'CRICKET',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80'
    },
    {
      id: 2,
      name: 'FOOTBALL',
      image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80'
    },
    {
      id: 3,
      name: 'BASKETBALL',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80'
    },
    {
      id: 4,
      name: 'BADMINTON',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&q=80'
    },
    {
      id: 5,
      name: 'TABLE TENNIS',
      image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=600&q=80'
    },
    {
      id: 6,
      name: 'VOLLEYBALL',
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80'
    },
    {
      id: 7,
      name: 'ATHLETICS',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80'
    },
    {
      id: 8,
      name: 'SWIMMING',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&q=80'
    },
    {
      id: 9,
      name: 'CHESS',
      image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&q=80'
    }
  ];

  return (
    <section className="featured-sports-section" id="sports">
      <div className="featured-sports-container">
        <div className="featured-sports-header">
          <SplitText
            text="COMPETITION"
            className="featured-sports-tag"
            delay={50}
            duration={0.4}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-100px"
            textAlign="center"
          />
          <SplitText
            text="FEATURED SPORTS"
            className="featured-sports-title"
            delay={80}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-100px"
            textAlign="center"
          />
          <ScrollReveal
            delay={0.3}
            duration={0.8}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
          >
            <p className="featured-sports-description">
              Elite participants from across all departments competing in multiple headline events for the championship trophy.
            </p>
          </ScrollReveal>
        </div>

        <div className="featured-sports-grid">
          {sports.map((sport) => (
            <div key={sport.id} className="sport-card">
              <div className="sport-card-image" style={{ backgroundImage: `url(${sport.image})` }}>
                <div className="sport-card-overlay"></div>
                <div className="sport-card-number">{String(sport.id).padStart(2, '0')}</div>
                <h3 className="sport-card-name">{sport.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Previous Winners Section Component
const PreviousWinnersSection = () => {
  const [selectedYear, setSelectedYear] = React.useState('2025');

  const winnersData = {
    '2025': {
      podium: [
        { rank: 2, team: 'TEAM ALPHA', points: 285 },
        { rank: 1, team: 'TEAM PHOENIX', points: 320 },
        { rank: 3, team: 'TEAM SIGMA', points: 270 }
      ]
    },
    '2024': {
      podium: [
        { rank: 2, team: 'TEAM SIGMA', points: 295 },
        { rank: 1, team: 'TEAM ALPHA', points: 310 },
        { rank: 3, team: 'TEAM DELTA', points: 280 }
      ]
    }
  };

  const currentData = winnersData[selectedYear];

  return (
    <section className="previous-winners-section" id="winners">
      <div className="winners-container">
        <div className="winners-header">
          <SplitText
            text="HALL OF FAME"
            className="winners-tag"
            delay={50}
            duration={0.4}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-100px"
            textAlign="center"
          />
          <SplitText
            text="PREVIOUS CHAMPIONS"
            className="winners-title"
            delay={80}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>

        <div className="year-filter">
          <button 
            className={selectedYear === '2025' ? 'active' : ''} 
            onClick={() => setSelectedYear('2025')}
          >
            2025
          </button>
          <button 
            className={selectedYear === '2024' ? 'active' : ''} 
            onClick={() => setSelectedYear('2024')}
          >
            2024
          </button>
        </div>

        <div className="podium-container">
          {currentData.podium.map((winner) => (
            <div key={winner.rank} className="podium-place">
              <div className="podium-card">
                <div className="podium-rank">{winner.rank}</div>
                <div className="podium-team-name">{winner.team}</div>
                <div className="podium-points">
                  <span>{winner.points}</span> POINTS
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">GC 2026</div>
            <p className="footer-description">
              The premier inter-department sports championship celebrating athletic excellence, 
              teamwork, and competitive spirit at IIT Palakkad.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="footer-social-link">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5"/>
                </svg>
              </a>
              <a href="#" className="footer-social-link">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#000"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">QUICK LINKS</h4>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/schedule" className="footer-link">Schedule</Link>
            <Link to="/leaderboard" className="footer-link">Leaderboard</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">SPORTS</h4>
            <a href="#" className="footer-link">Cricket</a>
            <a href="#" className="footer-link">Football</a>
            <a href="#" className="footer-link">Basketball</a>
            <a href="#" className="footer-link">Badminton</a>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">CONTACT</h4>
            <a href="tel:+918977276836" className="footer-link">+91 8977276836</a>
            <a href="mailto:sec_sports@smail.iitpkd.ac.in" className="footer-link">sec_sports@smail.iitpkd.ac.in</a>
            <a href="#" className="footer-link">IIT Palakkad, Kerala</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2026 GC Season 3. All rights reserved.
          </div>
          <div className="footer-links">
            <a href="#" className="footer-bottom-link">Privacy Policy</a>
            <a href="#" className="footer-bottom-link">Terms of Service</a>
            <a href="#" className="footer-bottom-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <HeroSection />
      <TeamsScroll />
      <AboutSection />
      <FeaturedSportsSection />
      <PreviousWinnersSection />
      <Footer />
    </div>
  );
};

export default Home;

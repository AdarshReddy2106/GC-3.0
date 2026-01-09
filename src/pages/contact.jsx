import Shuffle from '../components/Shuffle';

export default function Contact() {
  return (
    <div className="contact-page">
      <section className="contact-section">
        <div className="contact-container">
          <div className="section-header">
            <Shuffle 
              text="LET'S CONNECT"
              tag="h2"
              className="contact-shuffle-title"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              shuffleDirection="right"
              duration={0.5}
              shuffleTimes={3}
              stagger={0.04}
              scrambleCharset="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%"
              colorFrom="#e11d48"
              colorTo="#ffffff"
              threshold={0.3}
              triggerOnce={true}
              triggerOnHover={false}
            />
            <p className="section-subtitle">Reach out to us for any inquiries or collaboration</p>
          </div>

          <div className="contact-layout">
            {/* Left Side - Contact Info */}
            <div className="contact-left">
              {/* Social Links at Top */}
              <div className="social-section">
                <h4 className="social-title">FOLLOW US</h4>
                <div className="social-links">
                  <a href="#" className="social-link facebook">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a href="#" className="social-link instagram">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
                  </a>
                  <a href="#" className="social-link youtube">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#000"/></svg>
                  </a>
                </div>
              </div>

              {/* Contact Info Cards */}
              <div className="contact-info-wrapper">
                <div className="info-card">
                  <div className="info-card-header">
                    <div className="info-icon">📍</div>
                    <h4 className="info-title">LOCATION</h4>
                  </div>
                  <p className="info-content">Indian Institute of Technology Palakkad, Kanjikode, Kerala 678623</p>
                </div>

                <div className="info-card">
                  <div className="info-card-header">
                    <div className="info-icon">📞</div>
                    <h4 className="info-title">PHONE</h4>
                  </div>
                  <p className="info-content">+91 8977276836</p>
                </div>

                <div className="info-card">
                  <div className="info-card-header">
                    <div className="info-icon">✉️</div>
                    <h4 className="info-title">EMAIL</h4>
                  </div>
                  <p className="info-content">sec_sports@smail.iitpkd.ac.in</p>
                </div>
              </div>
            </div>

            {/* Right Side - Map */}
            <div className="contact-right">
              <div className="map-section">
                <div className="map-header">
                  <h3>FIND <span>US</span></h3>
                </div>
                <div className="map-container">
                  <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.4!2d76.4767!3d10.7783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba86f15a8c3ad61%3A0xc59687a20d43a244!2sIIT%20Palakkad%20Nila%20Campus!5e0!3m2!1sen!2sin!4v1736428800000!5m2!1sen!2sin" width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  <div className="map-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );    
}
import { useEffect, useRef } from 'react';
import '../styles/TeamsScroll.css';

const teams = [
  { name: 'Bulls', logo: '/Bulls.png' },
  { name: 'Eagles', logo: '/Eagles.png' },
  { name: 'Lions', logo: '/Lions.png' },
  { name: 'Panthers', logo: '/Panthers.png' },
  { name: 'Rhinos', logo: '/Rhinos.png' },
  { name: 'Sharks', logo: '/Sharks.png' },
  { name: 'Tigers', logo: '/Tigers .png' },
  { name: 'Wolfs', logo: '/Wolfs.png' },
];

export default function TeamsScroll() {
  return (
    <section className="teams-scroll-section">
      <div className="teams-scroll-container">
        <div className="teams-scroll-track">
          {/* Render teams twice for seamless loop */}
          {[...teams, ...teams].map((team, index) => (
            <div key={index} className="team-card">
              <div className="team-logo-wrapper">
                <img src={team.logo} alt={team.name} className="team-logo" />
              </div>
              <h3 className="team-name">{team.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

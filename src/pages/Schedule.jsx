import React, { useState } from 'react';
import { scheduleData } from '../data';
import { getTeamColor } from '../TeamColors';
import '../styles/Schedule.css';

const Schedule = () => {
  const [activeSport, setActiveSport] = useState('Football');
  const sports = Object.keys(scheduleData);

  return (
    <div className="schedule-container">
      <h1 className="schedule-title">Match Schedule</h1>
      
      {/* Sport Selector */}
      <div className="sport-selector">
        {sports.map(sport => (
          <button
            key={sport}
            onClick={() => setActiveSport(sport)}
            className={`sport-btn ${activeSport === sport ? 'active' : ''}`}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* Matches List */}
      <div className="matches-container">
        {scheduleData[activeSport].map((match, index) => (
          <div key={index} className="match-card">
            {/* Header: Date & Venue */}
            <div className="match-header">
              <span className="match-number">Match #{match.match_no}</span>
              <span className="match-info">{match.date} • {match.venue}</span>
            </div>
            
            {/* Match Content */}
            <div className="match-body">
              
              {/* Team 1 */}
              <div className="team-box" style={{ background: `linear-gradient(to right, ${getTeamColor(match.team1).replace('from-', '').replace('to-', '').split(' ').map(c => c.replace(/\[(.+?)\]/g, '$1')).join(', ')})` }}>
                <span className="team-name">{match.team1}</span>
              </div>

              {/* VS / Time / Score */}
              <div className="vs-section">
                {match.score ? (
                   <div className="score-display">{match.score}</div>
                ) : (
                   <div className="vs-text">VS</div>
                )}
                <div className="match-time">{match.time}</div>
              </div>

              {/* Team 2 */}
              <div className="team-box" style={{ background: `linear-gradient(to left, ${getTeamColor(match.team2).replace('from-', '').replace('to-', '').split(' ').map(c => c.replace(/\[(.+?)\]/g, '$1')).join(', ')})` }}>
                <span className="team-name">{match.team2}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
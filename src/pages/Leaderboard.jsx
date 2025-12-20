import React, { useState } from 'react';
import { leaderboardData } from '../data';
import { getTeamColor } from '../TeamColors';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [activeSport, setActiveSport] = useState('Football');
  const sports = Object.keys(leaderboardData);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      
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

      {/* Tables Container */}
      <div className="tables-container">
        {Object.entries(leaderboardData[activeSport]).map(([poolName, rows]) => (
          <div key={poolName} className="pool-table">
            <div className="pool-header">
              <h2 className="pool-name">{poolName}</h2>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="standings-table">
                <thead>
                  <tr>
                    <th>Team</th>
                    <th>P</th>
                    <th>W</th>
                    <th>L</th>
                    <th>Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="team-cell">
                          <div className="team-indicator" style={{ background: `linear-gradient(to bottom right, ${getTeamColor(row.TEAM).replace('from-', '').replace('to-', '').split(' ').map(c => c.replace(/\[(.+?)\]/g, '$1')).join(', ')})` }}></div>
                          <span className="team-name-cell">{row.TEAM}</span>
                        </div>
                      </td>
                      <td>{row.MP || row["MATCH PLAYED"]}</td>
                      <td>{row.MW || row["MATCH WON"]}</td>
                      <td>{row.ML || row["MATCH LOST"]}</td>
                      <td className="points-cell">{row.POINT || row.POINTS}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
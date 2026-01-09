import { useEffect, useState } from "react";
import "../styles/Leaderboard.css";

const sports = [
  { key: "chess", label: "Chess", icon: "/icons/chess.svg" },
  { key: "athletics", label: "Athletics", icon: "/icons/athletics.svg" },
  { key: "basketball", label: "Basketball", icon: "/icons/basketball.svg" },
  { key: "volleyball", label: "Volleyball", icon: "/icons/volleyball.svg" },
  { key: "badminton", label: "Badminton", icon: "/icons/badminton.svg" },
  { key: "tabletennis", label: "Table Tennis", icon: "/icons/tabletennis.svg" },
  { key: "cricket", label: "Cricket", icon: "/icons/cricket.svg" },
  { key: "football", label: "Football", icon: "/icons/football.svg" }
];

function Sidebar({ selectedSport, onSelect }) {
  return (
    <div className="sidebar">
      <div className="sidebar-title">GC 2026 RESULTS</div>
      <div className="sidebar-subtitle">Live Standings</div>
      <div className="sidebar-sports">
        {sports.map(s => (
          <div
            key={s.key}
            className={`sidebar-sport${selectedSport === s.key ? " selected" : ""}`}
            onClick={() => onSelect(s.key)}
          >
            <span className="sport-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}



export default function Leaderboard() {
  const [sport, setSport] = useState("volleyball");
  const [gender, setGender] = useState("men");
  const [columns, setColumns] = useState([]);
  const [pools, setPools] = useState({});

  useEffect(() => {
    fetch(`https://gc-backend-9bj6.onrender.com/api/${sport}/leaderboard/${gender}`)
      .then(res => res.json())
      .then(data => {
        setColumns(data.columns || []);
        setPools(data.pools || {});
      });
  }, [sport, gender]);

  const noGenderFilterSports = ["chess", "football", "cricket"];

  return (
    <>
      <Sidebar selectedSport={sport} onSelect={setSport} />
      <div className="page">
        <h1>Leaderboard</h1>
        
        {!noGenderFilterSports.includes(sport) && (
          <div className="tabs">
            <button className={gender === "men" ? "active" : ""} onClick={() => setGender("men")}>Men</button>
            <button className={gender === "women" ? "active" : ""} onClick={() => setGender("women")}>Women</button>
          </div>
        )}

        <div className="leaderboard-section">
          {Object.entries(pools).map(([pool, rows]) => (
            <div key={pool}>
              <h2>Pool {pool}</h2>
              <table className="leaderboard">
                <thead>
                  <tr>
                    <th style={{width: "80px"}}>Rank</th>
                    {columns.map(c => <th key={c.key}>{c.label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i}>
                      <td>
                        {i + 1}
                      </td>
                      {columns.map(c => (
                        <td key={c.key}>
                          {r[c.key] !== undefined
                            ? r[c.key]
                            : r[c.key.toUpperCase()] !== undefined
                              ? r[c.key.toUpperCase()]
                              : r[c.label] !== undefined
                                ? r[c.label]
                                : "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
import { useEffect, useState } from "react";
import "../styles/Schedule.css";

const sports = [
  { key: "full", label: "Full Schedule", icon: "" },
  { key: "chess", label: "Chess", icon: "/icons/chess.svg" },
  { key: "athletics", label: "Athletics", icon: "/icons/athletics.svg" },
  { key: "basketball", label: "Basketball", icon: "/icons/basketball.svg" },
  { key: "volleyball", label: "Volleyball", icon: "/icons/volleyball.svg" },
  { key: "badminton", label: "Badminton", icon: "/icons/badminton.svg" },
  { key: "tabletennis", label: "Table Tennis", icon: "/icons/tabletennis.svg" },
  { key: "cricket", label: "Cricket", icon: "/icons/cricket.svg" },
  { key: "football", label: "Football", icon: "/icons/football.svg" }
];

const menOnlySports = ["chess", "football", "cricket"];

function formatDate(dateStr) {
  if (!dateStr || dateStr === "TBA") return "TBA";
  // Simple Date Formatting
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj)) return dateStr;
  
  return dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).toUpperCase();
}

function isPlaceholderMatch(m) {
  const teamA = (m.TeamA || "").toUpperCase().replace(/\s/g, "");
  const teamB = (m.TeamB || "").toUpperCase().replace(/\s/g, "");
  return teamA === "TEAMI" && teamB === "TEAMII";
}

function groupMatchesByDate(matches) {
  const grouped = {};
  matches.forEach(m => {
    const date = m.Date || "TBA";
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(m);
  });
  return grouped;
}

export default function Schedule() {
  const [sport, setSport] = useState("full");
  const [gender, setGender] = useState("men");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const noGenderFilterSports = ["chess", "football", "cricket"];

  // For full schedule
  const [fullSchedule, setFullSchedule] = useState({});
  const [fullDates, setFullDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (sport === "full") return;
    setError(null);
    // Force men gender for sports that don't have women's category
    const effectiveGender = noGenderFilterSports.includes(sport) ? "men" : gender;
    fetch(`https://gc-backend-9bj6.onrender.com/api/${sport}/schedule/${effectiveGender}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch schedule");
        return res.json();
      })
      .then(data => setMatches(data))
      .catch(err => setError(err.message));
  }, [sport, gender]);

  useEffect(() => {
    if (sport !== "full") return;
    setError(null);
    const fetches = sports
      .filter(s => s.key !== "full")
      .map(s => {
        const g = menOnlySports.includes(s.key) ? "men" : "men";
        return fetch(`https://gc-backend-9bj6.onrender.com/api/${s.key}/schedule/${g}`)
          .then(res => res.ok ? res.json() : [])
          .then(data =>
            (Array.isArray(data) ? data : []).map(m => ({
              ...m,
              _sport: s.label,
              _sportKey: s.key,
              _icon: s.icon
            }))
          );
      });
    Promise.all(fetches)
      .then(results => {
        const allMatches = results.flat().filter(m => m.Date && m.Date !== "TBA" && !isPlaceholderMatch(m));
        const grouped = {};
        allMatches.forEach(m => {
          const date = m.Date;
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(m);
        });
        const sortedDates = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b));
        setFullSchedule(grouped);
        setFullDates(sortedDates);
        setSelectedDate(sortedDates[0] || null);
      })
      .catch(err => setError("Failed to fetch full schedule"));
  }, [sport]);

  // Full Schedule Render
  if (sport === "full") {
    return (
      <div className="page">
        <h1>Full Schedule</h1>
        
        {/* Sport Selection Tabs */}
        <div className="tabs">
          {sports.map(s => (
            <button
              key={s.key}
              className={sport === s.key ? "active" : ""}
              onClick={() => setSport(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>
        
        {/* Date Filter Tabs */}
        <div className="tabs" style={{ marginTop: '20px' }}>
            {fullDates.map(date => (
              <button
                key={date}
                className={selectedDate === date ? "active" : ""}
                onClick={() => setSelectedDate(date)}
              >
                {formatDate(date)}
              </button>
            ))}
          </div>
          {error && <div style={{ color: "#ef4444", textAlign: "center" }}>{error}</div>}
          <div className="schedule">
            {selectedDate && fullSchedule[selectedDate] && (
               Object.entries(
                  fullSchedule[selectedDate].reduce((acc, m) => {
                    const time = m.Time || "TBA";
                    if (!acc[time]) acc[time] = [];
                    acc[time].push(m);
                    return acc;
                  }, {})
                )
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([time, matches]) => (
                    <div key={time}>
                      <div style={{
                        color: "#64748b", fontWeight: 700, fontSize: "0.9rem",
                        marginBottom: 12, letterSpacing: "1px"
                      }}>
                        {time === "TBA" ? "TIME TBA" : time}
                      </div>
                      {matches.map((m, idx) => (
                        <div key={idx} className="match-card">
                           <div className="match-card-sport">
                              <span>{m._sport}</span>
                              {m.Pool && <span style={{color: "#3b82f6", fontSize: "0.8rem"}}>POOL {m.Pool}</span>}
                           </div>
                           <div className="match-card-teams">
                              <span>{m.TeamA}</span>
                              <span style={{color: "#e11d48", fontSize: "0.9rem"}}>VS</span>
                              <span>{m.TeamB}</span>
                           </div>
                           <div className="match-card-meta">
                              {m.Venue}
                           </div>
                        </div>
                      ))}
                    </div>
                  ))
            )}
          </div>
      </div>
    );
  }

  // Single Sport Render
  const groupedMatches = groupMatchesByDate(matches);
  const allDates = Object.keys(groupedMatches).sort((a, b) => new Date(a) - new Date(b));
  let dayCounter = 0;

  return (
    <div className="page">
      <h1>{sports.find(s => s.key === sport)?.label || 'Schedule'}</h1>
      
      {/* Sport Selection Tabs */}
      <div className="tabs">
        {sports.map(s => (
          <button key={s.key} className={sport === s.key ? "active" : ""} onClick={() => setSport(s.key)}>
            {s.label}
          </button>
        ))}
      </div>
      
      {/* Gender Filter Tabs */}
      {!noGenderFilterSports.includes(sport) && (
        <div className="tabs" style={{ marginTop: '20px' }}>
            <button className={gender === "men" ? "active" : ""} onClick={() => setGender("men")}>Men</button>
            <button className={gender === "women" ? "active" : ""} onClick={() => setGender("women")}>Women</button>
          </div>
        )}

      {error && <div style={{ color: "#ef4444", textAlign: "center" }}>{error}</div>}

      <div className="schedule">
        {allDates.map(date => {
          const filteredMatches = groupedMatches[date].filter(m => !isPlaceholderMatch(m));
          if (date === "TBA" || filteredMatches.length === 0) return null;
          dayCounter++;
          return (
            <div key={date} className="schedule-date-group">
              <div className="schedule-date-header">
                DAY {dayCounter} <span style={{color: "#0f172a", marginLeft: "8px"}}>/ {formatDate(date)}</span>
              </div>
              <table className="schedule-table">
                <tbody>
                  {filteredMatches.map((m, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td className="match-teams">
                        <span>{m.TeamA}</span>
                        <span className="vs-badge">VS</span>
                        <span>{m.TeamB}</span>
                      </td>
                      <td>
                         <span className="match-time">{m.Time}</span>
                      </td>
                      <td>{m.Venue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}
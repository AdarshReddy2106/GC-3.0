import { useEffect, useState } from "react";
import "../styles/Schedule.css";

const sports = [
  { key: "chess", label: "Chess", icon: "/icons/chess.svg" },
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
      <div className="sidebar-title">FULL SCHEDULE</div>
      <div className="sidebar-sports">
        {sports.map(s => (
          <div
            key={s.key}
            className={`sidebar-sport${selectedSport === s.key ? " selected" : ""}`}
            onClick={() => onSelect(s.key)}
          >
            <img src={s.icon} alt={s.label} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
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

function formatDate(dateStr) {
  if (!dateStr || dateStr === "TBA") return "TBA";
  // Try to format YYYY-MM-DD to DD/MM/YYYY
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  }
  return dateStr;
}

// Helper to check if a match is a placeholder (TEAM I vs TEAM II, etc.)
function isPlaceholderMatch(m) {
  const teamA = (m.TeamA || "").toUpperCase().replace(/\s/g, "");
  const teamB = (m.TeamB || "").toUpperCase().replace(/\s/g, "");
  return (
    teamA === "TEAMI" && teamB === "TEAMII"
  );
}

function parseDateForSort(dateStr) {
  // If already YYYY-MM-DD, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  // If DD/MM/YYYY, convert to YYYY-MM-DD
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    const [d, m, y] = dateStr.split("/");
    return `${y}-${m}-${d}`;
  }
  return dateStr; // fallback
}

export default function Schedule() {
  const [sport, setSport] = useState("volleyball");
  const [gender, setGender] = useState("men");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    fetch(`http://localhost:5000/api/${sport}/schedule/${gender}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch schedule");
        return res.json();
      })
      .then(data => setMatches(data))
      .catch(err => setError(err.message));
  }, [sport, gender]);

  // Group matches by date
  const groupedMatches = groupMatchesByDate(matches);

  // Sort dates chronologically (TBA last)
  const allDates = Object.keys(groupedMatches).sort((a, b) => {
    if (a === "TBA") return 1;
    if (b === "TBA") return -1;
    return new Date(parseDateForSort(a)) - new Date(parseDateForSort(b));
  });

  // Render
  let dayCounter = 0; // Track actual rendered day numbers

  // Sports that only have men category
  const menOnlySports = ["chess", "football", "cricket"];

  // Sports that should not show any gender filter
  const noGenderFilterSports = ["chess", "football", "cricket"];

  return (
    <>
      <Sidebar selectedSport={sport} onSelect={setSport} />
      <div className="page">
        <h1>SCHEDULE</h1>
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
        {/* Hide gender filter for chess, football, cricket */}
        {!noGenderFilterSports.includes(sport) && (
          <div className="tabs">
            <button className={gender === "men" ? "active" : ""} onClick={() => setGender("men")}>Men</button>
            <button className={gender === "women" ? "active" : ""} onClick={() => setGender("women")}>Women</button>
          </div>
        )}
        {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
        <div className="schedule">
          {allDates.map(date => {
            const filteredMatches = groupedMatches[date].filter(m => !isPlaceholderMatch(m));
            if (date === "TBA" || filteredMatches.length === 0) return null;
            dayCounter++; // Increment only when rendering a group
            return (
              <div key={date} className="schedule-date-group">
                <div className="schedule-date-header">
                  DAY {dayCounter} - <span className="schedule-date">{formatDate(date)}</span>
                </div>
                <table className="schedule-table">
                  <thead>
                    <tr>
                      <th>NO.</th>
                      <th>MATCHES</th>
                      <th>TIME</th>
                      <th>PLACE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMatches.map((m, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>
                          <span>{m.TeamA}</span>
                          <strong style={{ margin: "0 8px" }}>VS</strong>
                          <span>{m.TeamB}</span>
                        </td>
                        <td>{m.Time}</td>
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
    </>
  );
}

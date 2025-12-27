import { useEffect, useState } from "react";
import "../styles/Schedule.css";

const sports = [
  { key: "full", label: "Full Schedule", icon: "" },
  { key: "chess", label: "Chess", icon: "/icons/chess.svg" },
  { key: "basketball", label: "Basketball", icon: "/icons/basketball.svg" },
  { key: "volleyball", label: "Volleyball", icon: "/icons/volleyball.svg" },
  { key: "badminton", label: "Badminton", icon: "/icons/badminton.svg" },
  { key: "tabletennis", label: "Table Tennis", icon: "/icons/tabletennis.svg" },
  { key: "cricket", label: "Cricket", icon: "/icons/cricket.svg" },
  { key: "football", label: "Football", icon: "/icons/football.svg" }
];

const menOnlySports = ["chess", "football", "cricket"];

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
            {s.icon && <img src={s.icon} alt={s.label} />}
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr || dateStr === "TBA") return "TBA";
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split("-");
    return `${d} ${monthShortName(m)}`;
  }
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    const [d, m, y] = dateStr.split("/");
    return `${d} ${monthShortName(m)}`;
  }
  return dateStr;
}

function monthShortName(m) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[parseInt(m, 10) - 1] || "";
}

function parseDateForSort(dateStr) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    const [d, m, y] = dateStr.split("/");
    return `${y}-${m}-${d}`;
  }
  return dateStr;
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
  const [sport, setSport] = useState("volleyball");
  const [gender, setGender] = useState("men");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  // For full schedule
  const [fullSchedule, setFullSchedule] = useState({});
  const [fullDates, setFullDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // Fetch for single sport
  useEffect(() => {
    if (sport === "full") return;
    setError(null);
    fetch(`http://localhost:5000/api/${sport}/schedule/${gender}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch schedule");
        return res.json();
      })
      .then(data => setMatches(data))
      .catch(err => setError(err.message));
  }, [sport, gender]);

  // Fetch all sports for full schedule
  useEffect(() => {
    if (sport !== "full") return;
    setError(null);
    const fetches = sports
      .filter(s => s.key !== "full")
      .map(s => {
        // Only fetch men for men-only sports
        const g = menOnlySports.includes(s.key) ? "men" : "men";
        return fetch(`http://localhost:5000/api/${s.key}/schedule/${g}`)
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
        // Flatten and group by date
        const allMatches = results.flat().filter(m => m.Date && m.Date !== "TBA" && !isPlaceholderMatch(m));
        const grouped = {};
        allMatches.forEach(m => {
          const date = m.Date;
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(m);
        });
        // Sort dates
        const sortedDates = Object.keys(grouped).sort((a, b) => new Date(parseDateForSort(a)) - new Date(parseDateForSort(b)));
        setFullSchedule(grouped);
        setFullDates(sortedDates);
        setSelectedDate(sortedDates[0] || null);
      })
      .catch(err => setError("Failed to fetch full schedule"));
  }, [sport]);

  // Render for full schedule
  if (sport === "full") {
    return (
      <>
        <Sidebar selectedSport={sport} onSelect={setSport} />
        <div className="page">
          <h1>FULL SCHEDULE</h1>
          <div className="tabs">
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
          {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
          <div className="schedule">
            {selectedDate && fullSchedule[selectedDate] && (
              <>
                {/* Group by time if available */}
                {Object.entries(
                  fullSchedule[selectedDate].reduce((acc, m) => {
                    const time = m.Time || "TBA";
                    if (!acc[time]) acc[time] = [];
                    acc[time].push(m);
                    return acc;
                  }, {})
                )
                  .sort(([a], [b]) => {
                    // Sort times (TBA last)
                    if (a === "TBA") return 1;
                    if (b === "TBA") return -1;
                    return a.localeCompare(b);
                  })
                  .map(([time, matches]) => (
                    <div key={time} style={{ marginBottom: 24 }}>
                      <div style={{
                        background: "#7b89c2",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        borderRadius: 8,
                        padding: "6px 18px",
                        display: "inline-block",
                        marginBottom: 8
                      }}>
                        {time}
                      </div>
                      {matches.map((m, idx) => (
                        <div key={idx} className="match-card" style={{ marginBottom: 8 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            {m._icon && <img src={m._icon} alt={m._sport} style={{ width: 32, height: 32 }} />}
                            <span style={{ fontWeight: 700, color: "#f74b2b" }}>{m._sport}{m.Round ? ` - ${m.Round}` : ""}</span>
                            {m.Pool && <span style={{ color: "#0b5ed7", fontWeight: 600 }}>Pool {m.Pool}</span>}
                          </div>
                          <div className="teams">
                            <span>{m.TeamA}</span>
                            <strong> VS </strong>
                            <span>{m.TeamB}</span>
                          </div>
                          <div className="meta">
                            <span>{m.Venue}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  // Render for single sport
  const groupedMatches = groupMatchesByDate(matches);
  const allDates = Object.keys(groupedMatches).sort((a, b) => {
    if (a === "TBA") return 1;
    if (b === "TBA") return -1;
    return new Date(parseDateForSort(a)) - new Date(parseDateForSort(b));
  });

  let dayCounter = 0;
  const noGenderFilterSports = ["chess", "football", "cricket"];

  return (
    <>
      <Sidebar selectedSport={sport} onSelect={setSport} />
      <div className="page">
        <h1>SCHEDULE</h1>
        <div className="tabs">
          {sports.filter(s => s.key !== "full").map(s => (
            <button
              key={s.key}
              className={sport === s.key ? "active" : ""}
              onClick={() => setSport(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>
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
            dayCounter++;
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

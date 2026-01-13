import React, { useState, useEffect } from 'react';
import '../styles/Schedule.css';

// --- Constants & Helpers ---
const SPORTS = [
  { key: "full", label: "Full Schedule", icon: "📅" },
  { key: "cricket", label: "Cricket", icon: "🏏" },
  { key: "football", label: "Football", icon: "⚽" },
  { key: "basketball", label: "Basketball", icon: "🏀" },
  { key: "volleyball", label: "Volleyball", icon: "🏐" },
  { key: "badminton", label: "Badminton", icon: "🏸" },
  { key: "tabletennis", label: "Table Tennis", icon: "🏓" },
  { key: "chess", label: "Chess", icon: "♟️" },
  { key: "athletics", label: "Athletics", icon: "🏃" }
];

const NO_GENDER_FILTER_SPORTS = ["chess", "football", "cricket"];

const getTeamEmoji = (teamName) => {
  if (!teamName) return '🏆';
  const name = teamName.toLowerCase();
  if (name.includes('panther')) return '🐆';
  if (name.includes('tiger')) return '🐅';
  if (name.includes('wolf')) return '🐺';
  if (name.includes('lion')) return '🦁';
  if (name.includes('eagle')) return '🦅';
  if (name.includes('shark')) return '🦈';
  if (name.includes('bull')) return '🐂';
  if (name.includes('dragon')) return '🐉';
  return '🏆';
};

const formatDate = (dateStr) => {
  if (!dateStr || dateStr === "TBA") return { day: "TBA", date: "--" };
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj)) return { day: "TBA", date: "--" };
  return {
    day: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
    date: dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
    full: dateObj.toDateString()
  };
};

const isPlaceholderMatch = (m) => {
  const teamA = (m.TeamA || "").toUpperCase().replace(/\s/g, "");
  const teamB = (m.TeamB || "").toUpperCase().replace(/\s/g, "");
  return teamA === "TEAMI" && teamB === "TEAMII";
};

const DateStrip = ({ dates, selectedDate, onDateSelect }) => {
  if (!dates || dates.length === 0) return null;
  
  return (
    <div className="date-strip">
      <div className="date-strip-inner">
        {dates.map((dateStr, index) => {
          const formatted = formatDate(dateStr);
          const isActive = selectedDate === dateStr;
          return (
            <div 
              key={index} 
              className={`date-item ${isActive ? 'active' : ''}`}
              onClick={() => onDateSelect(dateStr)}
            >
              <div className="date-day">{formatted.day}</div>
              <div className="date-num">{formatted.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MatchRow = ({ match }) => (
  <div className="match-row">
    {/* Home Team */}
    <div className="team-container home">
      <div className="team-details">
        <div className="team-name">{match.TeamA}</div>
        <div className="team-record">
          {match.Pool ? `Pool ${match.Pool}` : 'Round 1'}
        </div>
      </div>
      <div className="team-logo">{getTeamEmoji(match.TeamA)}</div>
    </div>

    {/* Center Info */}
    <div className="match-info">
      <div className="match-time-big">{match.Time || "TBA"}</div>
      <div className="match-sport-badge">
        {match._icon} {match._sport || "Match"}
      </div>
      <div className="match-venue">📍 {match.Venue || "TBA"}</div>
    </div>

    {/* Away Team */}
    <div className="team-container away">
      <div className="team-logo">{getTeamEmoji(match.TeamB)}</div>
      <div className="team-details">
        <div className="team-name">{match.TeamB}</div>
        <div className="team-record">
           {match.Category || ""}
        </div>
      </div>
    </div>
  </div>
);

// --- Main Component ---

export default function Schedule() {
  const [sport, setSport] = useState("full");
  const [gender, setGender] = useState("men");
  const [matches, setMatches] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Data Fetching ---
  useEffect(() => {
    setLoading(true);
    setError(null);
    setMatches([]);
    setDates([]);
    setSelectedDate(null);

    // 1. Fetch Full Schedule (All Sports)
    if (sport === "full") {
      const fetches = SPORTS
        .filter(s => s.key !== "full")
        .flatMap(s => {
          // For sports with gender categories, fetch both men's and women's schedules
          if (NO_GENDER_FILTER_SPORTS.includes(s.key)) {
            return [
              fetch(`https://gc-backend-9bj6.onrender.com/api/${s.key}/schedule/men`)
                .then(res => res.ok ? res.json() : [])
                .then(data => 
                  (Array.isArray(data) ? data : []).map(m => ({
                    ...m,
                    _sport: s.label,
                    _sportKey: s.key,
                    _icon: s.icon,
                    Category: m.Category || "Men"
                  }))
                )
            ];
          } else {
            return [
              fetch(`https://gc-backend-9bj6.onrender.com/api/${s.key}/schedule/men`)
                .then(res => res.ok ? res.json() : [])
                .then(data => 
                  (Array.isArray(data) ? data : []).map(m => ({
                    ...m,
                    _sport: s.label,
                    _sportKey: s.key,
                    _icon: s.icon,
                    Category: m.Category || "Men"
                  }))
                ),
              fetch(`https://gc-backend-9bj6.onrender.com/api/${s.key}/schedule/women`)
                .then(res => res.ok ? res.json() : [])
                .then(data => 
                  (Array.isArray(data) ? data : []).map(m => ({
                    ...m,
                    _sport: s.label,
                    _sportKey: s.key,
                    _icon: s.icon,
                    Category: m.Category || "Women"
                  }))
                )
            ];
          }
        });

      Promise.all(fetches)
        .then(results => {
          const allMatches = results.flat().filter(m => m.Date && m.Date !== "TBA" && !isPlaceholderMatch(m));
          processData(allMatches);
        })
        .catch(err => setError("Failed to fetch full schedule"))
        .finally(() => setLoading(false));
    } 
    // 2. Fetch Single Sport
    else {
      const effectiveGender = NO_GENDER_FILTER_SPORTS.includes(sport) ? "men" : gender;
      fetch(`https://gc-backend-9bj6.onrender.com/api/${sport}/schedule/${effectiveGender}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch schedule");
          return res.json();
        })
        .then(data => {
            const currentSportObj = SPORTS.find(s => s.key === sport);
            const enrichedData = (Array.isArray(data) ? data : []).map(m => ({
                ...m,
                _sport: currentSportObj?.label,
                _sportKey: sport,
                _icon: currentSportObj?.icon,
                Category: m.Category || (effectiveGender === "men" ? "Men" : "Women")
            }));
            processData(enrichedData);
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [sport, gender]);

  // --- Helper: Process & Sort Data ---
  const processData = (rawMatches) => {
    const validMatches = rawMatches.filter(m => m.Date && m.Date !== "TBA" && !isPlaceholderMatch(m));
    
    // Sort matches by Date then Time
    validMatches.sort((a, b) => {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);
      return dateA - dateB;
    });

    setMatches(validMatches);

    // Extract Unique Dates
    const uniqueDates = [...new Set(validMatches.map(m => m.Date))].sort((a, b) => new Date(a) - new Date(b));
    setDates(uniqueDates);
    
    // Auto-select first date
    if (uniqueDates.length > 0) {
      setSelectedDate(uniqueDates[0]);
    }
  };

  // --- Derived State ---
  const displayedMatches = matches.filter(m => m.Date === selectedDate);
  const currentSportLabel = SPORTS.find(s => s.key === sport)?.label;

  return (
    <div>
      <section className="schedule-section">
        <div className="schedule-header">
            <div className="schedule-title-group">
                <h2>UPCOMING <span>FIXTURES</span></h2>
                <p className="schedule-subtitle">
                  {selectedDate ? formatDate(selectedDate).full : "Select a Date"} • All times in IST
                </p>
            </div>

            <div className="filters-container">
                {/* Sport Tabs */}
                <div>
                    <div className="filter-group-label">Select Sport</div>
                    <div className="filter-tabs">
                        {SPORTS.map(s => (
                            <button
                                key={s.key}
                                className={`filter-tab ${sport === s.key ? "active" : ""}`}
                                onClick={() => setSport(s.key)}
                            >
                                {s.icon} {s.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gender Tabs (Only if applicable) */}
                {sport !== "full" && !NO_GENDER_FILTER_SPORTS.includes(sport) && (
                    <div>
                        <div className="filter-group-label">Category</div>
                        <div className="filter-tabs">
                            <button 
                                className={`filter-tab ${gender === "men" ? "active" : ""}`} 
                                onClick={() => setGender("men")}
                            >
                                Men
                            </button>
                            <button 
                                className={`filter-tab ${gender === "women" ? "active" : ""}`} 
                                onClick={() => setGender("women")}
                            >
                                Women
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* 3. Date Strip (Sticky) */}
        <DateStrip 
            dates={dates} 
            selectedDate={selectedDate} 
            onDateSelect={setSelectedDate} 
        />

        {/* 4. Match List */}
        <div className="matches-list" style={{ marginTop: '40px' }}>
            {loading && (
                <div className="state-container">
                    <p>Loading schedule...</p>
                </div>
            )}

            {error && (
                <div className="state-container">
                    <p className="error-msg">{error}</p>
                </div>
            )}

            {!loading && !error && displayedMatches.length === 0 && (
                <div className="state-container">
                    <p>No matches scheduled for this date.</p>
                </div>
            )}

            {!loading && !error && displayedMatches.map((match, idx) => (
                <MatchRow key={`${match._sportKey}-${idx}`} match={match} />
            ))}
        </div>
      </section>
    </div>
  );
}
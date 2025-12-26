import { useEffect, useState } from "react";
import "../styles/Schedule.css";

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

  return (
    <div className="page">
      <h1>Schedule</h1>

      <div className="tabs">
        <button className={sport==="volleyball"?"active":""}
          onClick={()=>setSport("volleyball")}>Volleyball</button>
        <button className={sport==="badminton"?"active":""}
          onClick={()=>setSport("badminton")}>Badminton</button>
      </div>

      <div className="tabs">
        <button className={gender==="men"?"active":""}
          onClick={()=>setGender("men")}>Men</button>
        <button className={gender==="women"?"active":""}
          onClick={()=>setGender("women")}>Women</button>
      </div>

      {error && <div style={{color:"red",textAlign:"center"}}>{error}</div>}

      <div className="schedule">
        {matches.map((m,i)=>(
          <div className="match-card" key={i}>
            <div className="teams">
              <span>{m.TeamA}</span>
              <strong>vs</strong>
              <span>{m.TeamB}</span>
            </div>
            <div className="meta">
              <span>{m.Date} | {m.Time}</span>
              <span>{m.Venue}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

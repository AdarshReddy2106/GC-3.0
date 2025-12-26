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
        <button onClick={()=>setSport("chess")}
          className={sport==="chess"?"active":""}>
          Chess
        </button>
        <button onClick={()=>setSport("basketball")}
          className={sport==="basketball"?"active":""}>
          Basketball
        </button>
        <button className={sport==="volleyball"?"active":""}
          onClick={()=>setSport("volleyball")}>Volleyball</button>
        <button className={sport==="badminton"?"active":""}
          onClick={()=>setSport("badminton")}>Badminton</button>
        <button className={sport==="tabletennis" ? "active" : ""}onClick={()=>setSport("tabletennis")}
          >Table Tennis</button>
        <button className={sport==="cricket" ? "active" : ""}onClick={()=>setSport("cricket")}
          >Cricket</button>
        <button className={sport==="football" ? "active" : ""}onClick={()=>setSport("football")}
          >Football</button>

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

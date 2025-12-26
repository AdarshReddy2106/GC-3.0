import { useEffect, useState } from "react";
import "../styles/Schedule.css";

export default function Leaderboard() {
  const [sport, setSport] = useState("volleyball");
  const [gender, setGender] = useState("men");
  const [columns, setColumns] = useState([]);
  const [pools, setPools] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/${sport}/leaderboard/${gender}`)
      .then(res => res.json())
      .then(data => {
        setColumns(data.columns);
        setPools(data.pools);
      });
  }, [sport, gender]);

  return (
    <div className="page">
      <h1>Leaderboard</h1>

      <div className="tabs">
        <button onClick={()=>setSport("chess")}
          className={sport==="chess"?"active":""}>
          Chess
        </button>
        <button onClick={()=>setSport("athletics")}
          className={sport==="athletics"?"active":""}>
          Athletics
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

      {Object.entries(pools).map(([pool, rows])=>(
        <div key={pool}>
          <h2>Pool {pool}</h2>
          <table className="leaderboard">
            <thead>
              <tr>
                {columns.map(c=><th key={c.key}>{c.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r,i)=>(
                <tr key={i}>
                  {columns.map(c=><td key={c.key}>{r[c.key]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

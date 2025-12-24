import { useEffect, useState } from "react";
import "../styles/Schedule.css";

export default function Leaderboard() {
  const [gender, setGender] = useState("men");
  const [columns, setColumns] = useState([]);
  const [pools, setPools] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    fetch(`http://localhost:5000/api/volleyball/leaderboard/${gender}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch leaderboard");
        return res.json();
      })
      .then(data => {
        setColumns(data.columns || []);
        setPools(data.pools || {});
      })
      .catch(err => setError(err.message));
  }, [gender]);

  return (
    <div className="page">
      <h1>Volleyball Leaderboard</h1>

      <div className="tabs">
        <button className={gender==="men" ? "active" : ""} onClick={()=>setGender("men")}>Men</button>
        <button className={gender==="women" ? "active" : ""} onClick={()=>setGender("women")}>Women</button>
      </div>

      {error && <div style={{color:"red",textAlign:"center"}}>{error}</div>}

      {Object.keys(pools).length === 0 && !error && (
        <div style={{textAlign:"center",color:"#555"}}>No data found.</div>
      )}

      {Object.entries(pools).map(([poolName, table]) => (
        <div key={poolName} style={{marginBottom: "2rem"}}>
          <h2 style={{textAlign:"center", color:"#0b5ed7"}}>Pool {poolName}</h2>
          <table className="leaderboard">
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.length === 0 && (
                <tr>
                  <td colSpan={columns.length} style={{textAlign:"center",color:"#555"}}>No data found.</td>
                </tr>
              )}
              {table.map((row, i) => (
                <tr key={i}>
                  {columns.map(col => (
                    <td key={col.key}>{row[col.key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

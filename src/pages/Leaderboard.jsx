import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/leaderboard";

export default function Leaderboard() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(setTables)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedTable) return;

    setLoading(true);
    fetch(`${API}/${encodeURIComponent(selectedTable)}`)
      .then(res => res.json())
      .then(data => {
        setRows(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedTable]);

  return (
    <div style={{ padding: "24px" }}>
      <h2>Leaderboard</h2>

      <select
        value={selectedTable}
        onChange={e => setSelectedTable(e.target.value)}
        style={{ padding: "8px", marginBottom: "16px" }}
      >
        <option value="">Select Sport</option>
        {tables.map(table => (
          <option key={table} value={table}>
            {table}
          </option>
        ))}
      </select>

      {loading && <p>Loading leaderboard...</p>}

      {!loading && rows.length > 0 && (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              {Object.keys(rows[0]).map((col, i) => (
                <th key={i}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((val, j) => (
                  <td key={j}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && selectedTable && rows.length === 0 && (
        <p>No leaderboard data available.</p>
      )}
    </div>
  );
}

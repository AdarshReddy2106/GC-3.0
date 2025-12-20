import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/schedule";

export default function Schedule() {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API}/days`)
      .then(res => res.json())
      .then(setDays)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedDay) return;

    setLoading(true);
    fetch(`${API}/${encodeURIComponent(selectedDay)}`)
      .then(res => res.json())
      .then(data => {
        setRows(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [selectedDay]);

  return (
    <div style={{ padding: "24px" }}>
      <h2>Match Schedule</h2>

      <select
        value={selectedDay}
        onChange={e => setSelectedDay(e.target.value)}
        style={{ padding: "8px", marginBottom: "16px" }}
      >
        <option value="">Select Day</option>
        {days.map(day => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>

      {loading && <p>Loading schedule...</p>}

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

      {!loading && selectedDay && rows.length === 0 && (
        <p>No matches available.</p>
      )}
    </div>
  );
}

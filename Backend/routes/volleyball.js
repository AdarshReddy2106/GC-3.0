import express from "express";
import { readExcelSheet } from "../utils/excelReader.js";

const router = express.Router();

/* -------- SCHEDULE -------- */
router.get("/schedule/:gender", (req, res) => {
  try {
    const gender = req.params.gender.toUpperCase();
    const raw = readExcelSheet(`VB_${gender}_SCHEDULE`);
    // Map raw Excel data to frontend format
    const data = raw
      .filter((row) => row["__EMPTY_1"] && row["__EMPTY_3"]) // skip header/empty rows
      .map((row) => ({
        TeamA: row["__EMPTY_1"],
        TeamB: row["__EMPTY_3"],
        Date:
          typeof row["__EMPTY_4"] === "number"
            ? excelDateToString(row["__EMPTY_4"])
            : row["__EMPTY_4"],
        Time: row["__EMPTY_5"],
        Venue: row["__EMPTY_6"],
        Round: row["VOLLEYBALL - MEN"] || row["VOLLEYBALL - WOMEN"] || "",
        Score: row["__EMPTY_7"] || "",
      }));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper: Convert Excel date serial to string (if needed)
function excelDateToString(serial) {
  // Excel date serial to JS Date
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);
  // Format as YYYY-MM-DD
  return date_info.toISOString().slice(0, 10);
}

/* -------- LEADERBOARD -------- */
router.get("/leaderboard/:gender", (req, res) => {
  try {
    const gender = req.params.gender.toUpperCase();
    const raw = readExcelSheet(`VB_${gender}_LEADERBOARD`);
    // Define column mapping for men and women
    let columns;
    if (gender === "MEN") {
      columns = [
        { key: "TEAM", label: "Team" },
        { key: "MATCH PLAYED", label: "P" },
        { key: "MATCH WON", label: "W" },
        { key: "MATCH LOST", label: "L" },
        { key: "POINT", label: "Pts" },
        { key: "2-0(WINS)", label: "2-0(WINS)" },
        { key: "2-1(WINS)", label: "2-1(WINS)" },
        { key: "1-2(LOSS)", label: "1-2(LOSS)" },
        { key: "0-2(LOSS)", label: "0-2(LOSS)" },
      ];
    } else {
      // Use actual women's Excel headers
      columns = [
        { key: "TEAM", label: "Team" },
        { key: "MATCH PLAYED", label: "P" },
        { key: "MATCH WON", label: "W" },
        { key: "MATCH LOST", label: "L" },
        { key: "POINT", label: "Pts" },
        { key: "FOR", label: "For" },
        { key: "AGAINST", label: "Against" },
        { key: "RATIO", label: "Ratio" },
      ];
    }
    // Group by pool
    const pools = {};
    raw
      .filter((row) => row["TEAM"] && typeof row["TEAM"] === "string")
      .forEach((row) => {
        const pool = row["POOL"] || "Unknown";
        if (!pools[pool]) pools[pool] = [];
        pools[pool].push(row);
      });
    res.json({ columns, pools });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

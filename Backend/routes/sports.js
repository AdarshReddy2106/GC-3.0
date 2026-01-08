import express from "express";
import { readExcelSheet } from "../utils/excelReader.js";
import { excelDateToString, getSportPrefix } from "../utils/helpers.js";
const router = express.Router();

/* ===================== SCHEDULE ===================== */
router.get("/:sport/schedule/:gender", (req, res) => {
  try {
    const { sport, gender } = req.params;
    const prefix = getSportPrefix(sport);
    
    if (!prefix) {
      return res.status(400).json({ error: `Invalid sport: ${sport}` });
    }
    
    const sheet = `${prefix}_${gender.toUpperCase()}_SCHEDULE`;

    const raw = readExcelSheet(sheet);
    let data = [];

    /* ---------- VOLLEYBALL ---------- */
    if (sport === "volleyball") {
      data = raw
        .filter(r => r["__EMPTY_1"] && r["__EMPTY_3"])
        .map(r => ({
          TeamA: r["__EMPTY_1"],
          TeamB: r["__EMPTY_3"],
          Date:
            typeof r["__EMPTY_4"] === "number"
              ? excelDateToString(r["__EMPTY_4"])
              : r["__EMPTY_4"],
          Time: r["__EMPTY_5"],
          Venue: r["__EMPTY_6"],
          Round: r["VOLLEYBALL - MEN"] || r["VOLLEYBALL - WOMEN"] || "",
          Score: r["__EMPTY_7"] || ""
        }));
    }


    /* ---------- BADMINTON ---------- */
    if (sport === "badminton") {
      data = raw
        .filter(r => r["__EMPTY_1"] && r["__EMPTY_3"])
        .map(r => ({
          TeamA: r["__EMPTY_1"],
          TeamB: r["__EMPTY_3"],
          Date:
            typeof r["__EMPTY_4"] === "number"
              ? excelDateToString(r["__EMPTY_4"])
              : r["__EMPTY_4"],
          Time: r["__EMPTY_5"],
          Venue: r["__EMPTY_6"],
          Score: r["__EMPTY_7"] || ""
        }));
    }
    /* ---------- BASKETBALL ---------- */
    if (sport === "basketball") {
      data = raw
        .filter(r => r["__EMPTY_1"] && r["__EMPTY_3"])
        .map(r => ({
          TeamA: r["__EMPTY_1"],
          TeamB: r["__EMPTY_3"],
          Date:
            typeof r["__EMPTY_4"] === "number"
              ? excelDateToString(r["__EMPTY_4"])
              : r["__EMPTY_4"],
          Time: r["__EMPTY_5"],
          Venue: r["__EMPTY_6"],
          Score: r["__EMPTY_7"] || ""
        }));
    }

    /* ---------- TABLE TENNIS ---------- */
    if (sport === "tabletennis") {
      data = raw
        .filter(r => r["__EMPTY_1"] && r["__EMPTY_3"])
        .map(r => ({
          TeamA: r["__EMPTY_1"],
          TeamB: r["__EMPTY_3"],
          Date:
            typeof r["__EMPTY_4"] === "number"
              ? excelDateToString(r["__EMPTY_4"])
              : r["__EMPTY_4"],
          Time: r["__EMPTY_5"],
          Venue: r["__EMPTY_6"],
          Score: r["__EMPTY_7"] || ""
        }));
    }
    /* ---------- CRICKET ---------- */
    if (sport === "cricket") {
      data = raw
        .filter(r => r["__EMPTY_1"] && r["__EMPTY_3"])
        .map(r => ({
          TeamA: r["__EMPTY_1"],
          TeamB: r["__EMPTY_3"],
          Date:
            typeof r["__EMPTY_4"] === "number"
              ? excelDateToString(r["__EMPTY_4"])
              : r["__EMPTY_4"],
          Time: r["__EMPTY_5"],
          Venue: r["__EMPTY_6"],
          Score: r["__EMPTY_7"] || ""
        }));
        }
    /* ---------- FOOTBALL ---------- */
    if (sport === "football") {
      data = raw
        .filter(r => r["__EMPTY_1"] && r["__EMPTY_3"])
        .map(r => ({
          TeamA: r["__EMPTY_1"],
          TeamB: r["__EMPTY_3"],
          Date:
            typeof r["__EMPTY_4"] === "number"
              ? excelDateToString(r["__EMPTY_4"])
              : r["__EMPTY_4"],
          Time: r["__EMPTY_5"],
          Venue: r["__EMPTY_6"],
          Score: r["__EMPTY_7"] || ""
        }));
    }
    /* ---------- CHESS (ROBUST, NO MERGES) ---------- */
if (sport === "chess") {
  const data = raw
    .filter(r => {
      const values = Object.values(r).map(v =>
        typeof v === "string" ? v.trim() : v
      );

      // skip header row
      return (
        values.includes("TEAM I") === false &&
        values.includes("TEAM II") === false &&
        values.length >= 5
      );
    })
    .map(r => {
      const keys = Object.keys(r);

      // Dynamically map columns (safe)
      const round = r[keys[0]];
      const teamA = r[keys[1]];
      const teamB = r[keys[2]];
      const date = r[keys[3]];
      const time = r[keys[4]];
      const venue = r[keys[5]];
      const score = r[keys[6]] || "";

      return {
        Round: round,
        TeamA: teamA,
        TeamB: teamB,
        Date: typeof date === "number" ? excelDateToString(date) : date,
        Time: time,
        Venue: venue,
        Score: score
      };
    });

  return res.json(data);
}

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===================== LEADERBOARD ===================== */
router.get("/:sport/leaderboard/:gender", (req, res) => {
  try {
    const { sport, gender } = req.params;
    const prefix = getSportPrefix(sport);
    const sheet = `${prefix}_${gender.toUpperCase()}_LEADERBOARD`;

    const raw = readExcelSheet(sheet);
    let columns = [];
    const pools = {};

    /* ---------- VOLLEYBALL ---------- */
    if (sport === "volleyball") {
      if (gender.toUpperCase() === "MEN") {
        columns = [
          { key: "TEAM", label: "Team" },
          { key: "MATCH PLAYED", label: "P" },
          { key: "MATCH WON", label: "W" },
          { key: "MATCH LOST", label: "L" },
          { key: "POINT", label: "Pts" },
          { key: "2-0(WINS)", label: "2-0" },
          { key: "2-1(WINS)", label: "2-1" },
          { key: "1-2(LOSS)", label: "1-2" },
          { key: "0-2(LOSS)", label: "0-2" }
        ];
      } else {
        columns = [
          { key: "TEAM", label: "Team" },
          { key: "MATCH PLAYED", label: "P" },
          { key: "MATCH WON", label: "W" },
          { key: "MATCH LOST", label: "L" },
          { key: "POINT", label: "Pts" },
          { key: "FOR", label: "For" },
          { key: "AGAINST", label: "Against" },
          { key: "RATIO", label: "Ratio" }
        ];
      }

      raw
        .filter(r => r["TEAM"])
        .forEach(r => {
          const pool = r["POOL"] || "A";
          if (!pools[pool]) pools[pool] = [];
          pools[pool].push(r);
        });

      return res.json({ columns, pools });
    }

    /* ---------- BADMINTON ---------- */
    if (sport === "badminton") {
      columns = [
        { key: "TEAM", label: "TEAM" },
        { key: "MP", label: "MP" },
        { key: "MW", label: "MW" },
        { key: "ML", label: "ML" },
        { key: "POINTS", label: "POINTS" },
        { key: "GW", label: "GW" },
        { key: "GL", label: "GL" },
        { key: "GD", label: "GD" }
      ];

      raw
        .filter(row => row["TEAM"] && row["POOL"])
        .forEach(row => {
          const pool = row["POOL"];
          if (!pools[pool]) pools[pool] = [];

          pools[pool].push({
            TEAM: row["TEAM"],
            MP: row["MP"],
            MW: row["MW"],
            ML: row["ML"],
            POINTS: row["POINTS"],
            GW: row["GW"],
            GL: row["GL"],
            GD: row["GD"]
          });
        });

      return res.json({ columns, pools });
    }
    /* ---------- BASKETBALL ---------- */
    if (sport === "basketball") {
      columns = [
        { key: "TEAM", label: "TEAM" },
        { key: "MATCHES PLAYED", label: "MP" },
        { key: "MATCHES WON", label: "MW" },
        { key: "MATCHES DRAWN", label: "MD" },
        { key: "MATCHES LOST", label: "ML" },
        { key: "POINTS", label: "PTS" }
      ];

      raw
        .filter(r => r["TEAM"] && r["POOL"])
        .forEach(r => {
          const pool = r["POOL"];
          if (!pools[pool]) pools[pool] = [];
          pools[pool].push(r);
        });

      return res.json({ columns, pools });
    }

    /* ---------- CHESS ---------- */
    if (sport === "chess") {
      const columns = [
        { key: "TEAM", label: "TEAM" },
        { key: "MATCHES PLAYED", label: "MP" },
        { key: "MATCHES WON", label: "MW" },
        { key: "MATCHES DRAWN", label: "MD" },
        { key: "MATCHES LOST", label: "ML" },
        { key: "POINTS", label: "PTS" },
        { key: "BOARDS WON", label: "BW" },
        { key: "BOARDS LOST", label: "BL" },
        { key: "BOARD DIFFERENCE", label: "BD" }
      ];

      // Single table — no pools
      const pools = {
        ALL: raw.filter(r => r["TEAM"])
      };

      return res.json({ columns, pools });
    }


    /* ---------- TABLE TENNIS ---------- */
    if (sport === "tabletennis") {
      columns = [
        { key: "TEAM", label: "TEAM" },
        { key: "MATCH PLAYED", label: "MP" },
        { key: "MATCH WON", label: "MW" },
        { key: "MATCH LOST", label: "ML" },
        { key: "POINT", label: "PTS" },
        { key: "GAMES WON", label: "GW" },
        { key: "GAMES LOST", label: "GL" },
        { key: "GAME DIFFERENCE", label: "GD" }
      ];

      raw
        .filter(r => r["TEAM"] && r["POOL"])
        .forEach(r => {
          const pool = r["POOL"]; // A or B
          if (!pools[pool]) pools[pool] = [];

          pools[pool].push(r);
        });

      return res.json({ columns, pools });
    }
    /* ---------- CRICKET ---------- */
    if (sport === "cricket") {
      columns = [
        { key: "TEAM", label: "TEAM" },
        { key: "MP", label: "MP" },
        { key: "MW", label: "W" },
        { key: "MD", label: "D" },
        { key: "ML", label: "L" },
        { key: "POINT", label: "PTS" },
        { key: "NRR", label: "NRR" }
      ];

      raw
        .filter(r => r["TEAM"] && r["POOL"])
        .forEach(r => {
          const pool = r["POOL"]; // A / B
          if (!pools[pool]) pools[pool] = [];
          pools[pool].push(r);
        });

      return res.json({ columns, pools });
    }
    /* ---------- FOOTBALL ---------- */
    if (sport === "football") {
      columns = [
        { key: "TEAM", label: "TEAM" },
        { key: "MP", label: "MP" },
        { key: "MW", label: "W" },
        { key: "MD", label: "D" },
        { key: "ML", label: "L" },
        { key: "POINT", label: "PTS" },
        { key: "FOR", label: "FOR" },
        { key: "AGAINST", label: "AGAINST" },
        { key: "GD", label: "GD" }
      ];

      raw
        .filter(r => r["TEAM"] && r["POOL"])
        .forEach(r => {
          const pool = r["POOL"];
          if (!pools[pool]) pools[pool] = [];
          pools[pool].push(r);
        });

      return res.json({ columns, pools });
    }




  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

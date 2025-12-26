import express from "express";
import { readExcelSheet } from "../utils/excelReader.js";
import { excelDateToString, getSportPrefix } from "../utils/helpers.js";

const router = express.Router();

/* ===================== SCHEDULE ===================== */
router.get("/:sport/schedule/:gender", (req, res) => {
  try {
    const { sport, gender } = req.params;
    const prefix = getSportPrefix(sport);
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

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

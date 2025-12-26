import express from "express";
import {
  parseAthleticsScheduleAll,
  parseAthleticsLeaderboard
} from "../parsers/athleticsParser.js";

const router = express.Router();

/* ---------- SCHEDULE ---------- */
router.get("/schedule/all", (req, res) => {
  try {
    const data = parseAthleticsScheduleAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------- LEADERBOARD ---------- */
router.get("/leaderboard", (req, res) => {
  try {
    const data = parseAthleticsLeaderboard();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

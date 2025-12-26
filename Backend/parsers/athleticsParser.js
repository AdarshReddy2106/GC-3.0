import { readExcelSheet } from "../utils/excelReader.js";

/* ================= SCHEDULE ================= */
export function parseAthleticsScheduleAll() {
  const raw = readExcelSheet("AT_ALL_SCHEDULE");

  return raw.filter(r => r["EVENT"]).map(r => ({
    event: r["EVENT"],
    round: r["ROUND"] || "",
    men: {
      date: r["DATE (MEN)"],
      time: r["TIME (MEN)"],
      venue: r["VENUE (MEN)"]
    },
    women: {
      date: r["DATE (WOMEN)"],
      time: r["TIME (WOMEN)"],
      venue: r["VENUE (WOMEN)"]
    }
  }));
}

/* ================= LEADERBOARD ================= */
export function parseAthleticsLeaderboard() {
  const raw = readExcelSheet("AT_LEADERBOARD");

  return raw
    .filter(r => r["TEAM NAME"])
    .map(r => ({
      team: r["TEAM NAME"],
      total: r["TOTAL"],
      events: {
        "100M": r["100M (MEN)"] + r["100M (W)"],
        "200M": r["200M (MEN)"] + r["200M (W)"],
        "400M": r["400M (MEN)"] + r["400M (W)"],
        "800M": r["800M"],
        "4x100M": r["4*100M (MEN)"] + r["4*100M (W)"],
        shotput: r["SHOTPUT (MEN)"] + r["SHOTPUT (W)"],
        javelin: r["JAVELIN"],
        hammer: r["HAMMER"],
        discus: r["DISCUSS"]
      }
    }));
}

import { readExcelSheet } from "../utils/excelReader.js";

export function parseAthleticsScheduleAll() {
  const raw = readExcelSheet("AT_ALL_SCHEDULE");

  let currentRound = "";
  let currentEvent = "";

  let menDate = "", menTime = "", menVenue = "";
  let womenDate = "", womenTime = "", womenVenue = "";

  const data = [];

  raw.forEach(row => {
    // ROUND column (HEATS / FINALS)
    if (row["__EMPTY"]) {
      currentRound = row["__EMPTY"];
    }

    // EVENT column (100M, 400M, etc.)
    if (row["__EMPTY_1"]) {
      currentEvent = row["__EMPTY_1"];
    }

    // MEN columns
    if (row["__EMPTY_2"]) menDate = row["__EMPTY_2"];
    if (row["__EMPTY_3"]) menTime = row["__EMPTY_3"];
    if (row["__EMPTY_4"]) menVenue = row["__EMPTY_4"];

    // WOMEN columns
    if (row["__EMPTY_5"]) womenDate = row["__EMPTY_5"];
    if (row["__EMPTY_6"]) womenTime = row["__EMPTY_6"];
    if (row["__EMPTY_7"]) womenVenue = row["__EMPTY_7"];

    // Skip junk rows
    if (!currentRound || !currentEvent) return;

    data.push({
      round: currentRound,
      event: currentEvent,
      men: {
        date: menDate,
        time: menTime,
        venue: menVenue
      },
      women: {
        date: womenDate,
        time: womenTime,
        venue: womenVenue
      }
    });
  });

  return data;
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

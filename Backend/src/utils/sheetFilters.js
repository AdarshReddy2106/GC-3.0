function isScheduleSheet(name) {
  return name.includes("Feb") || name.includes("March");
}

function isLeaderboardSheet(name) {
  return name.toLowerCase().includes("table");
}

module.exports = { isScheduleSheet, isLeaderboardSheet };

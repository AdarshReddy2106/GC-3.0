const excel = require("../services/excel.service");
const { isLeaderboardSheet } = require("../utils/sheetFilters");

exports.getTables = (req, res) => {
  const tables = excel
    .getSheetNames()
    .filter(isLeaderboardSheet);

  res.json(tables);
};

exports.getLeaderboard = (req, res) => {
  res.json(excel.readSheet(req.params.table));
};

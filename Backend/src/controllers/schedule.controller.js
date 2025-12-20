const excel = require("../services/excel.service");
const { isScheduleSheet } = require("../utils/sheetFilters");

exports.getDays = (req, res) => {
  const days = excel
    .getSheetNames()
    .filter(isScheduleSheet);

  res.json(days);
};

exports.getScheduleByDay = (req, res) => {
  res.json(excel.readSheet(req.params.day));
};

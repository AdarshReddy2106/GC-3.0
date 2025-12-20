const XLSX = require("xlsx");
const path = require("path");

const FILE_PATH = path.join(__dirname, "../../data/GC2k25.xlsx");

function readSheet(sheetName) {
  const wb = XLSX.readFile(FILE_PATH);
  const sheet = wb.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet, { defval: "" });
}

function getSheetNames() {
  return XLSX.readFile(FILE_PATH).SheetNames;
}

module.exports = {
  readSheet,
  getSheetNames
};

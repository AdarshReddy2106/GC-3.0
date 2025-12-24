import XLSX from "xlsx";
import path from "path";
import fs from "fs";

const filePath = path.join("data", "GC_TEST.xlsx");

export function readExcelSheet(sheetName) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Excel file not found at ${filePath}`);
  }
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    throw new Error(`Sheet ${sheetName} not found`);
  }

  return XLSX.utils.sheet_to_json(sheet);
}

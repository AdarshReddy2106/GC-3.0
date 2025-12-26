import XLSX from "xlsx";
import path from "path";

const filePath = path.join("data", "GC_TEST.xlsx");

export function readExcelSheet(sheetName) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found in Excel`);
  }

  return XLSX.utils.sheet_to_json(sheet, { defval: "" });
}

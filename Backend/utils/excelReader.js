import XLSX from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use absolute path that works in serverless environment
const filePath = path.join(__dirname, "..", "data", "GC_TEST.xlsx");

export function readExcelSheet(sheetName) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found in Excel`);
  }

  return XLSX.utils.sheet_to_json(sheet, { defval: "" });
}

/* Convert Excel serial date to YYYY-MM-DD */
export function excelDateToString(serial) {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);
  return date_info.toISOString().slice(0, 10);
}

/* Map sport to Excel sheet prefix */
export function getSportPrefix(sport) {
  if (sport === "volleyball") return "VB";
  if (sport === "badminton") return "BT";
  if (sport === "tabletennis") return "TT";
  if (sport === "cricket") return "CR";     
  if (sport === "football") return "FB"; 
  if (sport === "chess") return "CH";
  if (sport === "basketball") return "BB"; 
  if (sport === "athletics") return "AT";
  throw new Error("Invalid sport");
}

/* Convert Excel serial date to YYYY-MM-DD */
export function excelDateToString(serial) {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);
  return date_info.toISOString().slice(0, 10);
}

/* Map sport to Excel sheet prefix */
export function getSportPrefix(sport) {
  const sportMap = {
    'volleyball': 'VB',
    'badminton': 'BT',
    'tabletennis': 'TT',
    'cricket': 'CR',
    'football': 'FB',
    'chess': 'CH',
    'basketball': 'BB',
    'athletics': 'AT'
  };
  return sportMap[sport] || null;
}

// TeamColors.js
export const getTeamColor = (teamName) => {
  if (!teamName) return "from-gray-500 to-gray-700"; // Default
  const name = teamName.toUpperCase();
  
  if (name.includes("LIONS")) return "from-yellow-500 to-yellow-700 text-black";
  if (name.includes("RHINOS")) return "from-red-800 to-blue-900 text-white";
  if (name.includes("WOLVES")) return "from-gray-600 to-gray-900 text-white";
  if (name.includes("SHARKS")) return "from-orange-500 to-red-600 text-white";
  if (name.includes("BULLS")) return "from-green-500 to-green-700 text-white";
  if (name.includes("EAGLES")) return "from-red-600 to-red-800 text-white";
  if (name.includes("TIGERS")) return "from-blue-800 to-blue-950 text-white";
  if (name.includes("PANTHERS")) return "from-sky-500 to-blue-600 text-white";

  return "from-gray-500 to-gray-700 text-white";
};
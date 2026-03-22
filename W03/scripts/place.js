// --- Footer:year ---
document.getElementById("current-year").textContent = new Date().getFullYear();

// ---last modified---
document.getElementById("last-modified").textContent = document.lastModified;


// =============================================
// Wind Chill Calculation (Metric / °C)
// Environment Canada formula:
//   WC = 13.12 + 0.6215T − 11.37(V^0.16) + 0.3965T(V^0.16)
//   T = temperature in °C
//   V = wind speed in km/h
//
// Conditions for a valid wind chill:
//   Temperature <= 10 °C  AND  Wind speed > 4.8 km/h
// =============================================

/**
 * Calculates the wind chill factor (metric).
 * @param {number} temp      - Temperature in °C
 * @param {number} windSpeed - Wind speed in km/h
 * @returns {number} Wind chill in °C, rounded to 1 decimal place
 */
function calculateWindChill(temp, windSpeed) {
  return parseFloat((13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16)).toFixed(1));
}

// --- Static weather values (must match HTML content) ---
const temperature = 28;  // °C — Luanda is hot and sunny
const windSpeed   = 12;  // km/h

// --- Display wind chill only when conditions are met ---
const windChillEl = document.getElementById("wind-chill");

if (temperature <= 10 && windSpeed > 4.8) {
  windChillEl.textContent = calculateWindChill(temperature, windSpeed) + " °C";
} else {
  // Angola is tropical — wind chill conditions are almost never met
  windChillEl.textContent = "N/A";
}
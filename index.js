// Elements
const clockElement = document.getElementById("clock");
const dateElement = document.getElementById("date");
const iconElement = document.getElementById("icon");
const settingsIcon = document.getElementById("settings-icon");
const settingsMenu = document.getElementById("settings-menu");
const timezoneSelect = document.getElementById("timezone");
const backgroundSelect = document.getElementById("background");
const fontSizeInput = document.getElementById("font-size");
const saveSettingsButton = document.getElementById("save-settings");

// Load Settings
function loadSettings() {
  const savedTimezone = localStorage.getItem("timezone") || "auto";
  const savedBackground = localStorage.getItem("background") || "gradient1";
  const savedFontSize = localStorage.getItem("fontSize") || "100";

  timezoneSelect.value = savedTimezone;
  backgroundSelect.value = savedBackground;
  fontSizeInput.value = savedFontSize;

  setFontSize(savedFontSize);
  setBackground(savedBackground);
}

function setFontSize(sizePercentage) {
  const clockSize = (7.5 * sizePercentage) / 100;
  const dateSize = (3.5 * sizePercentage) / 100;
  const iconSize = (3.5 * sizePercentage) / 100;
  document.documentElement.style.setProperty("--font-size-clock", `${clockSize}vw`);
  document.documentElement.style.setProperty("--font-size-date", `${dateSize}vw`);
  document.documentElement.style.setProperty("--font-size-icon", `${iconSize}vw`);
}

function setBackground(option) {
  let gradient;
  if (option === "gradient1") {
    gradient = "linear-gradient(135deg, #B5AEAA 15%, #D3D3D3 46%, #F7E7CE 69%, #777777 92%)";
  } else if (option === "gradient2") {
    gradient = "linear-gradient(135deg, #EE7062 15%, #F046DF 46%, #9A41D5 69%, #7E4FF7 92%)";
  } else if (option === "auto") {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    gradient = isDarkMode
      ? "linear-gradient(135deg, #111111 15%, #333333 46%, #555555 69%, #777777 92%)"
      : "linear-gradient(135deg, #FFFFFF 15%, #DDDDDD 46%, #BBBBBB 69%, #999999 92%)";
  }
  document.documentElement.style.setProperty("--bg-color", gradient);
}

// Save Settings
saveSettingsButton.addEventListener("click", () => {
  const selectedTimezone = timezoneSelect.value;
  const selectedBackground = backgroundSelect.value;
  const selectedFontSize = fontSizeInput.value;

  localStorage.setItem("timezone", selectedTimezone);
  localStorage.setItem("background", selectedBackground);
  localStorage.setItem("fontSize", selectedFontSize);

  setBackground(selectedBackground);
  setFontSize(selectedFontSize);
  settingsMenu.style.display = "none";
});

// Settings Toggle
settingsIcon.addEventListener("click", () => {
  settingsMenu.style.display = settingsMenu.style.display === "block" ? "none" : "block";
});

// Clock Update
function updateClock() {
  const now = new Date();
  const hours = now.getHours() % 12 || 12;
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = now.getHours() >= 12 ? "PM" : "AM";
  clockElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
  dateElement.textContent = weekday;
}

// Initialize
loadSettings();
updateClock();
setInterval(updateClock, 1000);
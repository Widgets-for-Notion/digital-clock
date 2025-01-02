const clockElement = document.getElementById("clock");
const dateElement = document.getElementById("date");
const settingsIcon = document.getElementById("settings-icon");
const settingsMenu = document.getElementById("settings-menu");
const timezoneSelect = document.getElementById("timezone");
const backgroundSelect = document.getElementById("background");
const saveSettingsButton = document.getElementById("save-settings");

// Gradients for background
const gradients = {
  gradient1: "linear-gradient(135deg, #B5AEAA 15%, #D3D3D3 46%, #F7E7CE 69%, #777777 92%)",
  gradient2: "linear-gradient(135deg, #EE7062 15%, #F046DF 46%, #9A41D5 69%, #7E4FF7 92%)",
};

// Load saved settings
let userTimezone = localStorage.getItem("timezone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
let userBackground = localStorage.getItem("background") || "gradient1";

// Apply saved background
document.documentElement.style.setProperty("--bg-color", gradients[userBackground]);
backgroundSelect.value = userBackground;
timezoneSelect.value = userTimezone === Intl.DateTimeFormat().resolvedOptions().timeZone ? "auto" : userTimezone;

// Update clock
function updateClock() {
  const timezone = timezoneSelect.value === "auto" ? Intl.DateTimeFormat().resolvedOptions().timeZone : timezoneSelect.value;
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const dayFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "long",
  });

  clockElement.textContent = formatter.format(now);
  dateElement.textContent = dayFormatter.format(now);
}

// Toggle settings menu
function toggleSettingsMenu() {
  settingsMenu.style.display = settingsMenu.style.display === "block" ? "none" : "block";
}

// Save settings
function saveSettings() {
  const selectedTimezone = timezoneSelect.value;
  userTimezone = selectedTimezone === "auto" ? Intl.DateTimeFormat().resolvedOptions().timeZone : selectedTimezone;
  userBackground = backgroundSelect.value;

  localStorage.setItem("timezone", userTimezone);
  localStorage.setItem("background", userBackground);

  document.documentElement.style.setProperty("--bg-color", gradients[userBackground]);
  settingsMenu.style.display = "none"; // Hide settings menu
  updateClock(); // Update clock immediately
}

// Initialize clock
setInterval(updateClock, 1000);
updateClock();

// Event listeners
settingsIcon.addEventListener("click", toggleSettingsMenu);
saveSettingsButton.addEventListener("click", saveSettings);
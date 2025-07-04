let notifiedLowBattery = false;
let notifiedHighBattery = false;

function updateBattery() {
  const threshold = parseInt(document.getElementById('threshold').value);
  const highThreshold = parseInt(document.getElementById('highThreshold').value);
  const soundEnabled = document.getElementById('enableSound').checked;
  const popupEnabled = document.getElementById('enablePopup').checked;
  const highWarningEnabled = document.getElementById('enableHighWarning').checked;

  fetch('/battery/')
    .then(response => response.json())
    .then(data => {
      const level = document.getElementById('level');
      const percent = data.percent;

      level.style.width = percent + '%';

      // Color logic
      if (percent > 60) {
        level.style.backgroundColor = 'green';
      } else if (percent > 30) {
        level.style.backgroundColor = 'orange';
      } else {
        level.style.backgroundColor = 'red';
      }

      document.getElementById('percent').textContent = 'Battery Level: ' + percent + '%';
      document.getElementById('charging').textContent = data.charging ? 'Charging' : 'Not Charging';

      if (data.time_left === -1 || data.charging) {
        document.getElementById('time').textContent = 'Time remaining: Charging...';
      } else {
        const mins = Math.floor(data.time_left / 60);
        const hrs = Math.floor(mins / 60);
        const remMins = mins % 60;
        document.getElementById('time').textContent = `Time remaining: ${hrs} hr ${remMins} min`;
      }

      // Low battery logic
      if (percent <= threshold && !data.charging && !notifiedLowBattery) {
        notifiedLowBattery = true;
        if (popupEnabled) document.getElementById('batteryWarning').classList.add('show');
        if (soundEnabled) document.getElementById('lowBatterySound').play();
      }

      if ((percent > threshold || data.charging) && notifiedLowBattery) {
        notifiedLowBattery = false;
        document.getElementById('batteryWarning').classList.remove('show');
      }

      // High battery logic
      if (percent >= highThreshold && data.charging && !notifiedHighBattery && highWarningEnabled) {
        notifiedHighBattery = true;
        if (popupEnabled) document.getElementById('batteryHigh').classList.add('show');
        if (soundEnabled) document.getElementById('highBatterySound').play();
      }

      if ((percent < highThreshold || !data.charging) && notifiedHighBattery) {
        notifiedHighBattery = false;
        document.getElementById('batteryHigh').classList.remove('show');
      }
    });
}

setInterval(updateBattery, 2000);
updateBattery();

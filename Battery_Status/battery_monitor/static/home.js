function openModal() {
    document.getElementById("authModal").style.display = "block";
  }
  
  function closeModal() {
    document.getElementById("authModal").style.display = "none";
  }
  
  function showSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
  }
  
  function showLogin() {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
  }
  
  
  
    document.addEventListener('DOMContentLoaded', function() {
      // DOM Elements
      const batteryLevelElement = document.getElementById('battery-level');
      const batteryPercentageElement = document.getElementById('battery-percentage');
      const chargingStatusElement = document.getElementById('charging-status');
      const timeRemainingElement = document.getElementById('time-remaining');
      const batteryHealthElement = document.getElementById('battery-health');
      const lowThresholdInput = document.getElementById('low-threshold');
      const highThresholdInput = document.getElementById('high-threshold');
      const notificationsToggle = document.getElementById('notifications-toggle');
      const soundToggle = document.getElementById('sound-toggle');
      const consumptionList = document.getElementById('consumption-list');
      const powerTipsList = document.getElementById('power-tips');
      const notificationPopup = document.getElementById('notification-popup');
      const popupTitle = document.getElementById('popup-title');
      const popupMessage = document.getElementById('popup-message');
      const closePopup = document.getElementById('close-popup');
  
      // Mock data for battery consumers (in a real app, this would come from the backend)
      const batteryConsumers = [
          { name: "Display", percentage: 25 },
          { name: "Web Browser", percentage: 18 },
          { name: "Background Apps", percentage: 15 },
          { name: "Wi-Fi", percentage: 12 },
          { name: "System", percentage: 10 }
      ];
  
      // Power saving tips
      const powerTips = [
          "Reduce screen brightness to save power",
          "Turn off Wi-Fi when not in use",
          "Close unused applications running in background",
          "Enable battery saver mode",
          "Use dark mode to save power on OLED screens",
          "Disable location services when not needed"
      ];
  
      // Initialize UI
      function initializeUI() {
          // Populate battery consumers
          consumptionList.innerHTML = '';
          batteryConsumers.forEach(consumer => {
              const item = document.createElement('div');
              item.className = 'consumption-item';
              item.innerHTML = `
                  <span class="app-name">${consumer.name}</span>
                  <span class="app-percentage">${consumer.percentage}%</span>
              `;
              consumptionList.appendChild(item);
          });
  
          // Populate power tips
          powerTipsList.innerHTML = '';
          powerTips.forEach(tip => {
              const item = document.createElement('li');
              item.innerHTML = `<i class="fas fa-lightbulb"></i> ${tip}`;
              powerTipsList.appendChild(item);
          });
  
          // Event listeners for settings
          lowThresholdInput.addEventListener('change', validateThresholds);
          highThresholdInput.addEventListener('change', validateThresholds);
          closePopup.addEventListener('click', () => {
              notificationPopup.style.display = 'none';
          });
  
          // Simulate battery status updates (in a real app, this would come from the Battery Status API or backend)
          simulateBatteryUpdates();
      }
  
      // Validate threshold inputs
      function validateThresholds() {
          const low = parseInt(lowThresholdInput.value);
          const high = parseInt(highThresholdInput.value);
  
          if (low >= high) {
              alert("Low battery threshold must be less than high threshold");
              lowThresholdInput.value = 20;
              highThresholdInput.value = 80;
          }
  
          if (low < 1 || low > 99) lowThresholdInput.value = 20;
          if (high < 1 || high > 99) highThresholdInput.value = 80;
      }
  
      // Update battery display
      function updateBatteryDisplay(level, charging, timeRemaining, health) {
          // Update battery level visual
          batteryLevelElement.style.height = `${level}%`;
          
          // Change color based on level
          if (level <= 20) {
              batteryLevelElement.style.backgroundColor = 'var(--danger-color)';
          } else if (level <= 50) {
              batteryLevelElement.style.backgroundColor = 'var(--warning-color)';
          } else {
              batteryLevelElement.style.backgroundColor = 'var(--success-color)';
          }
  
          // Update text information
          batteryPercentageElement.textContent = `${level}%`;
          chargingStatusElement.textContent = `Status: ${charging ? 'Charging' : 'Discharging'}`;
          
          if (timeRemaining !== undefined) {
              const hours = Math.floor(timeRemaining / 60);
              const minutes = timeRemaining % 60;
              timeRemainingElement.textContent = `Time remaining: ${hours}h ${minutes}m`;
          } else {
              timeRemainingElement.textContent = `Time remaining: --`;
          }
          
          batteryHealthElement.textContent = `Health: ${health || 'Good'}`;
  
          // Check for notifications
          checkForNotifications(level, charging);
      }
  
      // Check if notifications should be shown
      function checkForNotifications(level, charging) {
          if (!notificationsToggle.checked) return;
  
          const lowThreshold = parseInt(lowThresholdInput.value);
          const highThreshold = parseInt(highThresholdInput.value);
  
          if (level <= lowThreshold) {
              showNotification('Low Battery', `Your battery is at ${level}%. Consider charging your device.`, 'warning');
              if (soundToggle.checked) playNotificationSound('low');
          } else if (level >= highThreshold && charging) {
              showNotification('Battery Charged', `Your battery is at ${level}%. You may want to unplug your device.`, 'info');
              if (soundToggle.checked) playNotificationSound('high');
          } else if (level >= 100 && charging) {
              showNotification('Battery Full', `Your battery is fully charged.`, 'success');
              if (soundToggle.checked) playNotificationSound('full');
          }
      }
  
      // Show notification popup
      function showNotification(title, message, type) {
          popupTitle.textContent = title;
          popupMessage.textContent = message;
          
          // Set color based on notification type
          const popupContent = notificationPopup.querySelector('.popup-content');
          popupContent.style.borderLeft = `5px solid var(--${type}-color)`;
          
          notificationPopup.style.display = 'block';
          
          // Auto hide after 5 seconds
          setTimeout(() => {
              notificationPopup.style.display = 'none';
          }, 5000);
      }
  
      // Play notification sound (mock implementation)
      function playNotificationSound(type) {
          // In a real app, you would play an actual sound
          console.log(`Playing ${type} battery notification sound`);
      }
  
      // Simulate battery updates (for demo purposes)
      function simulateBatteryUpdates() {
          let level = 85;
          let charging = false;
          let health = "Good";
          
          // Initial update
          updateBatteryDisplay(level, charging, calculateTimeRemaining(level, charging), health);
          
          // Simulate discharging
          const dischargeInterval = setInterval(() => {
              if (!charging && level > 0) {
                  level -= 1;
                  updateBatteryDisplay(level, charging, calculateTimeRemaining(level, charging), health);
                  
                  // Start charging at 15% for demo
                  if (level === 15) {
                      charging = true;
                      setTimeout(() => {
                          // Simulate charging
                          const chargeInterval = setInterval(() => {
                              if (charging && level < 100) {
                                  level += 2;
                                  updateBatteryDisplay(level, charging, calculateTimeRemaining(level, charging), health);
                              } else {
                                  clearInterval(chargeInterval);
                                  charging = false;
                                  
                                  // After full charge, start discharging again after a while
                                  setTimeout(() => {
                                      dischargeInterval = setInterval(() => {
                                          if (!charging && level > 0) {
                                              level -= 1;
                                              updateBatteryDisplay(level, charging, calculateTimeRemaining(level, charging), health);
                                          }
                                      }, 2000);
                                  }, 10000);
                              }
                          }, 1000);
                      }, 2000);
                  }
              }
          }, 2000);
      }
  
      // Calculate time remaining (mock calculation)
      function calculateTimeRemaining(level, charging) {
          if (charging) {
              // Time to full charge
              return Math.round((100 - level) * 1.5);
          } else {
              // Time until empty
              return Math.round(level * 2.4);
          }
      }
  
      // Initialize the application
      initializeUI();
  
      // In a real Django application, you would fetch data from the backend like this:
      /*
      fetch('/api/battery-status/')
          .then(response => response.json())
          .then(data => {
              updateBatteryDisplay(data.level, data.charging, data.time_remaining, data.health);
          })
          .catch(error => console.error('Error fetching battery status:', error));
      */
  });
  
       // Fetch battery status from Django backend
      async function fetchBattery() {
          const res = await fetch('/battery/');
          const data = await res.json();
          document.getElementById('battery').innerText =
              `Battery: ${data.percent}% ${data.plugged ? "(Plugged In)" : "is remaining"}`;
      }
  
      // Update battery status every 5 seconds
      setInterval(fetchBattery, 5000);
      window.onload = fetchBattery;  // Initial load

    
           
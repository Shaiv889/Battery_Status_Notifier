async function fetchStatus() {
    try {
        const response = await fetch("/status-json/");
        const data = await response.json();

        document.getElementById("voltage").textContent = data.voltage.toFixed(2);
        document.getElementById("percentage").textContent = data.percentage;
        document.getElementById("message").textContent = data.message;
    } catch (err) {
        document.getElementById("message").textContent = "❌ Error communicating with backend.";
    }
}


fetchStatus();                  // First load
setInterval(fetchStatus, 5000); // Repeat every 5 seconds

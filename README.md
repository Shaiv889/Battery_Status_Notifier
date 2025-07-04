# Battery_Status_Notifier
The Battery Status Notifier is a smart monitoring system designed to track the status of a battery in real time and notify the user when the battery level is low or fully charged. This system is ideal for ensuring timely charging and preventing over-discharge or overcharging, which enhances battery life and device safety.

🛠️ Key Features:
Real-Time Monitoring: Continuously tracks battery voltage and displays the current battery percentage.

Custom Notifications: Alerts users instantly when the battery reaches low or full levels.

Web Interface: A responsive frontend built using HTML, CSS, and JavaScript displays battery status live.

Hardware Integration: Uses Arduino Uno, voltage sensor module, Li-ion battery, and jumper wires to fetch battery voltage data.

Django Backend: Processes hardware input and delivers data to the web interface using Python and Django framework.

WebSocket Support: Ensures live data updates without page refresh using Django Channels.

🔧 Technology Stack:
Frontend: HTML, CSS, JavaScript

Backend: Python with Django

Database: MySQL

Hardware: Arduino Uno, Voltage Sensor Module, 3.7V Li-ion Battery

Communication: Serial Communication via USB and WebSockets for real-time data transfer

📌 Objective:
The goal of this project is to provide an efficient and user-friendly system for monitoring battery health, especially useful for IoT devices, power backups, or any custom hardware requiring battery management.

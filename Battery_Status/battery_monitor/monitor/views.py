from django.http import JsonResponse
from .models import BatteryStatus
from django.shortcuts import render
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse
import psutil

def home(request):
    return render(request, 'home.html')

def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            messages.success(request, 'Login successful!')
            return redirect('home')
        else:
            # Check if the username exists to give a more specific message
            if User.objects.filter(username=username).exists():
                messages.error(request, 'Incorrect password.')
            else:
                messages.error(request, 'User does not exist.')
    return redirect('home')

def user_signup(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists.')
        else:
            user = User.objects.create_user(username=username, password=password)
            login(request, user)
            messages.success(request, 'Signup successful! You are now logged in.')
            return redirect('home')
    return redirect('home')

def user_logout(request):
    logout(request)
    messages.info(request, 'You have been logged out.')
    return redirect('home')


def battery_page(request):
    return render(request, 'battery_status.html')

def features_page(request):
    return render(request, 'features.html')

def home_page(request):
    return render(request, 'home.html')

def about_page(request):
    return render(request, 'about.html')

def battery_status_view(request):
    return render(request, 'home.html')

def battery_status_json(request):
    status = BatteryStatus.objects.first()

    # Display warning if Arduino not connected (voltage = 0 and percentage = 0)
    if status is None or status.percentage == 0:
        message = "❌ Arduino not connected. Connect your battery."
    else:
        message = ""

    data = {
        'voltage': status.voltage if status else 0.0,
        'percentage': status.percentage if status else 0,
        'message': message
    }
    return JsonResponse(data)

def index(request):
    return render(request, 'index.html')

def battery_status(request):
    battery = psutil.sensors_battery()
    return JsonResponse({
        'percent': battery.percent,
        'charging': battery.power_plugged,
        'time_left': battery.secsleft
    })

import serial
import time
from django.shortcuts import render

def read_external_battery_data():
    try:
        # Set your Arduino port here
        arduino = serial.Serial('COM16', 9600, timeout=2)
        time.sleep(1)  # Wait for Arduino to initialize

        arduino.write(b'R')  # Optional: signal Arduino to send data (if required)
        line = arduino.readline().decode().strip()
        arduino.close()

        voltage = float(line)
        percentage = convert_voltage_to_percentage(voltage)
        connected = True if voltage > 0.5 else False  # Simple check

        return voltage, percentage, connected

    except Exception as e:
        print(f"Error reading from Arduino: {e}")
        return 0.00, 0, False

def convert_voltage_to_percentage(voltage):
    # Example conversion for 3.7V Li-ion battery
    max_voltage = 4.2
    min_voltage = 3.0

    if voltage >= max_voltage:
        return 100
    elif voltage <= min_voltage:
        return 0
    else:
        return int(((voltage - min_voltage) / (max_voltage - min_voltage)) * 100)

def external_battery_status(request):
    voltage, percentage, connected = read_external_battery_data()
    context = {
        'voltage': round(voltage, 2),
        'percentage': percentage,
        'connected': connected
    }
    return render(request, 'external_battery_status.html', context)







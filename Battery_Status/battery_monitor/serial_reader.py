import os
import django
import serial
import time
import re
from serial.serialutil import SerialException

# Django setup
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "battery_monitor.settings")
django.setup()

from monitor.models import BatteryStatus

def parse_data(line):
    match = re.search(r"Voltage: ([\d.]+).*Percentage: (\d+)", line)
    if match:
        return float(match.group(1)), int(match.group(2))
    return None, None

ser = None

while True:
    try:
        if ser is None or not ser.is_open:
            try:
                ser = serial.Serial('COM16', 9600, timeout=2)  # UPDATE port if needed
                print("✅ Arduino connected.")
            except SerialException:
                print("❌ Arduino not connected. Connect your battery.")
                BatteryStatus.objects.update_or_create(
                    id=1, defaults={'voltage': 0.0, 'percentage': 0}
                )
                time.sleep(2)
                continue

        line = ser.readline().decode('utf-8').strip()
        print("📡 Serial:", line)
        voltage, percentage = parse_data(line)

        if voltage is not None and percentage is not None:
            BatteryStatus.objects.update_or_create(
                id=1, defaults={'voltage': voltage, 'percentage': percentage}
            )

    except (SerialException, OSError):
        print("⚠️ Connection lost. Retrying...")
        try:
            ser.close()
        except:
            pass
        ser = None
        BatteryStatus.objects.update_or_create(
            id=1, defaults={'voltage': 0.0, 'percentage': 0}
        )
        time.sleep(2)

    except Exception as e:
        print("Unhandled error:", e)
        time.sleep(1)

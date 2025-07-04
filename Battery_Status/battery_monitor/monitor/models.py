from django.db import models

class BatteryStatus(models.Model):
    voltage = models.FloatField(default=0.0)
    percentage = models.IntegerField(default=0)

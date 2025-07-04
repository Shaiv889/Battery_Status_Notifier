from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='index'),
    path('battery/', views.battery_status, name='battery_status'),
]

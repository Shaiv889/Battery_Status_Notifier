"""
URL configuration for battery_monitor project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from monitor.views import battery_status_view
from monitor import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('battery_status/', battery_status_view, name='battery_status'),
    path('status-json/', views.battery_status_json, name='battery_status_json'),
    path('', views.home, name='home'),
    path('login/', views.user_login, name='login'),
    path('signup/', views.user_signup, name='signup'),
    path('logout/', views.user_logout, name='logout'),
    path('battery/', views.battery_status, name='battery_status'),
    path('battery-page/', views.battery_page, name='battery_page'),  # New page URL
    path('features/', views.features_page, name='features'),
    path('home/', views.home_page, name='home'),
    path('about/', views.about_page, name='about'),
    path('monitor/', include('monitor.urls')),
    path('index/', views.index, name='index'),
    path('external-battery/', views.external_battery_status, name='external_battery_status'),

]

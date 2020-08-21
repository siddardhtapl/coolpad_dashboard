from django.contrib import admin
from django.urls import path,include
from . import views
from django.conf.urls import url

urlpatterns = [
    path('login/', views.login,name="login"),
    # path('signup/',views.signup,name="signup"),
    path('dashboard/',views.dashboard,name="dashboard"),
    path('history_dashboard/',views.history_dashboard,name="history_dashboard"),
    path('contact/',views.contact,name="map"),
    path('adduser/',views.adduser,name="adduser"),
    path('stickynotes/',views.stickynotes,name="stickynotes"),
]
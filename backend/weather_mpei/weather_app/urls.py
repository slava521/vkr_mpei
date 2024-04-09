from django.urls import path

from .views import MeteoAPIList, WindAPIList, InvertorAPIList, TemperatureAPIView, PressureAPIView, WindSpeedAPIView, \
    HumidityAPIView

urlpatterns = [
    path('meteo/', MeteoAPIList.as_view()),
    path('wind/', WindAPIList.as_view()),
    path('invertor/', InvertorAPIList.as_view()),
    path('temperature/<type>/', TemperatureAPIView.as_view()),
    path('pressure/<type>/', PressureAPIView.as_view()),
    path('wind-speed/<type>/', WindSpeedAPIView.as_view()),
    path('humidity/<type>/', HumidityAPIView.as_view()),
]

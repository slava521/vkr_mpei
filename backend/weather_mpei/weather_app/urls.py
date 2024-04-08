from django.urls import path

from .views import MeteoAPIList, WindAPIList, InvertorAPIList

urlpatterns = [
    path('meteo/', MeteoAPIList.as_view()),
    path('wind/', WindAPIList.as_view()),
    path('invertor/', InvertorAPIList.as_view()),
]

from django.urls import path

from .views import (MeteoAPIList, WindAPIList, InvertorAPIList, MeteoDataParamAPIView, WindDataParamAPIView,
                    InvertorParamAPIView)

urlpatterns = [
    path('meteo/', MeteoAPIList.as_view()),
    path('wind/', WindAPIList.as_view()),
    path('invertor/', InvertorAPIList.as_view()),
    path('meteo/<param>/', MeteoDataParamAPIView.as_view()),
    path('wind/<param>/', WindDataParamAPIView.as_view()),
    path('invertor/<param>/', InvertorParamAPIView.as_view()),
]

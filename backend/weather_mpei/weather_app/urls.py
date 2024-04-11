from django.urls import path

from .views import (MeteoAPIList, WindAPIList, InvertorAPIList, MeteoDataParamAPIView, WindDataParamAPIView,
                    InvertorParamAPIView, MeteoDataFileAPIView, WindDataFileAPIView, InvertorFileAPIView)

urlpatterns = [
    path('meteo/', MeteoAPIList.as_view()),
    path('wind/', WindAPIList.as_view()),
    path('invertor/', InvertorAPIList.as_view()),
    path('meteo/<param>/', MeteoDataParamAPIView.as_view()),
    path('wind/<param>/', WindDataParamAPIView.as_view()),
    path('invertor/<param>/', InvertorParamAPIView.as_view()),
    path('meteo-file/<file_type>/', MeteoDataFileAPIView.as_view()),
    path('wind-file/<file_type>/', WindDataFileAPIView.as_view()),
    path('invertor-file/<file_type>/', InvertorFileAPIView.as_view()),
]

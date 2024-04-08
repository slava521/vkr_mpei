from datetime import datetime

from rest_framework import generics
from rest_framework.pagination import PageNumberPagination

from .functions import date_filter
from .models import MeteoData, Invertor, WindData
from .serializers import MeteoDataSerializer, WindDataSerializer, InvertorSerializer


class APIListPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class MeteoAPIList(generics.ListAPIView):
    serializer_class = MeteoDataSerializer
    pagination_class = APIListPagination

    def get_queryset(self):
        return date_filter(self.request, MeteoData)


class WindAPIList(generics.ListAPIView):
    serializer_class = WindDataSerializer
    pagination_class = APIListPagination

    def get_queryset(self):
        return date_filter(self.request, WindData)


class InvertorAPIList(generics.ListAPIView):
    serializer_class = InvertorSerializer
    pagination_class = APIListPagination

    def get_queryset(self):
        return date_filter(self.request, Invertor)

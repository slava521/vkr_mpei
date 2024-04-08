from datetime import datetime

from rest_framework import generics
from rest_framework.pagination import PageNumberPagination

from .models import MeteoData, Invertor, WindData
from .serializers import MeteoDataSerializer, WindDataSerializer, InvertorSerializer


class APIListPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


def date_filter(request, model):
    date_from = request.query_params.get('date_from', default=None)
    date_to = request.query_params.get('date_to', default=None)

    if date_from is not None or date_to is not None:
        if date_from is None:
            date_start = datetime(1900, 1, 1, 0,0,0)
            return model.objects.filter(date__range=(date_start, date_to))
        if date_to is None:
            date_now = datetime.now()
            return model.objects.filter(date__range=(date_from, date_now))
        return model.objects.filter(date__range=(date_from, date_to))
    return model.objects.all()


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

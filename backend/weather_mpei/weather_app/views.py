from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .constants import MeteoDataParams, WindDataParams, InvertorParams
from .functions import date_filter, main_param_json, download_file_response
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


class MeteoDataParamAPIView(generics.RetrieveAPIView):

    def get(self, request, *args, **kwargs):
        return main_param_json(MeteoData, MeteoDataParams, request, **kwargs)


class WindDataParamAPIView(generics.RetrieveAPIView):

    def get(self, request, *args, **kwargs):
        return main_param_json(WindData, WindDataParams, request, **kwargs)


class InvertorParamAPIView(generics.RetrieveAPIView):

    def get(self, request, *args, **kwargs):
        return main_param_json(Invertor, InvertorParams, request, **kwargs)


class MeteoDataFileAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return download_file_response(MeteoData, 'meteo', request, **kwargs)


class WindDataFileAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return download_file_response(WindData, 'wind', request, **kwargs)


class InvertorFileAPIView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return download_file_response(Invertor, 'invertor', request, **kwargs)


class LogoutView(generics.CreateAPIView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'refresh': '', 'access': ''})
        except Exception as e:
            return Response({'error': str(e)})

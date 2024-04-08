from rest_framework import serializers

from .models import MeteoData, WindData, Invertor


class MeteoDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeteoData
        fields = "__all__"


class WindDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = WindData
        fields = "__all__"


class InvertorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invertor
        fields = "__all__"

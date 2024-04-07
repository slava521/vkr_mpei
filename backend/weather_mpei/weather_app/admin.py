from django.contrib import admin

from .models import MeteoData, WindData, Invertor

# Register your models here.
admin.site.register(MeteoData)
admin.site.register(WindData)
admin.site.register(Invertor)

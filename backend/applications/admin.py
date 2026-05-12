from django.contrib import admin
from .models import Application

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('candidate', 'job', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('candidate__name', 'job__title')

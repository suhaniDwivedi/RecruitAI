from django.contrib import admin
from .models import Company, UserProfile

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at')
    search_fields = ('name',)

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'role', 'company')
    list_filter = ('role', 'company')
    search_fields = ('user__username', 'user__email')

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import hello_world, current_user, CompanyViewSet, add_company_user

router = DefaultRouter()
router.register(r'api/companies', CompanyViewSet, basename='company')

urlpatterns = [
    path('api/hello/', hello_world, name='hello_world'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/users/me/', current_user, name='current_user'),
    path('api/companies/<int:company_id>/add_user/', add_company_user, name='add_company_user'),
    path('', include(router.urls)),
]

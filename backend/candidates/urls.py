from django.urls import path
from .views import CandidateListCreateView

urlpatterns = [
    path('api/candidates/', CandidateListCreateView.as_view(), name='candidate-list-create'),
]

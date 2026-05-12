from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Application
from .serializers import ApplicationSerializer

@api_view(['POST'])
def create_application(request):
    serializer = ApplicationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)